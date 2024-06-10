import { Caculate, Draw, Layout, Position, PositionBatch, PositionCover, React, ReactPlugin } from '../package/index'

import Entry from './View.Example.II.Page.Entry'
import Loading from './View.Example.II.Page.Loading'

import background from '../static/bg.97101e.jpg'

const useLoadResource = () => {
  const ref = React.useRef([background])

  const [delayLoading, setDelayLoading] = React.useState(true)

  const { resourceLoading } = ReactPlugin.usePreloadResource({ resource: ref.current })

  React.useEffectImmediate(() => {
    const time = setTimeout(() => setDelayLoading(false), 2000)
    return () => clearTimeout(time)
  }, [])

  return { resourceLoading: delayLoading || resourceLoading }
}

const usePage = (props) => {
  const [page, setPage] = React.useState([])

  const [animationPlay, setAnimationPlay] = React.useState(true)
  const [animationMin, setAnimationMin] = React.useState(0)
  const [animationMax, setAnimationMax] = React.useState(1)

  const { animationCount, setAnimationCount, animationDelay, setAnimationDelay, animationFlow, setAnimationFlow } = ReactPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: animationMin, max: animationMax, rate: 1 / 60, play: animationPlay, reverse: false })

  const pageNext = () => setPage(page.filter((i, index) => index !== 0))

  React.useEffect(() => setPage([...page, 'ENTRY']), [])
  // React.useEffect(() => { if (props.resourceLoading === false) setPage([...page, 'ENTRY']) }, [props.resourceLoading])

  // React.useEffect(() => {
  //   if (animationCount < animationMin || animationCount === animationMin) setAnimationFlow(0)
  //   if (page.length > 1 && (animationCount > animationMax || animationCount === animationMax)) setAnimationFlow(1)
  //   if (page.length > 1 && (animationCount < animationMin || animationCount === animationMin)) pageNext()
  // }, [page, animationCount])

  return { page, setPage, pageNext, pageAnimationCount: animationCount, pageSetAnimationCount: setAnimationCount, pageAnimationDelay: animationDelay, pageSetAnimationDelay: setAnimationDelay, pageAnimationFlow: animationFlow, pageSetAnimationFlow: setAnimationFlow }
}

function App() {
  const { resourceLoading } = useLoadResource()
  const { page, setPage, pageAnimationCount } = usePage({ resourceLoading: resourceLoading })

  React.contextProviderExtend({ page, setPage, pageAnimationCount })

  if (page[0] === 'LOADING') React.component(Loading)()
  if (page[0] === 'ENTRY') React.component(Entry)()
}

export default App
