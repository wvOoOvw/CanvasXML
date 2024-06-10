import { Caculate, Draw, Layout, Position, PositionBatch, PositionCover, React, ReactPlugin } from '../package/index'

import CoordinateBoxHelper from './Component.CoordinateBoxHelper'

import kaltsit_e1 from '../static/kaltsit_e1.png'
import background from '../static/bg.97101e.jpg'
import setting from '../static/setting.svg'

React.createElement = Layout.layoutReactBabelCreateElement

function RoleInfomationLevel(props) {
  const context = React.useContext()

  React.component(CoordinateBoxHelper)({ context: context.context, position: props.position })
}

function RoleInfomationText(props) {
  const context = React.useContext()

  const coordinate = context.coordinate

  const position = Position.coordinatefromcenter({ ...props.position, w: props.position.w - coordinate.vmin * 5, h: props.position.h - coordinate.vmin * 5 })

  React.component(CoordinateBoxHelper)({ context: context.context, position: props.position })

  context.context.save()

  // if (props.type === 1) {
  //   context.context.font = `40px monospace`
  //   context.context.fillStyle = 'rgba(35, 35, 35, 1)'

  //   const textLine = Draw.drawTextCaculateLine(context.context, position, '罗德岛最高管理者之一，阿米娅的直接辅导者。罗德岛医疗部门的总负责人。作为罗德岛的老成员，凯尔希医生是在阿米娅背后最稳固的援护者。')

  //   const layout = Layout.layout(
  //     {
  //       position: position,
  //       layoutProcess: Layout.verticalForward,
  //       postprocess: Layout.postprocessx,
  //       children: textLine.map(i => Object({ position: { ...i, h: i.h * 1.5 } }))
  //     },
  //   )


  //   layout.forEach(i => {
  //     Draw.drawText(context.context, { ...i, y: i.y + i.h }, i.text)
  //   })
  // }

  if (props.type === 3) {
    context.context.font = `28px monospace`
    context.context.fillStyle = 'rgba(35, 35, 35, 1)'

    const textLine = Draw.drawTextCaculateLine(context.context, position, '罗德岛最高管理者之一，阿米娅的直接辅导者。罗德岛医疗部门的总负责人。作为罗德岛的老成员，凯尔希医生是在阿米娅背后最稳固的援护者。')

    const layout = Layout.layout(
      {
        layoutProcess: [Layout.verticalForward, Layout.layoutProcessCopy(['x'])],
        position: position,
        children: textLine.map(i => Object({ position: { w: i.w, h: i.h * 1.5 }, text: i.text }))
      },
    )

    layout.forEach(i => {
      if (i.text) Draw.drawText(context.context, { ...i.position, y: i.position.y + i.position.h }, i.text)
    })
  }

  context.context.restore()
}

function RoleListFilter(props) {
  const context = React.useContext()

  React.component(CoordinateBoxHelper)({ context: context.context, position: props.position })
}

function RoleListPick(props) {
  const context = React.useContext()

  const [drag, setDrag] = React.useState({ x: 0, y: 0 })

  const layout = Layout.layout(
    <layout position={{ ...props.position, x: props.position.x + drag.x }} layoutProcess={[Layout.horizontalForward, Layout.layoutProcessCopy(['y', 'h']), Layout.layoutProcessCoordinate]}>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
      <layout position={(layoutPosition) => ({ w: layoutPosition.h })} property={{ key: 'RoleListItem' }}></layout>
    </layout>
  )

  const onChange = (params) => {
    if (params.type === 'mouse' && params.status === 'afterMove') drag.x = drag.x + params.changedX * 2
    if (params.type === 'touch' && params.status === 'afterMove') drag.x = drag.x + params.changedX[0] * 2
    setDrag(drag)
  }

  ReactPlugin.useDragControl({ onChange: React.useCallback(onChange, []), enable: true, useEventListener: context.useEventListener, startOption: { position: props.position } })

  context.context.save()

  Draw.drawRect(context.context, props.position)

  context.context.clip()

  layout.forEach(i => {
    React.component(CoordinateBoxHelper)({ context: context.context, position: i.position })
  })

  context.context.restore()
}

function Background(props) {
  const context = React.useContext()

  const pageAnimationCount = Caculate.range(Caculate.number(context.pageAnimationCount, 2), 0, 1)

  const { image: imageKaltsit } = ReactPlugin.useImage({ src: kaltsit_e1, onload: React.shouldRender })
  const { image: imageBackground } = ReactPlugin.useImage({ src: background, onload: React.shouldRender })

  context.context.save()

  Draw.drawImageClipMaxCenter(context.context, props.position, imageBackground)
  Draw.drawImageClipMinCenter(context.context, Position.coordinatefromcenter({ cx: props.position.cx, cy: props.position.cy + props.position.vh * 10 + props.position.vh * 10 * (1 - pageAnimationCount), w: props.position.vw * 180, h: props.position.vh * 100 }), imageKaltsit)

  context.context.restore()
}

function App() {
  const context = React.useContext()

  const coordinate = context.coordinate

  const pageAnimationCount = Caculate.range(Caculate.number(context.pageAnimationCount, 2), 0, 1)

  context.context.save()

  context.context.globalAlpha = pageAnimationCount

  Layout.layout(
    <Background position={coordinate} layoutProcess={[Layout.verticalReverse, Layout.layoutProcessCopy(['x', 'w']), Layout.layoutProcessCoordinate]}>
      <layout position={(layoutPosition) => ({ h: layoutPosition.vh * 16 })} layoutProcess={[Layout.horizontalForward, Layout.layoutProcessCopy(['y', 'h']), Layout.layoutProcessCoordinate]}>
        <RoleListPick position={(layoutPosition) => ({ w: layoutPosition.vw * 80 })}></RoleListPick>
        <RoleListFilter position={(layoutPosition) => ({ w: layoutPosition.vw * 20 })}></RoleListFilter>
      </layout>
      <layout position={(layoutPosition) => ({ h: layoutPosition.vh * 32 })} layoutProcess={[Layout.horizontalForward, Layout.layoutProcessCopy(['y', 'h']), Layout.layoutProcessCoordinate]}>
        <layout position={(layoutPosition) => ({ w: layoutPosition.vw * 90 })} layoutProcess={[Layout.verticalForward, Layout.layoutProcessCopy(['x', 'w']), Layout.layoutProcessCoordinate]}>
          <RoleInfomationText position={(layoutPosition) => ({ h: layoutPosition.vh * 25 })} type={1}></RoleInfomationText>
          <RoleInfomationText position={(layoutPosition) => ({ h: layoutPosition.vh * 15 })} type={2}></RoleInfomationText>
          <RoleInfomationText position={(layoutPosition) => ({ h: layoutPosition.vh * 60 })} type={3}></RoleInfomationText>
        </layout>
        <RoleInfomationLevel position={(layoutPosition) => ({ w: layoutPosition.vw * 25 })}></RoleInfomationLevel>
      </layout>
    </Background>
  )

  context.context.restore()
}

export default App
