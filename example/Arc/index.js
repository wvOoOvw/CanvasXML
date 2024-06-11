import { React, ReactDom, Position } from '../../package/index'

import App from './App'

ReactDom.mount(<App />, { frameTimeDiffMax: 12 }).render()