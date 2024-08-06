import './adapter-weapp'

import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import App from '../Application_TouchMusic_B/App'

var canvas = window.canvas

setTimeout(() => {
  ReactCanvas2d.mount(<ReactCanvas2dExtensions.CanvasLayout><App /></ReactCanvas2dExtensions.CanvasLayout>, canvas, { renderFrameTimeDiffMax: 0, powered: true }).render()
}, 1000);