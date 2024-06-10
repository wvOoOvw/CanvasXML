import { React, ReactDom } from '../package/index'

import App from './View.App'

// const Content = (props) => {
//   console.log(props)
// }

// const App = () => {
//   const [s, ss] = React.useState(1)

//   React.useEffectImmediate(() => {
//     console.log('init')
//     window.addEventListener('click', () => ss(pre => pre + 1))
//   }, [])

//   return <Content por={s}>
//     {/* <Content p={s}></Content>
//     <Content pss={s}></Content> */}
//     [
//     <Content p={s}></Content>,
//     <Content pss={s + 1}></Content>
//     ]
//   </Content>
// }

ReactDom.mount(<App />, 12).render()
