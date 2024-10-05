import './adapter-weapp'

import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import App from '../Game_B/App'

var canvas = window.canvas

canvas.style.transform = 'translateZ(0)'

setTimeout(() => {
  ReactCanvas2d.mount(<App />, canvas, { renderFrameTimeDiffMax: 0, powered: true }).render()
}, 1000);