import { React, ReactCanvas2dComponent, ReactCanvas2d, ReactCanvas2dPlugin, ReactCanvas2dTag, ReactCanvas2dUtils, Location } from '../../package/index'

function BlockTitleButton(props) {
  const [hover, setHover] = React.useState(false)

  const transitionCountFillStyle = new Array([45, 60], [45, 60], [45, 60])
    .map(i =>
      ReactCanvas2dPlugin.useTransitionCount({
        defaultCount: i[0],
        destination: i[hover ? 1 : 0],
        rate: (i[1] - i[0]) / 15,
        postprocess: n => n.toFixed(0)
      })
    )

  const onClick = e => {
    if (e.device === 'mouse' && Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y })) {
      if (props.onClick) (props.onClick())
    }
    if (e.device === 'touch' && Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] })) {
      if (props.onClick) (props.onClick())
    }
  }

  const onMouseMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y }))
  }

  const onTouchMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] }))
  }

  return <layout x='extend' y='extend' w='extend' h='extend' onClick={onClick} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>

    <rect x='extend' y='extend' w='extend' h='extend' beginPath radius={8}>
      <fill fillStyle={`rgba(${transitionCountFillStyle[0].transitionCount}, ${transitionCountFillStyle[1].transitionCount}, ${transitionCountFillStyle[2].transitionCount}, 1)`} />
    </rect>

    <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
      <ReactCanvas2dTag.Text.CaculateLine text={props.text} font='24px monospace' lineHeight={1} gap={12} w={props.w} split=' '>
        {
          (line, location) => {
            return <layout w='extend' h={location.h} item>
              <text x='extend' y='extend' fillText fillStyle='rgba(255, 255, 255, 1)' align='center' text={props.text} font='24px monospace' lineHeight={1} gap={12} w={props.w} split=' ' wrap line={line} />
            </layout>
          }
        }
      </ReactCanvas2dTag.Text.CaculateLine>
    </layout>

  </layout>
}

function BlockTitle(props) {
  const { ref: refTextLayout, location: locationTextLayout } = ReactCanvas2dPlugin.useLocationPropertyLazy({ default: { w: 0, h: 0 } })

  React.useEffect(() => props.setHeight(locationTextLayout.h + 48), [locationTextLayout.h])

  return <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
    <layout w='calc(extend - 48px)' h='calc(extend - 48px)' item>

      <layout x='extend' y='extend' w='extend' h='fit-content(extend)' item container horizontalForward verticalForward wrap gap={24} onRenderUnmount={dom => refTextLayout.current = dom}>

        {
          props.content.map(i => {
            return <layout w='180px' h='64px' item>
              <BlockTitleButton w={180} text={i.text} onClick={i.onClick} />
            </layout>
          })
        }

      </layout>

    </layout>
  </layout>
}

