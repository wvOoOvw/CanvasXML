import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'
import ReactCanvasThreeJs from '../../package/ReactCanvasThreeJs'
import * as ReactCanvasThreeJsExtensions from '../../package/ReactCanvasThreeJsExtensions'

import ContextApp from './Context.App'

function ComponentMeth(props) {
  const target = props.target

  const { animationCount } = ReactExtensions.useAnimationCount({ defaultCount: 0, defaultDelay: 0, defaultFlow: 0, min: 0, max: Infinity, rate: Math.PI / 360, play: true, reverse: false })

  const ObjectGroup = React.useMemo(() => new THREE.Group(), [])

  const ObjectBoxGeometry = React.useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const ObjectBoxMaterial = React.useMemo(() => new THREE.MeshBasicMaterial({ color: 0x00ff00 }), [])
  const ObjectBoxMesh = React.useMemo(() => new THREE.Mesh(ObjectBoxGeometry, ObjectBoxMaterial), [ObjectBoxGeometry, ObjectBoxMaterial])

  const ObjectWireframeGeometry = React.useMemo(() => new THREE.WireframeGeometry(ObjectBoxGeometry), [])
  const ObjectWireframeMaterial = React.useMemo(() => new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }), [])
  const ObjectWireframeMesh = React.useMemo(() => new THREE.LineSegments(ObjectWireframeGeometry, ObjectWireframeMaterial), [ObjectWireframeGeometry, ObjectWireframeMaterial])

  React.useEffectImmediate(() => ObjectGroup.rotation.x = animationCount)
  React.useEffectImmediate(() => ObjectGroup.rotation.y = animationCount)

  ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: ObjectGroup, object: ObjectBoxMesh })
  ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: ObjectGroup, object: ObjectWireframeMesh })
  ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: target, object: ObjectGroup })

  ReactCanvasThreeJsExtensions.useObjectDispose({ object: [ObjectBoxGeometry, ObjectBoxMaterial, ObjectWireframeGeometry, ObjectWireframeMaterial] })
}

function ComponentLight(props) {
  const target = props.target

  const ObjectGroup = React.useMemo(() => new THREE.Group(), [])

  const ObjectPointLight_0 = React.useMemo(() => new THREE.DirectionalLight(0xffffff, 3), [])
  const ObjectPointLight_1 = React.useMemo(() => new THREE.DirectionalLight(0xffffff, 3), [])
  const ObjectPointLight_2 = React.useMemo(() => new THREE.DirectionalLight(0xffffff, 3), [])

  React.useEffectImmediate(() => ObjectPointLight_0.position.set(0, 200, 0), [])
  React.useEffectImmediate(() => ObjectPointLight_1.position.set(100, 200, 100), [])
  React.useEffectImmediate(() => ObjectPointLight_2.position.set(-100, -200, -100), [])

  ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: ObjectGroup, object: ObjectPointLight_0 })
  ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: ObjectGroup, object: ObjectPointLight_1 })
  ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: ObjectGroup, object: ObjectPointLight_2 })

  ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: target, object: ObjectGroup })

  ReactCanvasThreeJsExtensions.useObjectDispose({ object: [ObjectPointLight_0, ObjectPointLight_1, ObjectPointLight_2] })
}

function Content() {
  const contextApp = React.useContext(ContextApp)

  // const ObjectBoxGeometry = React.useMemo(() => new THREE.BoxGeometry(1, 1, 1, 1, 1, 1), [])
  // const ObjectBoxMaterial = React.useMemo(() => new THREE.MeshBasicMaterial({ color: 0x00ff00 }), [])
  // const ObjectBoxMesh = React.useMemo(() => new THREE.Mesh(ObjectBoxGeometry, ObjectBoxMaterial), [ObjectBoxGeometry, ObjectBoxMaterial])

  // ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: contextApp.scene, object: ObjectBoxMesh })

  const shouldRender = React.useShouldRender()

  const ObjectOrbitControls = React.useMemo(() => new OrbitControls(contextApp.camera, contextApp.renderer.domElement), [])
  const ObjectAxesHelper = React.useMemo(() => new THREE.AxesHelper(5), [])

  React.useEffectImmediate(() => contextApp.camera.position.set(1, 1, 1), [])
  React.useEffectImmediate(() => contextApp.camera.lookAt(0, 0, 0), [])

  React.useEffect(() => shouldRender())

  ReactCanvasThreeJsExtensions.useObjectApply({ apply: true, target: contextApp.scene, object: ObjectAxesHelper })
  ReactCanvasThreeJsExtensions.useObjectDispose({ object: [ObjectOrbitControls] })

  return <>
    <ComponentLight target={contextApp.scene} />
    {
      new Array(100).fill().map(i => <ComponentMeth target={contextApp.scene} />)
    }

  </>
}

function App(props) {
  const shouldRender = React.useShouldRender()

  const renderer = React.useMemo(() => new THREE.WebGLRenderer({ antialias: true, canvas: props.canvas }), [])
  const camera = React.useMemo(() => new THREE.PerspectiveCamera(), [])
  const scene = React.useMemo(() => new THREE.Scene(), [])
  const raycaster = React.useMemo(() => new THREE.Raycaster(), [])

  const eventListender = React.useMemo(() => ReactCanvasThreeJsExtensions.createEventLinstener({ renderer, camera, scene, raycaster }), [])

  React.useEffect(() => {
    const rect = props.canvas.getBoundingClientRect()

    rect.x = rect.x
    rect.y = rect.y

    if (rect.x === undefined) rect.x = rect.left
    if (rect.y === undefined) rect.y = rect.top

    renderer.setSize(rect.width, rect.height)

    // camera.aspect = rect.width / rect.height
    // camera.left = 0 - rect.width / 2
    // camera.right = rect.width / 2
    // camera.top = rect.height / 2
    // camera.bottom = 0 - rect.height / 2

    camera.updateProjectionMatrix()

    eventListender.addEventListenerWithCanvas(props.canvas, { dpr: props.dpr, rect })

    return () => eventListender.removeEventListenerWithCanvas(props.canvas)
  }, [props.canvas, props.dpr])

  React.useEffect(() => shouldRender())

  React.useEffect(() => renderer.render(scene, camera))

  const Component =
    <ContextApp.Provider value={{ renderer, camera, scene, raycaster }}>
      <Content />
    </ContextApp.Provider>

  return Component
}

export default App
