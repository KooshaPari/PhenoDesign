#!/usr/bin/env python3
"""Check local catalog links and an inline UI fixture; does not establish HTTP delivery."""
import base64, json, re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
class Links(HTMLParser):
    def __init__(self): super().__init__(); self.refs=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        for key in ('href','src'):
            if key in d:self.refs.append(d[key])
def main():
    out=ROOT/'evidence/catalog';out.mkdir(parents=True,exist_ok=True)
    errors=[];count=0
    for path in [ROOT/'index.html',*(ROOT/'html').rglob('*.html')]:
        parser=Links();parser.feed(path.read_text())
        for url in parser.refs:
            part=urlsplit(url)
            if part.scheme or part.netloc or not part.path: continue
            target=(path.parent/unquote(part.path)).resolve()
            if not target.is_relative_to(ROOT) or not target.is_file():errors.append(f'{path.relative_to(ROOT)} -> {url}')
            count+=1
    if errors:raise RuntimeError('\n'.join(errors))
    checks=[{'name':'all generated catalog/document local links resolve','passed':True,'links':count}]
    html=(ROOT/'index.html').read_text().replace('<link rel="stylesheet" href="site.css">','<style>'+(ROOT/'site.css').read_text()+'</style>')
    img=base64.b64encode((ROOT/'evidence/browser/construction.png').read_bytes()).decode()
    html=html.replace('src="evidence/browser/construction.png"','src="data:image/png;base64,'+img+'"')
    with sync_playwright() as pw:
        browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
        page=browser.new_page(viewport={'width':1400,'height':1000});errs=[]
        page.on('pageerror',lambda e:errs.append(str(e)))
        page.set_content(html,wait_until='load')
        n=page.locator('.entry:visible').count();assert n==67
        checks.append({'name':'all 67 entries initially visible','passed':True})
        page.locator('#search').fill('CAMERA');visible=page.locator('.entry:visible').count();assert 0<visible<n
        checks.append({'name':'case-insensitive topic filtering narrows entries','passed':True})
        page.locator('#search').fill('not-a-real-resource-abcdef');assert page.locator('.entry:visible').count()==0
        checks.append({'name':'unknown query shows zero results','passed':True})
        page.locator('#search').fill('');assert page.locator('.entry:visible').count()==67
        page.screenshot(path=str(out/'desktop.png'))
        page.set_viewport_size({'width':390,'height':844})
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
        checks.append({'name':'390px catalog has no horizontal overflow','passed':True})
        page.screenshot(path=str(out/'mobile.png'))
        assert not errs
        checks.append({'name':'no page errors','passed':True})
        browser.close()
    result={'status':'PASS','passed':len(checks),'checks':checks,'transport':'inline with local stylesheet and preview image embedded; links resolved from filesystem, not navigated over HTTP'}
    (out/'results.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
if __name__=='__main__':main()
