import { React, ReactDomComponent, ReactDom, ReactDomPlugin, ReactDomTag, ReactDomUtils, Location } from '../../package/index'

function RectComponent() {
  const [active, setActive] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  const destinationRadius = hover ? 24 : 8
  const destinationFillStyleRed = active ? 115 : 145
  const destinationFillStyleGreen = active ? 125 : 145
  const destinationFillStyleBlue = active ? 170 : 145

  const { transitionCount: radius } = ReactDomPlugin.useTransitionCount({ defaultCount: 8, destination: destinationRadius, rate: 16 / 15, postprocess: n => Number(n.toFixed(2)) })
  const { transitionCount: fillStyleRed } = ReactDomPlugin.useTransitionCount({ defaultCount: 145, destination: destinationFillStyleRed, rate: 30 / 15, postprocess: n => n.toFixed(0) })
  const { transitionCount: fillStyleGreen } = ReactDomPlugin.useTransitionCount({ defaultCount: 145, destination: destinationFillStyleGreen, rate: 20 / 15, postprocess: n => n.toFixed(0) })
  const { transitionCount: fillStyleBlue } = ReactDomPlugin.useTransitionCount({ defaultCount: 145, destination: destinationFillStyleBlue, rate: 25 / 15, postprocess: n => n.toFixed(0) })

  const fillStyle = `rgba(${fillStyleRed}, ${fillStyleGreen}, ${fillStyleBlue}, 1)`

  const onClick = e => {
    if (e.device === 'mouse' && Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y })) {
      setActive(!active)
    }
    if (e.device === 'touch' && Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] })) {
      setActive(!active)
    }
  }

  const onMouseMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y }))
  }

  const onTouchMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] }))
  }

  return <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle={fillStyle} radius={radius} onClick={onClick} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
    <fill />
  </rect>
}

function BlockGraph() {
  return <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle='rgba(255, 255, 255, 1)' radius={16}>

    <fill />

    <clip x='extend' y='extend' w='extend' h='extend'>
      <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
        <layout w='92%' h='92%' gap={24} item container wrap horizontalCenter verticalCenter>
          {
            new Array(12).fill().map(i => {
              return <layout w='120' h='120' item>
                <RectComponent />
              </layout>
            })
          }
        </layout>
      </layout>
    </clip>

  </rect>
}

