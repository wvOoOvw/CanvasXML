import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

function BlockDescription(props) {
  const [expand, setExpand] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  const { ref: refContent, location: locationTextLayout } = ReactCanvas2d.Plugin.useLocationPropertyLazy({ default: { w: undefined, h: undefined } })
  const { ref: refTextLineFirst, location: locationTextLineFirst } = ReactCanvas2d.Plugin.useLocationPropertyLazy({ default: { w: 0, h: 0 } })

  const { transitionCount: transitionCountExpand } = ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: expand ? 1 : 0, destination: expand ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(2)) })

  const transitionCountFillStyle = new Array([45, 60], [45, 60], [45, 60])
    .map(i =>
      ReactCanvas2d.Plugin.useTransitionCount({
        play: true,
        defaultCount: i[0],
        destination: i[hover ? 1 : 0],
        rate: (i[1] - i[0]) / 15,
        postprocess: n => n.toFixed(0)
      })
    )

  React.useEffect(() => props.setHeight((expand ? locationTextLayout.h : locationTextLineFirst.h) + 48), [locationTextLayout.h, locationTextLineFirst.h, expand])

  const onClick = e => {
    if (e.device === 'mouse' && Canvas2d.Location.pointcover(e.dom.props, { x: e.x, y: e.y })) {
      setExpand(!expand)
    }
    if (e.device === 'touch' && Canvas2d.Location.pointcover(e.dom.props, { x: e.x[0], y: e.y[0] })) {
      setExpand(!expand)
    }
  }

  const content = React.useMemo(() => {
    return props.content.map((i, index) => {
      if (index === 0) return { ...i, text: i.text + ' ' + '...'.slice(0, Math.round(3 - transitionCountExpand * 3)) }
      if (index !== 0) return i
    })
  }, [props.content, transitionCountExpand, locationTextLayout.w])

  // console.log(content[0].text, transitionCountExpand)

  return <layout  onClick={onClick}>

    <rect  beginPath radius={16}>
      <fill fillStyle={`rgba(${transitionCountFillStyle[0].transitionCount}, ${transitionCountFillStyle[1].transitionCount}, ${transitionCountFillStyle[2].transitionCount}, 1)`} />
    </rect>

    <layout  container horizontalAlignCenter verticalAlignCenter>
      <layout w='calc(extend - 48px)' h='calc(extend - 48px)' item>
        <rect  beginPath>
          <clip>

            <layout x='extend' y='extend' w='extend' h='fit-content(extend)' container verticalForward horizontalAlignForward gap={24} onRenderUnmount={dom => refContent.current = dom}>

              {
                content.map((i, index) => {
                  return <ReactCanvas2d.Component.TextCaculateLine text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationTextLayout.w} split=' '>
                    {
                      (line, location) => {
                        return <layout w={location.w} h={location.h} item onRenderUnmount={index === 0 ? dom => refTextLineFirst.current = dom : undefined}>
                          <text x='extend' y='extend' fillText fillStyle={i.fillStyle} align={i.align} text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationTextLayout.w} split=' ' wrap />
                        </layout>
                      }
                    }
                  </ReactCanvas2d.Component.TextCaculateLine>
                })
              }

            </layout>

          </clip>
        </rect>
      </layout>
    </layout>

  </layout>
}

function App(props) {
  const [heightDescription, setHeightDescription] = React.useState(0)

  // const { transitionCount: transitionCountHeightDescription, setTransitionCount: setTransitionCountHeightDescription } = ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: heightDescription, destination: heightDescription, rate: 1000 * 0.24 / 15, postprocess: n => Number(n.toFixed(2)) })

  // React.useEffect(() => {
  //   if (heightDescription !== 0 && transitionCountHeightDescription === 0) {
  //     setTransitionCountHeightDescription(heightDescription)
  //   }
  // }, [heightDescription])

  const description =
    [
      {
        text: 'Component <Rect/> API',
        font: '28px monospace',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
        align: 'left',
      },
      {
        text: 'This Is A Basic Rect Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes, Try To Click The Rect Above To Change The Color',
        font: '24px monospace',
        fillStyle: 'rgba(185, 185, 185, 1)',
        lineHeight: 1,
        gap: 12,
        align: 'left',
      },
    ]

  return  <layout x='400px' y='400px' w='800px' h={`${heightDescription}px`}>
    <BlockDescription setHeight={setHeightDescription} content={description}/>
  </layout>
}

export default App