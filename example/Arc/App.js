import { React, ReactDomComponent, ReactDom } from '../../package/index'

const random = (number, offset, fixed) => Number(((Math.random() * number).toFixed(fixed))) + offset

function App() {
  const [size, setSize] = React.useState(random(100, 100, 0))

  const onClick = () => {
    setSize(random(100, 100, 0))
  }

  return <arc x={400} y={400} isolated fill beginPath globalAlpha={1} fillStyle='rgba(255, 0, 0, 1)' radius={size} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} onClick={onClick} />
}

export default App