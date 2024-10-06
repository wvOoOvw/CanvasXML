import * as THREE from 'three'

import React from '../React'

import createEventLinstener from './Util.CreateEventListener'

function App(props) {
  const shouldRender = React.useShouldRender()

  const renderer = React.useMemo(() => new THREE.WebGLRenderer({ antialias: true, canvas: props.canvas }), [])
  const camera = React.useMemo(() => new THREE.OrthographicCamera(), [])
  const scene = React.useMemo(() => new THREE.Scene(), [])
  const raycaster = React.useMemo(() => new THREE.Raycaster(), [])

  const eventListender = React.useMemo(() => createEventLinstener({ renderer, camera, scene, raycaster }), [])

  React.useEffect(() => {
    const rect = props.canvas.getBoundingClientRect()

    rect.x = rect.x
    rect.y = rect.y

    if (rect.x === undefined) rect.x = rect.left
    if (rect.y === undefined) rect.y = rect.top

    renderer.setSize(rect.width, rect.height)

    camera.aspect = rect.width / rect.height
    camera.left = 0 - rect.width / 2
    camera.right = rect.width / 2
    camera.top = rect.height / 2
    camera.bottom = 0 - rect.height / 2

    camera.updateProjectionMatrix()

    eventListender.addEventListenerWithCanvas(props.canvas, { dpr: props.dpr, rect })

    return () => eventListender.removeEventListenerWithCanvas(props.canvas)
  }, [props.canvas, props.dpr])

  React.useEffect(() => shouldRender())

  React.useEffect(() => renderer.render(scene, camera))

  return props.children.map(i => i({ canvas: props.canvas, dpr: props.dpr, renderer, camera, scene, raycaster, eventListender }))
}

export default App