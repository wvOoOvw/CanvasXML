import { Position, React } from '../package/index'

const App = (props) => {
  return new Array(Math.ceil(Position.vmax(props.position) * 100 / props.gap / 2)).fill().map((i, index) => {
    if (index === 0) {
      return <>
        <rect save fill x={props.position.x} y={props.position.cy} w={Position.vmax(props.position) * 100} h={Position.vmax(props.position) * 0.1} globalAlpha={0.5} fillStyle={props.color} onClick={e => console.log(e)}/>
        <rect save fill x={props.position.cx} y={props.position.y} w={Position.vmax(props.position) * 0.1} h={Position.vmax(props.position) * 100} globalAlpha={0.5} fillStyle={props.color} />
      </>
    }

    if (index !== 0) {
      return <>
        <rect save fill x={props.position.x} y={props.position.cy + props.gap * index} w={Position.vmax(props.position) * 100} h={Position.vmax(props.position) * 0.1} globalAlpha={0.25} fillStyle={props.color} />
        <rect save fill x={props.position.x} y={props.position.cy - props.gap * index} w={Position.vmax(props.position) * 100} h={Position.vmax(props.position) * 0.1} globalAlpha={0.25} fillStyle={props.color} />
        <rect save fill x={props.position.cx + props.gap * index} y={props.position.y} w={Position.vmax(props.position) * 0.1} h={Position.vmax(props.position) * 100} globalAlpha={0.25} fillStyle={props.color} />
        <rect save fill x={props.position.cx - props.gap * index} y={props.position.y} w={Position.vmax(props.position) * 0.1} h={Position.vmax(props.position) * 100} globalAlpha={0.25} fillStyle={props.color} />
      </>
    }
  })
}

export default App