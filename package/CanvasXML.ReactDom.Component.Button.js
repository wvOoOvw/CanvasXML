import { React, ReactDomTag, Location, ReactDom } from './index'

const parseRGBA = (color) => {  
  const matches = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(\.\d+)?)\)$/);  
  if (matches) {  
      return [
          parseInt(matches[1]),  
         parseInt(matches[2]),  
          parseInt(matches[3]),  
           parseFloat(matches[4])  
      ]
  } else {  
      throw new Error('Invalid RGBA color format');  
  }  
}

const recoverRGBA = (color) => {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
}

const reachDiffRGBA = (current ,a, b, time) => {
  const parseCurrent = parseRGBA(current)
  const parseA = parseRGBA(a)
  const parseB = parseRGBA(b)

  const diff = parseA.map((i, index) => parseB[index] - i)

  parseCurrent.forEach((i,index) => {
    parseCurrent[index] = Math.round(i + diff[index] / time)

    if (Math.abs(parseCurrent[index] - parseA[index]) < 1) parseCurrent[index] = parseA[index]
    if (Math.abs(parseCurrent[index] - parseB[index]) < 1) parseCurrent[index] = parseB[index]

    if (parseA[index] > parseB[index] && parseCurrent[index] > parseA[index]) parseCurrent[index] = parseA[index]
    if (parseA[index] > parseB[index] && parseCurrent[index] < parseB[index]) parseCurrent[index] = parseB[index]
    if (parseA[index] < parseB[index] && parseCurrent[index] < parseA[index]) parseCurrent[index] = parseA[index]
    if (parseA[index] < parseB[index] && parseCurrent[index] > parseB[index]) parseCurrent[index] = parseB[index]
  })

  return recoverRGBA(parseCurrent)
}


const App = (props) => {
  const coordinate = Location.coordinate({ x: props.x, y: props.y, w: props.w, h: props.h })

  const defaultBackgroundColor = ['rgba(25, 118, 210, 1)', 'rgba(12, 95, 190, 1)']

  const [inActive, setInActive] = React.useState(false)

  const [backgroundColor, setBackgroundColor] = React.useState(defaultBackgroundColor[0])

  const onMouseMove = e => {
    setInActive(Location.pointcover(coordinate, { x: e.x, y: e.y }))
  }

  const onTouchMove = e => {
    setInActive(e.x.some((i,index) => Location.pointcover(coordinate, { x: e.x[index], y: e.y[index] })))
  }

  const onTouchEnd = e => {
    setInActive(false)
  }

  React.useEffectImmediate(() => {
    if (backgroundColor !== defaultBackgroundColor[1] && inActive === true) {
      setBackgroundColor(reachDiffRGBA( backgroundColor, defaultBackgroundColor[0], defaultBackgroundColor[1], 10))
    }

    if (backgroundColor !== defaultBackgroundColor[0] && inActive === false) {
      setBackgroundColor(reachDiffRGBA( backgroundColor, defaultBackgroundColor[1], defaultBackgroundColor[0], 10))
    }
  })

  return  <layout {...coordinate} verticalCenter horizontalCenter  font={`${props.fontSize}px monospace`}>

    {
      (layoutprops) => <rect beginPath {...layoutprops} radius={12}  onMouseMove={onMouseMove} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          
          <fill isolated fillStyle={backgroundColor}/>
          <clip>
            <layout {...layoutprops} verticalCenter horizontalCenter>
              {
                ReactDomTag.Text.caculateTextLine(layoutprops.w, props.text).map(i => {
                  return <layout w={i.w} h={i.h} verticalCenter horizontalCenter>
                    {
                      (layoutprops) => {
                        return <text {...layoutprops} text={props.text} gap={12} fillStyle='rgba(255, 255, 255, 1)' fillText />
                      }
                    }
                  </layout>
                })
              }
            </layout>
          </clip>
      </rect>
    }

  </layout>
}

export default App