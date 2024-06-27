import { React, ReactCanvas2d } from '../../package/index'

import App from './App'

ReactCanvas2d.mount(<App />, { frameTimeDiffMax: 12 }).render()