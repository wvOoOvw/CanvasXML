import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

function Title(props) {
  return <layout container horizontalAlignCenter verticalAlignCenter>
    <layout w='calc(100% - 48px)' h='calc(100% - 48px)' item>
      <layout item container horizontalForward verticalAlignCenter gap={24}>
        {
          props.content.map(i => {
            return <layout w='180px' item>
              <ReactCanvas2d.Component.Button
                mode='fill'
                radius={8}
                text={i.text}
                textColor={[[255, 255], [255, 255], [255, 255], [1, 0.75]]}
                rectColor={[[25, 15], [85, 55], [180, 140], [1, 1]]}
                w={180}
                onButton={{ onClick: i.onClick }}
              />
            </layout>
          })
        }
      </layout>
    </layout>
  </layout>
}

function Description(props) {
  const titleH = 84
  const contentH = 120

  const [expand, setExpand] = React.useState(false)

  const { ref: refTitleLayout, location: locationTitleLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { w: 0, h: 0 } })
  const { ref: refContentLayout, location: locationContentLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { w: 0, h: 0 } })

  return <ReactCanvas2d.Component.Accordion
    titleH={titleH}
    contentH={contentH}
    expand={expand}
    onChangeHeight={height => props.setHeight(height + titleH)}
    titleComponent={
      <layout container horizontalAlignCenter verticalAlignCenter onLocationMount={dom => refTitleLayout.current = dom}>
        <ReactCanvas2d.Component.Button onButton={{ onClick: () => setExpand(!expand) }} />
        {
          props.content.filter((i, index) => index === 0).map((i, index) => {
            return <ReactCanvas2d.Component.TextCaculateLine text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationTitleLayout.w - 48} split=' '>
              {
                (line, location) => {
                  return <layout w='calc(100% - 48px)' h={location.h} item>
                    <text fillText fillStyle={i.fillStyle} align={i.align} font={i.font} lineHeight={i.lineHeight} gap={i.gap} line={line} />
                  </layout>
                }
              }
            </ReactCanvas2d.Component.TextCaculateLine>
          })
        }
      </layout>
    }
    contentComponent={
      <layout container verticalForward horizontalAlignCenter onLocationMount={dom => refContentLayout.current = dom}>
        <rect beginPath fill fillStyle='rgba(45, 45, 45, 1)'></rect>
        <layout h='24px' item></layout>
        {
          props.content.filter((i, index) => index !== 0).map((i, index) => {
            return <ReactCanvas2d.Component.TextCaculateLine text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationContentLayout.w - 48} split=' ' wrap>
              {
                (line, location) => {
                  return <layout w='calc(100% - 48px)' h={location.h} item>
                    <text fillText fillStyle={i.fillStyle} align={i.align} font={i.font} lineHeight={i.lineHeight} gap={i.gap} line={line} />
                  </layout>
                }
              }
            </ReactCanvas2d.Component.TextCaculateLine>
          })
        }
        <layout h='24px' item></layout>
      </layout>
    }
  />

}

function App(props) {
  const [heightDescription, setHeightDescription] = React.useState(84)

  const { ref: refLayoutRoot, location: locationLayoutRoot } = ReactCanvas2d.Plugin.useLocationProperty({ default: { w: 0, h: 0 } })

  const { transitionCount: transitionCountHeightDescription, setTransitionCount: setTransitionCountHeightDescription } = React.Plugin.useTransitionCount({ play: true, defaultCount: heightDescription, destination: heightDescription, rate: locationLayoutRoot.h * 0.24 / 15, postprocess: n => Number(n.toFixed(2)) })

  React.useEffect(() => setTransitionCountHeightDescription(heightDescription), [heightDescription])

  return <>
    <layout onRenderUnmount={dom => refLayoutRoot.current = dom}>

      <layout>
        <ReactCanvas2d.Component.CoordinateHelper gap={100} color={'rgba(255, 255, 255, 1)'} />
      </layout>

      <layout container verticalCenter horizontalAlignCenter gap={24}>

        <layout h='112px' item>
          <Title content={props.title} />
        </layout>

        <layout h={`calc(100% - 112px)`} item shrink={1} container verticalCenter horizontalAlignCenter gap={24}>

          <layout w='min(calc(100% - 120px), 1600px)' h='60%' item shrink={1}>
            {props.GraphComponent}
          </layout>

          <layout w='min(calc(100% - 120px), 1600px)' h={`min(24%, ${transitionCountHeightDescription}px)`} item shrink={1}>
            <Description content={props.description} setHeight={setHeightDescription} />
          </layout>

        </layout>

      </layout>

    </layout>
  </>
}

export default App