import { React, ReactDomComponent, ReactDom, ReactDomPlugin, ReactDomTag, ReactDomUtils, Location } from '../../package/index'

import Template from '../_Template/App'

function Arc(props) {
  return <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle='rgba(255, 255, 255, 1)' radius={16}>

    <fill />

    <clip x='extend' y='extend' w='extend' h='extend'>
      <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
        <layout w='calc(100% - 48px)' h='calc(100% - 48px)' gap={24} item container wrap horizontalCenter verticalCenter>
          {
            new Array(12).fill().map(i => {
              return <layout w='120px' h='120px' item container horizontalAlignCenter verticalAlignCenter>
                <layout w='0px' h='0px' item>
                  <arc x='extend' y='extend' beginPath globalAlpha={1} fillStyle={'rgba(135, 135, 135, 1)'} radius={60} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false}>
                    <fill />
                  </arc>
                </layout>
              </layout>
            })
          }
        </layout>
      </layout>
    </clip>

  </rect>
}

function App() {

  const [arcs, setArcs] = 

  const onMouseMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y }))
  }

  const onTouchMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] }))
  }
  
  return <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle='rgba(255, 255, 255, 1)' radius={16} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>

  <clip x='extend' y='extend' w='extend' h='extend'>
    <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
      <layout w='calc(100% - 48px)' h='calc(100% - 48px)' gap={24} item container wrap horizontalCenter verticalCenter>
        {
          new Array(12).fill().map(i => {
            return <layout w='120px' h='120px' item container horizontalAlignCenter verticalAlignCenter>
              <layout w='0px' h='0px' item>
                <arc x='extend' y='extend' beginPath globalAlpha={1} fillStyle={'rgba(135, 135, 135, 1)'} radius={60} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false}>
                  <fill />
                </arc>
              </layout>
            </layout>
          })
        }
      </layout>
    </layout>
  </clip>

</rect>
}

export default App