function BlockDescription(props) {
  const [expand, setExpand] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  const { ref: refContent, location: locationTextLayout } = ReactCanvas2dPlugin.useLocationPropertyLazy({ default: { w: undefined, h: undefined } })
  const { ref: refTextLineFirst, location: locationTextLineFirst } = ReactCanvas2dPlugin.useLocationPropertyLazy({ default: { w: 0, h: 0 } })

  const { transitionCount: transitionCountExpand } = ReactCanvas2dPlugin.useTransitionCount({ defaultCount: expand ? 1 : 0, destination: expand ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(2)) })

  const transitionCountFillStyle = new Array([45, 60], [45, 60], [45, 60])
    .map(i =>
      ReactCanvas2dPlugin.useTransitionCount({
        defaultCount: i[0],
        destination: i[hover ? 1 : 0],
        rate: (i[1] - i[0]) / 15,
        postprocess: n => n.toFixed(0)
      })
    )

  React.useEffect(() => props.setHeight((expand ? locationTextLayout.h : locationTextLineFirst.h) + 48), [locationTextLayout.h, locationTextLineFirst.h, expand])

  const onClick = e => {
    if (e.device === 'mouse' && Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y })) {
      setExpand(!expand)
    }
    if (e.device === 'touch' && Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] })) {
      setExpand(!expand)
    }
  }

  const onMouseMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y }))
  }

  const onTouchMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] }))
  }

  const content = React.useMemo(() => {
    return props.content.map((i, index) => {
      if (index === 0) return { ...i, text: i.text + ' ' + '...'.slice(0, Math.round(3 - transitionCountExpand * 3)) }
      if (index !== 0) return i
    })
  }, [props.content, transitionCountExpand, locationTextLayout.w])

  return <layout x='extend' y='extend' w='extend' h='extend' onClick={onClick} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>

    <rect x='extend' y='extend' w='extend' h='extend' beginPath radius={16}>
      <fill fillStyle={`rgba(${transitionCountFillStyle[0].transitionCount}, ${transitionCountFillStyle[1].transitionCount}, ${transitionCountFillStyle[2].transitionCount}, 1)`} />
    </rect>

    <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
      <layout w='calc(extend - 48px)' h='calc(extend - 48px)' item>
        <rect x='extend' y='extend' w='extend' h='extend' beginPath>
          <clip x='extend' y='extend' w='extend' h='extend'>

            <layout x='extend' y='extend' w='extend' h='fit-content(extend)' container verticalForward horizontalAlignForward gap={24} onRenderUnmount={dom => refContent.current = dom}>

              {
                content.map((i, index) => {
                  return <ReactCanvas2dTag.Text.CaculateLine text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationTextLayout.w} split=' '>
                    {
                      (line, location) => {
                        return <layout w={location.w} h={location.h} item onRenderUnmount={index === 0 ? dom => refTextLineFirst.current = dom : undefined}>
                          <text x='extend' y='extend' fillText fillStyle={i.fillStyle} align={i.align} text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationTextLayout.w} split=' ' wrap line={line} />
                        </layout>
                      }
                    }
                  </ReactCanvas2dTag.Text.CaculateLine>
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
  const [heightTitle, setHeightTitle] = React.useState(0)

  const { ref: refLayoutRoot, location: locationLayoutRoot } = ReactCanvas2dPlugin.useLocationPropertyLazy({ default: { w: 0, h: 0 } })

  const { transitionCount: transitionCountHeightDescription, setTransitionCount: setTransitionCountHeightDescription } = ReactCanvas2dPlugin.useTransitionCount({ defaultCount: heightDescription, destination: heightDescription, rate: locationLayoutRoot.h * 0.24 / 15, postprocess: n => Number(n.toFixed(2)) })

  React.useEffect(() => {
    if (heightDescription !== 0 && transitionCountHeightDescription === 0) {
      setTransitionCountHeightDescription(heightDescription)
    }
  }, [heightDescription])

  return <>
    <layout x='extend' y='extend' w='extend' h='extend' onRenderUnmount={dom => refLayoutRoot.current = dom}>

      <layout x='extend' y='extend' w='extend' h='extend'>
        <ReactCanvas2dComponent.CoordinateHelper gap={100} color={'rgba(255, 255, 255, 1)'} />
      </layout>

      <layout x='extend' y='extend' w='extend' h='extend' container verticalCenter horizontalAlignCenter gap={24}>

        <layout w='extend' h={heightTitle} item>
          <BlockTitle setHeight={setHeightTitle} content={props.title}/>
        </layout>

        <layout w='extend' h={`calc(100% - ${heightTitle}px)`} item shrink={1} container verticalCenter horizontalAlignCenter gap={24}>

          <layout w='min(calc(100% - 120px), 1600px)' h='60%' item shrink={1}>
            {props.GraphComponent}
          </layout>

          <layout w='min(calc(100% - 120px), 1600px)' h={`min(24%, ${transitionCountHeightDescription}px)`} item shrink={1}>
            <BlockDescription setHeight={setHeightDescription} content={props.description}/>
          </layout>

        </layout>

      </layout>

    </layout>
  </>
}

export default App