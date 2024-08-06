import { React, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { ref: refLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { cx: undefined, cy: undefined, w: undefined, h: undefined } })

  const { animationCount: animationCountGameExpend } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameExpend, rate: 1, postprocess: n => Number(n.toFixed(3)) })

  React.useEffect(() => contextPlayground.expendLocationRef = locationLayout, [locationLayout])

  return <layout zIndex={contextPlayground.zIndex.InfomationExpend} cx='50%' cy={contextApp.locationLayout.h - contextApp.unitpx * 0.12} w={contextApp.unitpx} h={contextApp.unitpx * 0.08}>
    <rectradius
      fill
      fillStyle={'rgba(125, 125, 125, 1)'}
      radius={contextApp.unitpx * 0.04}
      shadowColor={'rgba(255, 255, 255, 1)'}
      shadowBlur={contextApp.unitpx * 0.01 + contextApp.unitpx * 0.01 * animationCountGameExpend / 100}
      onLocationMounted={dom => refLayout.current = dom}
    />

    <layout container horizontalAround verticalAlignCenter>
      {
        new Array(9).fill().map(i => {
          return <layout w={contextApp.unitpx * 0.01} h={'80%'} item>
            <rectradius
              fill
              fillStyle={'rgba(255, 255, 255, 1)'}
              radius={contextApp.unitpx * 0.01}
            />
          </layout>
        })
      }
    </layout>

    <rectradius clip radius={contextApp.unitpx * 0.04}>
      <rect
        fill
        w={`calc(${animationCountGameExpend}%)`}
        fillStyle={'rgba(255, 255, 255, 1)'}
        radius={contextApp.unitpx * 0.04}
      />
    </rectradius>

    {
      contextPlayground.gameWire.map(i => {
        return <layout cx={`${i.option.expend}%`} cy='50%' w={contextApp.unitpx * 0.06} h={contextApp.unitpx * 0.06}>
          <rectradius clip radius={contextApp.unitpx * 0.04}>
            <image
              cx={'50%'}
              cy={'50%'}
              src={i.option.image}
              size='auto-max'
              position='center'
              globalAlpha={1}
            />
          </rectradius>
        </layout>
      })
    }
  </layout>
}

export default App