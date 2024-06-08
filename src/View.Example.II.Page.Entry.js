import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Layout from './Utils.Layout'
import Caculate from './Utils.Caculate'
import Position from './Utils.Position'
import Draw from './Utils.Draw'

import CoordinateBoxHelper from './Component.CoordinateBoxHelper'

import kaltsit_e1 from '../static/kaltsit_e1.png'
import background from '../static/bg.97101e.jpg'
import setting from '../static/setting.svg'

function RoleInfomationLevel(props) {
  const context = ReactAnimation.useContext()

  ReactAnimation.component(CoordinateBoxHelper)({ position: props.position })
}

function RoleInfomationText(props) {
  const context = ReactAnimation.useContext()

  const coordinate = context.coordinate

  const position = Position.coordinatefromcenter({ ...props.position, w: props.position.w - coordinate.vmin * 5, h: props.position.h - coordinate.vmin * 5 })

  ReactAnimation.component(CoordinateBoxHelper)({ position: props.position })

  context.context.save()

  // if (props.type === 1) {
  //   context.context.font = `40px monospace`
  //   context.context.fillStyle = 'rgba(35, 35, 35, 1)'

  //   const textLine = Draw.drawTextCaculateLine(context.context, position, '罗德岛最高管理者之一，阿米娅的直接辅导者。罗德岛医疗部门的总负责人。作为罗德岛的老成员，凯尔希医生是在阿米娅背后最稳固的援护者。')

  //   const layout = Layout.compose(
  //     {
  //       position: position,
  //       layout: Layout.verticalforward,
  //       postprocess: Layout.postprocessx,
  //       positions: textLine.map(i => Object({ position: { ...i, h: i.h * 1.5 } }))
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

    const layout = Layout.compose(
      {
        layout: (position, positions) => { Layout.verticalforward(position, positions); Layout.postprocesscopy(position, positions)(['x']); },
        position: position,
        positions: textLine.map(i => Object({ position: { w: i.w, h: i.h * 1.5 }, property: { text: i.text } }))
      },
    )

    // console.log(layout)

    layout.forEach(i => {
      Draw.drawText(context.context, { ...i.position, y: i.position.y + i.position.h }, i.property.text)
    })
  }

  context.context.restore()
}

function RoleInfomation(props) {
  const context = ReactAnimation.useContext()

  // ReactAnimation.component(CoordinateBoxHelper)({ position: props.position })

  const layout = Layout.compose(
    {
      layout: (position, positions) => { Layout.horizontalforward(position, positions); Layout.postprocesscopy(position, positions)(['y', 'h']); },
      position: props.position,
      positions: [
        {
          layout: (position, positions) => { Layout.verticalforward(position, positions); Layout.postprocesscopy(position, positions)(['x', 'w']); },
          position: { w: props.position.vw * 90 },
          positions: [
            { position: { h: props.position.vh * 25 }, property: { key: 'RoleInfomationText-1' } },
            { position: { h: props.position.vh * 15 }, property: { key: 'RoleInfomationText-2' } },
            { position: { h: props.position.vh * 60 }, property: { key: 'RoleInfomationText-3' } },
          ]
        },
        {
          position: { w: props.position.vw * 10 }, property: { key: 'RoleInfomationLevel' }
        },
      ]
    },
  )

  layout.forEach(i => {
    if (i.property && i.property.key === 'RoleInfomationText-1') ReactAnimation.component(RoleInfomationText)({ position: Position.coordinate(i.position), type: 1 })
    if (i.property && i.property.key === 'RoleInfomationText-2') ReactAnimation.component(RoleInfomationText)({ position: Position.coordinate(i.position), type: 2 })
    if (i.property && i.property.key === 'RoleInfomationText-3') ReactAnimation.component(RoleInfomationText)({ position: Position.coordinate(i.position), type: 3 })
    if (i.property && i.property.key === 'RoleInfomationLevel') ReactAnimation.component(RoleInfomationLevel)({ position: Position.coordinate(i.position) })
  })
}

