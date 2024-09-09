import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import Template from '../_Template/App'

const contextInstance = React.createContext()

const Provider = contextInstance.Provider

function GraphComponent() {
  const context = React.useContext(contextInstance)

  const [count, setCount] = React.useState(0)

  const onClick1 = e => {
    if (e.device === 'mouse' && Canvas2d.Location.pointcover(e.dom.props, { x: e.x, y: e.y })) {
      setCount(count + 1)
      context.setCount(context.count + 1)
    }
    if (e.device === 'touch' && Canvas2d.Location.pointcover(e.dom.props, { x: e.x[0], y: e.y[0] })) {
      setCount(count + 1)
      context.setCount(context.count + 1)
    }
  }

  const onClick2 = e => {
    if (e.device === 'mouse' && Canvas2d.Location.pointcover(e.dom.props, { x: e.x, y: e.y })) {
      setCount(count + 1)
    }
    if (e.device === 'touch' && Canvas2d.Location.pointcover(e.dom.props, { x: e.x[0], y: e.y[0] })) {
      setCount(count + 1)
    }
  }

  return <rectradiusarc   fillStyle='rgba(255, 255, 255, 1)' radius={16}>

    <fill />

    <clip>
      <layout  container horizontalAlignCenter verticalAlignCenter>
        <layout w='calc(100% - 48px)' h='calc(100% - 48px)' gap={24} item container wrap horizontalCenter verticalCenter>
          <layout w='120px' h='120px' item container horizontalAlignCenter verticalAlignCenter>
            <rectradiusarc   fillStyle={'rgba(135, 135, 135, 1)'} onClick={onClick1}>
              <fill />
            </rectradiusarc>
          </layout>

          <layout w='120px' h='120px' item container horizontalAlignCenter verticalAlignCenter>
            <rectradiusarc   fillStyle={'rgba(135, 135, 135, 1)'} onClick={onClick2}>
              <fill />
            </rectradiusarc>
          </layout>
        </layout>
      </layout>
    </clip>

  </rectradiusarc>
}

function App() {
  const [count, setCount] = React.useState(0)

  const title =
    [
      {
        text: 'CanvasXML',
      },
      {
        text: 'Document',
        onClick: () => window.open('https://github.com/wvOoOvw/20240601x001/tree/master/example/Rect')
      },
      {
        text: 'Github',
        onClick: () => window.open('https://github.com/wvOoOvw/20240601x001')
      },
      {
        text: 'Npm',
        onClick: () => window.open('https://www.npmjs.com/package/canvasxml')
      },
    ]

  const description =
    [
      {
        text: 'Component <Rect/> API',
        font: '28px courier',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
      },
      {
        text: 'This Is A Basic Rect Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes, Try To Click The Rect Above To Change The Color',
        font: '24px courier',
        fillStyle: 'rgba(185, 185, 185, 1)',
        lineHeight: 1,
        gap: 12,
      },
    ]

  return <Provider value={{ count, setCount }}>
    <Template GraphComponent={<GraphComponent />} title={title} description={description} />
  </Provider>
}

export default App