import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

function Title(props) {
  return <layout container horizontalAlignCenter verticalAlignCenter>
    <layout w='calc(100% - 48px)' h='calc(100% - 48px)' item>
      <layout item container horizontalForward verticalAlignCenter gap={24}>
        {
          props.content.map(i => {
            return <layout w='180px' item>
              <ReactCanvas2dExtensions.Button
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

  const { ref: refTitleLayout, location: locationTitleLayout } = ReactCanvas2dExtensions.useLocationProperty({ default: { w: 0, h: 0 } })
  const { ref: refContentLayout, location: locationContentLayout } = ReactCanvas2dExtensions.useLocationProperty({ default: { w: 0, h: 0 } })

  return <ReactCanvas2dExtensions.Accordion
    titleH={titleH}
    contentH={contentH}
    expand={expand}
    onChangeHeight={height => props.setHeight(height + titleH)}
    titleComponent={
      <layout container horizontalAlignCenter verticalAlignCenter onLocationMounted={dom => refTitleLayout.current = dom}>
        <ReactCanvas2dExtensions.Button onButton={{ onClick: () => setExpand(!expand) }} />
        {
          props.content.filter((i, index) => index === 0).map((i, index) => {
            return <ReactCanvas2dExtensions.Text text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationTitleLayout.w - 48} split=' '>
              {
                (line, location) => {
                  return <layout w='calc(100% - 48px)' h={location.h} item>
                    {
                      line.map((n) => {
                        return <text fillText fillStyle={i.fillStyle} w={n.w} y={n.y} text={n.text} font={n.font} />
                      })
                    }
                  </layout>
                }
              }
            </ReactCanvas2dExtensions.Text>
          })
        }
      </layout>
    }
    contentComponent={
      <layout container verticalForward horizontalAlignCenter onLocationMounted={dom => refContentLayout.current = dom}>
        <rectradius fill fillStyle='rgba(45, 45, 45, 1)'></rectradius>
        <layout h='24px' item></layout>
        {
          props.content.filter((i, index) => index !== 0).map((i, index) => {
            return <ReactCanvas2dExtensions.Text text={i.text} font={i.font} lineHeight={i.lineHeight} gap={i.gap} w={locationContentLayout.w - 48} split=' ' wrap>
              {
                (line, location) => {
                  return <layout w='calc(100% - 48px)' h={location.h} item>
                    {
                      line.map((n) => {
                        return <text fillText fillStyle={i.fillStyle} w={n.w} y={n.y} text={n.text} font={n.font} />
                      })
                    }
                  </layout>
                }
              }
            </ReactCanvas2dExtensions.Text>
          })
        }
        <layout h='24px' item></layout>
      </layout>
    }
  />

}

function App(props) {
  const [heightDescription, setHeightDescription] = React.useState(84)

  const { ref: refLayoutRoot, location: locationLayoutRoot } = ReactCanvas2dExtensions.useLocationProperty({ default: { w: 0, h: 0 } })

  const { animationCount: animationCountHeightDescription, setAnimationCount: setAnimationCountHeightDescription } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: heightDescription, destination: heightDescription, rate: locationLayoutRoot.h * 0.24 / 15, postprocess: n => Number(n.toFixed(2)) })

  React.useEffect(() => setAnimationCountHeightDescription(heightDescription), [heightDescription])

  return <>
    <layout onRenderUnmounted={dom => refLayoutRoot.current = dom}>

      <layout>
        <ReactCanvas2dExtensions.CoordinateHelper gap={100} color={'rgba(255, 255, 255, 1)'} />
      </layout>

      <layout container verticalCenter horizontalAlignCenter gap={24}>

        <layout h='112px' item>
          <Title content={props.title} />
        </layout>

        <layout h={`calc(100% - 112px)`} item shrink={1} container verticalCenter horizontalAlignCenter gap={24}>

          <layout w='min(calc(100% - 120px), 1600px)' h='60%' item shrink={1}>
            {props.GraphComponent}
          </layout>

          <layout w='min(calc(100% - 120px), 1600px)' h={`min(24%, ${animationCountHeightDescription}px)`} item shrink={1}>
            <Description content={props.description} setHeight={setHeightDescription} />
          </layout>

        </layout>

      </layout>

    </layout>
  </>
}

export default App