function RoleFilter(props) {
  const context = ReactAnimation.useContext()

  ReactAnimation.component(CoordinateBoxHelper)({ position: props.position })
}

function RoleList(props) {
  const context = ReactAnimation.useContext()

  // ReactAnimation.component(CoordinateBoxHelper)({ position: props.position })

  const [drag, setDrag] = ReactAnimation.useState({ x: 0, y: 0 })

  context.context.save()

  Draw.drawRect(context.context, props.position)

  context.context.clip()

  const layout = Layout.compose(
    {
      layout: (position, positions) => { Layout.horizontalforward(position, positions); Layout.postprocesscopy(position, positions)(['y', 'h']); },
      position: { ...props.position, x: props.position.x + drag.x },
      positions: [
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-1' } },
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-2' } },
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-3' } },
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-1' } },
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-2' } },
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-3' } },
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-1' } },
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-2' } },
        { position: { w: props.position.h }, property: { key: 'RoleInfomationText-3' } },
      ]
    },
  )

  layout.forEach(i => {
    ReactAnimation.component(CoordinateBoxHelper)({ position: i.position })
  })

  context.context.restore()

  const onChange = (params) => {
    if (params.type === 'mouse' && params.status === 'afterMove') drag.x = drag.x + params.changedX
    if (params.type === 'touch' && params.status === 'afterMove') drag.x = drag.x + params.changedX[0]
    setDrag(drag)
  }

  ReactAnimationPlugin.useDragControl({ onChange: ReactAnimation.useCallback(onChange, []), enable: true, useEventListener: context.useEventListener, startOption: { position: props.position } })
}

function App() {
  const context = ReactAnimation.useContext()

  const coordinate = context.coordinate

  const { image: imageKaltsit } = ReactAnimationPlugin.useImage({ src: kaltsit_e1, onload: ReactAnimation.shouldRender })
  const { image: imageBackground } = ReactAnimationPlugin.useImage({ src: background, onload: ReactAnimation.shouldRender })

  const pageAnimationCount = Caculate.range(Caculate.number(context.pageAnimationCount, 2), 0, 1)

  context.context.save()

  context.context.globalAlpha = pageAnimationCount

  Draw.drawImageClipMaxCenter(context.context, coordinate, imageBackground)
  Draw.drawImageClipMinCenter(context.context, Position.coordinatefromcenter({ cx: coordinate.cx, cy: coordinate.cy + coordinate.vh * 10 + coordinate.vh * 10 * (1 - pageAnimationCount), w: coordinate.vw * 180, h: coordinate.vh * 100 }), imageKaltsit)

  const layout = Layout.compose(
    {
      layout: (position, positions) => { Layout.verticalreverse(position, positions); Layout.postprocesscopy(position, positions)(['x', 'w']); },
      position: coordinate,
      positions: [
        {
          position: { h: coordinate.vh * 16 },
          layout: (position, positions) => { Layout.horizontalforward(position, positions); Layout.postprocesscopy(position, positions)(['y', 'h']); },
          positions: [
            { position: { w: coordinate.vw * 80 }, property: { key: 'RoleList' } },
            { position: { w: coordinate.vw * 20 }, property: { key: 'RoleFilter' } },
          ]
        },
        {
          position: { h: coordinate.vh * 32 }, property: { key: 'RoleInfomation' }
        },
      ]
    },
  )

  layout.forEach(i => {
    if (i.property && i.property.key === 'RoleList') ReactAnimation.component(RoleList)({ position: Position.coordinate(i.position) })
    if (i.property && i.property.key === 'RoleFilter') ReactAnimation.component(RoleFilter)({ position: Position.coordinate(i.position) })
    if (i.property && i.property.key === 'RoleInfomation') ReactAnimation.component(RoleInfomation)({ position: Position.coordinate(i.position) })
  })
}

export default App
