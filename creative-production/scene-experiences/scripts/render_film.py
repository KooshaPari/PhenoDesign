#!/usr/bin/env python3
"""Encode a previously captured authored scene sequence; does not run Remotion."""
from pathlib import Path
import argparse, json, shutil, subprocess, sys

def main() -> int:
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--frames',type=Path,required=True)
    p.add_argument('--out',type=Path,required=True)
    p.add_argument('--fps',type=int,default=12)
    a=p.parse_args()
    if not 1 <= a.fps <= 120: p.error('fps must be 1..120')
    ffmpeg=shutil.which('ffmpeg'); ffprobe=shutil.which('ffprobe')
    if not ffmpeg or not ffprobe: p.error('ffmpeg and ffprobe must already be installed')
    frames=sorted(a.frames.glob('[0-9][0-9][0-9][0-9].png'))
    if not frames or [f.name for f in frames] != [f'{i:04d}.png' for i in range(len(frames))]:
        p.error('Expected a contiguous PNG sequence beginning 0000.png')
    if a.out.exists(): p.error('Output exists; choose a new owned destination')
    a.out.parent.mkdir(parents=True,exist_ok=True)
    cmd=[ffmpeg,'-hide_banner','-n','-framerate',str(a.fps),'-start_number','0','-i',str(a.frames/'%04d.png'),
         '-an','-c:v','libx264','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(a.out)]
    subprocess.run(cmd,check=True,timeout=240)
    raw=subprocess.check_output([ffprobe,'-v','error','-show_streams','-show_format','-count_frames','-of','json',str(a.out)],timeout=60,text=True)
    info=json.loads(raw); video=next(s for s in info['streams'] if s['codec_type']=='video')
    if int(video['nb_read_frames']) != len(frames): raise RuntimeError('Encoded frame count mismatch')
    subprocess.run([ffmpeg,'-v','error','-i',str(a.out),'-f','null','-'],check=True,timeout=120)
    print(json.dumps({'result':'PASS','frames':len(frames),'fps':a.fps,'authored_presentation':True,'remotion_executed':False,'probe':info},indent=2))
    return 0
if __name__=='__main__':
    try: raise SystemExit(main())
    except (OSError,RuntimeError,subprocess.SubprocessError) as e:
        print(f'FAILED: {e}',file=sys.stderr);raise SystemExit(1)
