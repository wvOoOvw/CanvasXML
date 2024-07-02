import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

function BlockTitleButton(props) {
  const [hover, setHover] = React.useState(false)

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

  return <layout>

    <rect beginPath radius={8} onClick={() => props.onClick()} onPointMove={() => setHover(true)} onPointMoveAway={() => setHover(false)}>
      <fill fillStyle={`rgba(${transitionCountFillStyle[0].transitionCount}, ${transitionCountFillStyle[1].transitionCount}, ${transitionCountFillStyle[2].transitionCount}, 1)`} />
    </rect>

    <layout container horizontalAlignCenter verticalAlignCenter>
      <ReactCanvas2d.Component.TextCaculateLine text={props.text} font='24px monospace' lineHeight={1} gap={12} w={props.w} split=' '>
        {
          (line, location) => {
            return <layout h={location.h} item>
              <text fillText fillStyle='rgba(255, 255, 255, 1)' align='center' text={props.text} font='24px monospace' lineHeight={1} gap={12} w={props.w} split=' ' wrap line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.Component.TextCaculateLine>
    </layout>

  </layout>
}

function BlockTitle(props) {
  const { ref: refTextLayout, location: locationTextLayout } = ReactCanvas2d.Plugin.useLocationPropertyLazy({ default: { w: 0, h: 0 } })

  React.useEffect(() => props.setHeight(locationTextLayout.h + 48), [locationTextLayout.h])

  return <layout container horizontalAlignCenter verticalAlignCenter>
    <layout w='calc(100% - 48px)' h='calc(100% - 48px)' item>

      <layout h='fit-content(100%)' item container horizontalForward verticalForward wrap gap={24} onRenderUnmount={dom => refTextLayout.current = dom}>

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

  const { ref: refTextLayout, location: locationTextLayout } = ReactCanvas2d.Plugin.useLocationPropertyLazy({ default: { w: undefined, h: undefined } })
  const { ref: refTextLineFirst, location: locationTextLineFirst } = ReactCanvas2d.Plugin.useLocationPropertyLazy({ default: { w: undefined, h: undefined } })

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

  React.useEffect(() => {
    if (expand === true && locationTextLayout.h) {
      props.setHeight(locationTextLayout.h + 48)
    }
    if (expand !== true && locationTextLineFirst.h) {
      props.setHeight(locationTextLineFirst.h + 48)
    }
  }, [locationTextLayout.h, locationTextLineFirst.h, expand])

  const content = React.useMemo(() => {
    return props.content.map((i, index) => {
      if (index === 0) return { ...i, text: i.text + ' ' + '...'.slice(0, Math.round(3 - transitionCountExpand * 3)) }
      if (index !== 0) return i
    })
  }, [props.content, transitionCountExpand, locationTextLayout.w])

  return <layout>

    <rect beginPath radius={16} onClick={() => setExpand(!expand)} onPointMove={() => setHover(true)} onPointMoveAway={() => setHover(false)}>
      <fill fillStyle={`rgba(${transitionCountFillStyle[0].transitionCount}, ${transitionCountFillStyle[1].transitionCount}, ${transitionCountFillStyle[2].transitionCount}, 1)`} />
    </rect>

    <layout container horizontalAlignCenter verticalAlignCenter>
      <layout w='calc(100% - 48px)' h='calc(100% - 48px)' item>
        <rect beginPath>
          <clip>

            <layout h='fit-content(100%)' container verticalForward horizontalAlignForward gap={24} onRenderUnmount={dom => refTextLayout.current = dom}>

              {
                content.map((i, index) => {
                  return <ReactCanvas2d.Component.TextCaculateLine text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationTextLayout.w} split=' '>
                    {
                      (line, location) => {
                        return <layout w={location.w} h={location.h} item onRenderUnmount={index === 0 ? dom => refTextLineFirst.current = dom : undefined}>
                          <text fillText fillStyle={i.fillStyle} align={i.align} text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationTextLayout.w} split=' ' wrap line={line} />
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
  const [heightTitle, setHeightTitle] = React.useState(0)

  const { ref: refLayoutRoot, location: locationLayoutRoot } = ReactCanvas2d.Plugin.useLocationPropertyLazy({ default: { w: 0, h: 0 } })

  const { transitionCount: transitionCountHeightDescription, setTransitionCount: setTransitionCountHeightDescription } = ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: heightDescription, destination: heightDescription, rate: locationLayoutRoot.h * 0.24 / 15, postprocess: n => Number(n.toFixed(2)) })

  React.useEffect(() => {
    if (heightDescription !== 0 && transitionCountHeightDescription === 0) {
      setTransitionCountHeightDescription(heightDescription)
    }
  }, [heightDescription])

  return <>
    <layout onRenderUnmount={dom => refLayoutRoot.current = dom}>

      <layout>
        <ReactCanvas2d.Component.CoordinateHelper gap={100} color={'rgba(255, 255, 255, 1)'} />
      </layout>

      <layout container verticalCenter horizontalAlignCenter gap={24}>

        <layout h={heightTitle} item>
          <BlockTitle setHeight={setHeightTitle} content={props.title} />
        </layout>

        <layout h={`calc(100% - ${heightTitle}px)`} item shrink={1} container verticalCenter horizontalAlignCenter gap={24}>

          <layout w='min(calc(100% - 120px), 1600px)' h='60%' item shrink={1}>
            {props.GraphComponent}
          </layout>

          <layout w='min(calc(100% - 120px), 1600px)' h={`min(24%, ${transitionCountHeightDescription}px)`} item shrink={1}>
            <BlockDescription setHeight={setHeightDescription} content={props.description} />
          </layout>

        </layout>

      </layout>

    </layout>
  </>
}

export default App