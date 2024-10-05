import useText from './Hook.UseText'

const App = (props) => {
  const { line, location } = useText(props)
  
  return props.children.map(i => i(line, location))
}

export default App