#!/usr/bin/env python3
"""Exercise real controls and pixels. Inline results do not qualify serving/deployment."""
from __future__ import annotations
import argparse,functools,hashlib,http.server,json,shutil,threading,time,traceback
from pathlib import Path
from io import BytesIO
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]

def main()->int:
    arg=argparse.ArgumentParser(description=__doc__);arg.add_argument('--transport',choices=['inline','http'],default='inline');arg.add_argument('--out',type=Path,required=True);arg.add_argument('--chromium',default=shutil.which('chromium'));arg.add_argument('--film',action='store_true')
    a=arg.parse_args();out=a.out.absolute();out.mkdir(parents=True,exist_ok=True)
    checks=[];errors=[];requests=[];server=None;browser=None
    def check(name,value,details=None):
        passed=bool(value);checks.append({'name':name,'passed':passed,'details':details})
        if not passed:raise AssertionError(name+': '+str(details))
    def pixels(page):return page.locator('#art').screenshot()
    def snap(page):return page.evaluate('window.__sceneExperience.snapshot()')
    def tick(page):page.wait_for_timeout(65)
    html=(ROOT/'specimen/index.html').read_text()
    result={'transport':a.transport,'scope':'isolated browser fixture; not framework integration, deployed page or physical GPU','checks':checks,'page_errors':errors}
    try:
        if a.transport=='http':
            handler=functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(ROOT));server=http.server.ThreadingHTTPServer(('127.0.0.1',0),handler);threading.Thread(target=server.serve_forever,daemon=True).start()
        with sync_playwright() as pw:
            browser=pw.chromium.launch(executable_path=a.chromium,headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
            result['browser']=browser.version
            ctx=browser.new_context(viewport={'width':1440,'height':1000},device_scale_factor=1)
            page=ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda r:requests.append(r.url))
            def load(pg):
                if a.transport=='http':pg.goto(f'http://127.0.0.1:{server.server_port}/specimen/index.html',wait_until='load',timeout=15000)
                else:pg.set_content(html,wait_until='load')
                pg.wait_for_function('Boolean(window.__sceneExperience?.snapshot().frame)');tick(pg)
            load(page)
            check('enhancement initialized from actual built artifact',page.get_attribute('body','data-enhanced')=='true')
            check('six semantic scene sections exist',page.locator('#chapters section').count()==6)
            result['webgl2_available']=page.evaluate("!!document.createElement('canvas').getContext('webgl2')")
            check('tested backend explicitly SVG projection',snap(page)['backend']=='svg-projection')
            hashes={}
            for scene in ['arrival','approach','construction','participate','threshold','resolve']:
                page.select_option('#chapter',scene);tick(page)
                check('chapter input reaches '+scene,snap(page)['frame']['scene']['id']==scene)
                image=pixels(page);hashes[scene]=hashlib.sha256(image).hexdigest();page.screenshot(path=str(out/(scene+'.png')))
            check('all chapter output pixels differ',len(set(hashes.values()))==6)
            page.select_option('#chapter','participate');tick(page)
            page.locator('#aperture').focus();page.keyboard.press('Home');tick(page);closed=pixels(page)
            check('keyboard closes aperture',snap(page)['state']['aperture']==0)
            page.keyboard.press('End');tick(page);opened=pixels(page)
            check('keyboard opens aperture',snap(page)['state']['aperture']==1)
            check('aperture changes actual rendered pixels',closed!=opened)
            im1,im2=Image.open(BytesIO(closed)).convert('RGB'),Image.open(BytesIO(opened)).convert('RGB');w,h=im1.size
            crop=(int(w*.35),int(h*.73),int(w*.97),int(h*.99))
            check('aperture affects environment not only control label',ImageChops.difference(im1.crop(crop),im2.crop(crop)).getbbox() is not None)
            base=pixels(page);page.get_by_role('button',name='Graphite',exact=True).click();tick(page)
            check('finish input reaches selected state',snap(page)['state']['finish']=='graphite')
            check('finish changes visible surface',base!=pixels(page))
            before=pixels(page);page.get_by_role('button',name='Section',exact=True).click();tick(page)
            check('section input separates layers',snap(page)['state']['section'] and snap(page)['frame']['pose']['explode']>=.8)
            check('section changes pixels',before!=pixels(page))
            page.select_option('#chapter','arrival');tick(page)
            check('reverse scene navigation retains configuration',snap(page)['state']['finish']=='graphite' and snap(page)['state']['aperture']==1 and snap(page)['state']['section'])
            before=snap(page)['frame']['progress'];page.mouse.move(1250,700);page.mouse.wheel(0,900);page.wait_for_timeout(100)
            check('native wheel advances narrative',snap(page)['frame']['progress']>before)
            page.get_by_role('button',name='Hold scene',exact=True).click();tick(page);held=snap(page)['frame']['progress'];page.mouse.wheel(0,600);page.wait_for_timeout(100)
            check('hold freezes narrative while native scroll can continue',snap(page)['frame']['progress']==held and snap(page)['held'])
            page.get_by_role('button',name='Ceramic',exact=True).click();tick(page)
            check('hold does not disable useful controls',snap(page)['state']['finish']=='ceramic')
            page.get_by_role('button',name='Resume scene',exact=True).click();tick(page)
            check('resume follows current narrative position',not snap(page)['held'] and snap(page)['frame']['progress']>held)
            page.get_by_role('button',name='Motion on',exact=True).click();tick(page)
            check('explicit motion-off route',snap(page)['reduced'])
            page.select_option('#chapter','participate');tick(page);pose=snap(page)['frame']['pose'];page.mouse.wheel(0,30);tick(page)
            check('motion-off keeps camera fixed within scene',snap(page)['frame']['pose']==pose)
            page.mouse.move(800,450);tick(page)
            check('motion-off disables pointer parallax',snap(page)['frame']['pointerX']==0 and snap(page)['frame']['pointerY']==0)
            page.get_by_role('button',name='Reset',exact=True).click();tick(page)
            check('reset restores product configuration',snap(page)['state']['finish']=='silver' and snap(page)['state']['aperture']==.62 and not snap(page)['state']['section'])
            before=snap(page)['renderCount'];page.wait_for_timeout(230)
            check('no uncontrolled idle render loop',snap(page)['renderCount']==before)
            page.get_by_role('button',name='Motion off',exact=True).click();tick(page)
            page.set_viewport_size({'width':390,'height':844});page.select_option('#chapter','participate');tick(page);page.screenshot(path=str(out/'mobile-390.png'))
            check('mobile 390 has no horizontal overflow',page.evaluate('document.documentElement.scrollWidth <= innerWidth'))
            check('mobile controls within viewport',page.evaluate("[...document.querySelectorAll('#hud button,#hud input,#chapter,#motion')].every(e=>{const b=e.getBoundingClientRect();return b.x>=0&&b.right<=innerWidth&&b.y>=0&&b.bottom<=innerHeight})"))
            page.set_viewport_size({'width':320,'height':740});tick(page);page.screenshot(path=str(out/'mobile-320.png'))
            check('mobile 320 has no horizontal overflow',page.evaluate('document.documentElement.scrollWidth <= innerWidth'))
            check('mobile 320 control bounds',page.evaluate("[...document.querySelectorAll('#hud button,#hud input,#chapter,#motion')].every(e=>{const b=e.getBoundingClientRect();return b.x>=0&&b.right<=innerWidth&&b.y>=0&&b.bottom<=innerHeight})"))
            page.locator('#aperture').focus();start=snap(page)['state']['aperture'];page.keyboard.press('ArrowRight');tick(page)
            check('mobile keyboard task still works',snap(page)['state']['aperture']>start)
            check('no nonfinite geometry',page.locator('#art').inner_html().find('NaN')<0 and page.locator('#art').inner_html().find('Infinity')<0)
            # OS reduced-motion is qualified independently from the UI toggle.
            rc=browser.new_context(viewport={'width':1000,'height':800},reduced_motion='reduce');rp=rc.new_page();load(rp)
            check('OS reduced motion honored at initial load',snap(rp)['reduced']);rc.close()
            nc=browser.new_context(viewport={'width':1000,'height':800},java_script_enabled=False);np=nc.new_page()
            if a.transport=='http':np.goto(f'http://127.0.0.1:{server.server_port}/specimen/index.html',wait_until='load',timeout=15000)
            else:np.set_content(html,wait_until='load')
            check('no-JS retains static authored diagram',np.locator('#art svg').count()==1)
            check('no-JS retains all explanatory chapters',np.locator('#chapters h2:visible').count()==6)
            check('no-JS does not pretend controls are operative',not np.locator('#hud').is_visible())
            np.screenshot(path=str(out/'no-js.png'));nc.close()
            # Explicit authoring export; not a real-input proof path.
            if a.film:
                frames=out/'film-frames';frames.mkdir(exist_ok=True);page.set_viewport_size({'width':960,'height':760});tick(page)
                page.get_by_role('button',name='Reset',exact=True).click();tick(page)
                for i in range(96):
                    page.evaluate('(p)=>window.__sceneExperience.seek(p)',i/95)
                    page.locator('#stage').screenshot(path=str(frames/f'{i:04d}.png'))
                result['authored_film_frames']={'count':96,'source':'Explicit deterministic seek + screenshots; not a user-journey recording','path':'film-frames'}
            # Disposal test intentionally last.
            page.evaluate('window.__sceneExperience.dispose()');before=snap(page)['renderCount'];page.get_by_role('button',name='Section',exact=True).click();tick(page)
            check('dispose removes input handlers',snap(page)['disposed'] and snap(page)['renderCount']==before)
            check('no browser page errors',not errors,errors)
            if a.transport=='inline':check('standalone makes no network requests',len(requests)==0,requests)
            result['requests']=requests;result['status']='PASS';result['passed']=len(checks)
            browser.close();browser=None
    except Exception as e:
        result['status']='BLOCKED_ENV' if 'ERR_BLOCKED_BY_ADMINISTRATOR' in str(e) else 'FAIL';result['error']=str(e);result['traceback']=traceback.format_exc()
    finally:
        if server:server.shutdown();server.server_close()
        (out/'results.json').write_text(json.dumps(result,indent=2))
    print(json.dumps({k:v for k,v in result.items() if k not in ['checks','traceback','requests']},indent=2))
    return 0 if result.get('status')=='PASS' else 2
if __name__=='__main__':raise SystemExit(main())
