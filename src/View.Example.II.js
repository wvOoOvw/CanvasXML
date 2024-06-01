import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Entry from './View.Example.II.Page.Entry'
import Loading from './View.Example.II.Page.Loading'

import background from '../static/bg.97101e.jpg'

const useLoadResource = () => {
  const ref = ReactAnimation.useRef([background])

  const [delayLoading, setDelayLoading] = ReactAnimation.useState(true)

  const { resourceLoading } = ReactAnimationPlugin.usePreloadResource({ resource: ref.current })

  ReactAnimation.useEffectImmediate(() => {
    const time = setTimeout(() => setDelayLoading(false), 10000)
    return () => clearTimeout(time)
  }, [])

  return { resourceLoading: delayLoading || resourceLoading }
}

const usePage = (props) => {
  const [page, setPage] = ReactAnimation.useState([])

  const [animationPlay, setAnimationPlay] = ReactAnimation.useState(true)
  const [animationMin, setAnimationMin] = ReactAnimation.useState(0)
  const [animationMax, setAnimationMax] = ReactAnimation.useState(1)

  const { animationCount, setAnimationCount, animationDelay, setAnimationDelay, animationFlow, setAnimationFlow } = ReactAnimationPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: animationMin, max: animationMax, rate: 1 / 60, play: animationPlay, reverse: false })

  const pageNext = () => setPage(page.filter((i, index) => index !== 0))

  ReactAnimation.useEffect(() => setPage([...page, 'LOADING']), [])
  ReactAnimation.useEffect(() => { if (props.resourceLoading === false) setPage([...page, 'ENTRY']) }, [props.resourceLoading])

  ReactAnimation.useEffect(() => {
    if (animationCount < animationMin || animationCount === animationMin) setAnimationFlow(0)
    if (page.length > 1 && (animationCount > animationMax || animationCount === animationMax)) setAnimationFlow(1)
    if (page.length > 1 && (animationCount < animationMin || animationCount === animationMin)) pageNext()
  }, [page, animationCount])

  return { page, setPage, pageNext, pageAnimationCount: animationCount, pageSetAnimationCount: setAnimationCount, pageAnimationDelay: animationDelay, pageSetAnimationDelay: setAnimationDelay, pageAnimationFlow: animationFlow, pageSetAnimationFlow: setAnimationFlow }
}

const App = () => {
  const { resourceLoading } = useLoadResource()
  const { page, setPage, pageAnimationCount } = usePage({ resourceLoading: resourceLoading })

  ReactAnimation.contextProviderExtend({ page, setPage, pageAnimationCount })

  if (page[0] === 'LOADING') ReactAnimation.component(Loading)()
  if (page[0] === 'ENTRY') ReactAnimation.component(Entry)()
}

export default App
