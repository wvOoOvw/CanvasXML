import './adapter-weapp'

import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import App from '../Application_TouchMusic/App'

var canvas = window.canvas

var mount = false

ReactCanvas2d.mount(<App />, canvas, { renderFrameTimeDiffMax: 0 }).render()