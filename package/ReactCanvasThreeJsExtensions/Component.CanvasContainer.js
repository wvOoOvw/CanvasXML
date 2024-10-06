import * as THREE from 'three'

import React from '../React'

import createEventLinstener from './Util.CreateEventListener'

function App(props) {
  const shouldRender = React.useShouldRender()

  const renderer = React.useMemo(() => new THREE.WebGLRenderer({ antialias: true, canvas: props.canvas }), [])
  const camera = React.useMemo(() => new THREE.PerspectiveCamera(), [])
  const scene = React.useMemo(() => new THREE.Scene(), [])
  const raycaster = React.useMemo(() => new THREE.Raycaster(), [])

  const eventListender = React.useMemo(() => createEventLinstener({ renderer, camera, scene, raycaster }), [])

  React.useEffect(() => {
    const rect = props.canvas.getBoundingClientRect()

    rect.x = rect.x
    rect.y = rect.y

    if (rect.x === undefined) rect.x = rect.left
    if (rect.y === undefined) rect.y = rect.top

    props.canvas.width = rect.width * props.dpr
    props.canvas.height = rect.height * props.dpr

    renderer.setSize(props.canvas.width, props.canvas.height)

    camera.aspect = props.canvas.width / props.canvas.height
    camera.updateProjectionMatrix()

    eventListender.addEventListenerWithCanvas(props.canvas, { dpr: props.dpr, rect })

    return () => eventListender.removeEventListenerWithCanvas(props.canvas)
  }, [props.canvas, props.dpr])

  React.useEffect(() => shouldRender())

  React.useEffect(() => renderer.render(scene, camera))

  return props.children.map(i => i({ renderer, camera, scene, raycaster, eventListender }))
}

export default App