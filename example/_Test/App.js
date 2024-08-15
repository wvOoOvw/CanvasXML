import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

function Ix(props) {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    setCount(count + 1)
  })

  React.useEffect(() => {
    if (count === 60) props.setz(i => i + 1)
  }, [count])

  console.log(count)

  return null
}

function Content(props) {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    setCount(count + 1)
  })

  React.useEffect(() => {
    if (count === 60) props.setz(i => i + 1)
  }, [count])

  console.log(count)

  return null
}

function App(props) {

  const [z, setz] = React.useState(0)
  const [x, setx] = React.useState(0)

  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
      setCount(count + 1)
  })

  return <layout>
    [
      <Content setz={setz} />,
      <Content setz={setz} />,
      <Content setz={setz} />,
      <Content setz={setz} />,
    ]

    <layout>
    [
      <Ix setz={setx} />,
      <Ix setz={setx} />,
      <Ix setz={setx} />,
      <Ix setz={setx} />,
    ]
    </layout>
  </layout>
}

export default App