function BlockTitleButton(props) {
  const [hover, setHover] = React.useState(false)

  const transitionCountFillStyle = new Array([45, 60], [45, 60], [45, 60])
    .map(i =>
      ReactDomPlugin.useTransitionCount({
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
      <ReactDomTag.Text.CaculateLine w={props.w} font='24px monospace' text={props.text} split=' '>
        {
          (lines) => {
            return <layout w={Math.max(...lines.map(i => i.w))} h={lines.reduce((t, i) => t + 24 * 1.5, 0)} item container verticalForward horizontalAlignCenter>
              {
                lines.map(line => {
                  return <layout w='extend' h={line.h * 1.5} item container horizontalAlignCenter verticalAlignCenter>
                    <layout w={line.w} h={line.h} item>
                      <text x='extend' y='extend' w='extend' h='extend' fillText fillStyle='rgba(255, 255, 255, 1)' font='24px monospace' text={line.text} lineHeight={1} />
                    </layout>
                  </layout>
                })
              }
            </layout>
          }
        }
      </ReactDomTag.Text.CaculateLine>
    </layout>

  </layout>
}

function BlockTitle(props) {
  const { ref: refContent, location: locationContent } = ReactDomPlugin.useLocationPropertyLazy({ default: { w: 0, h: 0 } })

  React.useEffect(() => props.setHeight(locationContent.h + 48), [locationContent.h])

  const content =
    [
      {
        text: 'CanvasXML',
      },
      {
        text: 'Document',
      },
      {
        text: 'Github',
        onClick: () => window.open('https://github.com/wvOoOvw/20240601x001')
      },
      {
        text: 'Npm',
      },
    ]

  return <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
    <layout w='calc(extend - 48px)' h='calc(extend - 48px)' item>

      <layout x='extend' y='extend' w='extend' h='fit-content(extend)' item container horizontalForward verticalForward wrap gap={24} onRenderUnmount={dom => refContent.current = dom}>

        {
          content.map(i => {
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

  const { ref: refContent, location: locationContent } = ReactDomPlugin.useLocationPropertyLazy({ default: { w: undefined, h: undefined } })

  const { transitionCount: transitionCountExpand } = ReactDomPlugin.useTransitionCount({ defaultCount: expand ? 1 : 0, destination: expand ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(2)) })

  const transitionCountFillStyle = new Array([45, 60], [45, 60], [45, 60])
    .map(i =>
      ReactDomPlugin.useTransitionCount({
        defaultCount: i[0],
        destination: i[hover ? 1 : 0],
        rate: (i[1] - i[0]) / 15,
        postprocess: n => n.toFixed(0)
      })
    )

  React.useEffect(() => props.setHeight(expand ? locationContent.h + 48 : 90), [locationContent.h, expand])

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
    return [
      {
        text: 'Component <Rect/> API' + ' ' + '...'.slice(0, Math.round(3 - transitionCountExpand * 3)),
        font: '28px monospace',
        fillStyle: 'rgba(255, 255, 255, 1)',
        marginBottom: 16,
      },
      {
        text: 'This Is A Basic Rect Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes, Try To Click The Rect Above To Change The Color',
        font: '24px monospace',
        fillStyle: 'rgba(185, 185, 185, 1)',
        marginBottom: 0,
      },
    ].map(i => Object({ ...i, w: locationContent.w, split: ' ' }))
  }, [transitionCountExpand, locationContent.w])

  return <layout x='extend' y='extend' w='extend' h='extend' onClick={onClick} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>

    <rect x='extend' y='extend' w='extend' h='extend' beginPath radius={16}>
      <fill fillStyle={`rgba(${transitionCountFillStyle[0].transitionCount}, ${transitionCountFillStyle[1].transitionCount}, ${transitionCountFillStyle[2].transitionCount}, 1)`} />
    </rect>

    <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
      <layout w='calc(extend - 48px)' h='calc(extend - 48px)' item>
        <rect x='extend' y='extend' w='extend' h='extend' beginPath radius={16}>
          <clip x='extend' y='extend' w='extend' h='extend'>

            <layout x='extend' y='extend' w='extend' h='fit-content(extend)' container verticalForward horizontalAlignForward gap={12} onRenderUnmount={dom => refContent.current = dom}>

              <ReactDomTag.Text.CaculateLines text={content}>
                {
                  (lines) => {
                    return <layout w={Math.max(...lines.map(i => i.w))} h={lines.reduce((t, i) => t + i.h * 1.5, 0) + lines[0].marginBottom} item>
                      <layout x='extend' y='extend' w='extend' h='extend' container verticalForward horizontalAlignCenter>
                        {
                          lines.map(line => {
                            return <layout w='extend' h={line.h * 1.5} item>
                              <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignForward verticalAlignCenter>
                                <layout w={line.w} h={line.h} item>
                                  <text x='extend' y='extend' w='extend' h='extend' fillText fillStyle={line.fillStyle} font={line.font} text={line.text} lineHeight={1} />
                                </layout>
                              </layout>
                            </layout>
                          })
                        }
                      </layout>
                    </layout>
                  }
                }
              </ReactDomTag.Text.CaculateLines>

            </layout>

          </clip>
        </rect>
      </layout>
    </layout>

  </layout>
}

function BlockControl() {
  const [open, setOpen] = React.useState(false)

  const { transitionCount: openTrasition } = ReactDomPlugin.useTransitionCount({ defaultCount: 0, destination: open ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(2)) })

  return null
}

function App() {
  const [heightDescription, setHeightDescription] = React.useState(0)
  const [heightTitle, setHeightTitle] = React.useState(0)

  const { ref: refLayoutRoot, location: locationLayoutRoot } = ReactDomPlugin.useLocationPropertyLazy({ default: { w: 0, h: 0 } })

  const { transitionCount: transitionCountHeightDescription, setTransitionCount: setTransitionCountHeightDescription } = ReactDomPlugin.useTransitionCount({ defaultCount: heightDescription, destination: heightDescription, rate: locationLayoutRoot.h * 0.24 / 15, postprocess: n => Number(n.toFixed(2)) })

  React.useEffect(() => {
    if (heightDescription !== 0 && transitionCountHeightDescription === 0) {
      setTransitionCountHeightDescription(heightDescription)
    }
  }, [heightDescription])

  return <>
    <layout x='extend' y='extend' w='extend' h='extend' onRenderUnmount={dom => refLayoutRoot.current = dom}>

      <layout x='extend' y='extend' w='extend' h='extend'>
        <ReactDomComponent.CoordinateHelper gap={100} color={'rgba(255, 255, 255, 1)'} />
      </layout>

      <layout x='extend' y='extend' w='extend' h='extend' container verticalCenter horizontalAlignCenter gap={24}>

        <layout w='extend' h={heightTitle} item>
          <BlockTitle setHeight={setHeightTitle} />
        </layout>

        <layout w='extend' h={`calc(100% - ${heightTitle}px)`} item shrink={1} container verticalCenter horizontalAlignCenter gap={24}>

          <layout w='min(calc(100% - 120px), 1600px)' h='60%' item shrink={1}>
            <BlockGraph />
          </layout>

          <layout w='min(calc(100% - 120px), 1600px)' h={`min(24%, ${transitionCountHeightDescription}px)`} item shrink={1}>
            <BlockDescription setHeight={setHeightDescription} />
          </layout>

        </layout>

      </layout>

    </layout >
  </>
}

export default App