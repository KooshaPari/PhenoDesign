/** Original adapter example. Qualify with the receiving repo's pinned Remotion/React setup.
 * This is authored presentation, not a recording or proof of product interaction.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {evaluateScene, initialState, progressFromFrame} from '../../runtime/scene-core.mjs';
import {renderSceneSVG} from '../../specimen/draw.mjs';
export const SceneFilm: React.FC<{finish?: 'silver'|'graphite'|'ceramic'; aperture?:number}> = ({finish='silver',aperture=0.62}) => {
  const frame=useCurrentFrame();
  const {durationInFrames,width,height}=useVideoConfig();
  const state={...initialState(),finish,aperture};
  const evaluated=evaluateScene(progressFromFrame(frame,durationInFrames),state);
  // Geometry is generated internally with bounded numeric parameters and a fixed finish set.
  // Do not replace this with untrusted remote markup.
  return <AbsoluteFill style={{background:'#0b141b'}} dangerouslySetInnerHTML={{__html:renderSceneSVG(evaluated,width,height)}}/>;
};
