import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeScene = ({ shape, radius = 1, height = 2 }) => {
  const containerRef = useRef()
  const [wireframe, setWireframe] = useState(false)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.innerHTML = ''
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    // Grid + Axes
    scene.add(new THREE.GridHelper(10, 10))
    scene.add(new THREE.AxesHelper(5))

    // Geometry
    let geometry
    switch (shape) {
      case 'cylinder':
        geometry = new THREE.CylinderGeometry(radius, radius, height, 32)
        break
      case 'sphere':
        geometry = new THREE.SphereGeometry(radius, 32, 32)
        break
      case 'cone':
        geometry = new THREE.ConeGeometry(radius, height, 32)
        break
      case 'prism':
        geometry = new THREE.BoxGeometry(radius * 2, height, radius * 2)
        break
      case 'tank':
        geometry = new THREE.CylinderGeometry(radius, radius, height, 32)
        break
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1)
    }

    const material = new THREE.MeshStandardMaterial({
      color: '#00bcd4',
      wireframe: wireframe,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(0.1, 0.1, 0.1)
    scene.add(mesh)

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 1
    controls.maxDistance = 10

    // Dimension Labels using CanvasTexture
    const createLabel = (text) => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.font = '24px Arial'
      ctx.fillText(text, 10, 40)
      const texture = new THREE.CanvasTexture(canvas)
      const labelMaterial = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(labelMaterial)
      sprite.scale.set(2, 0.5, 1)
      return sprite
    }

    const radiusLabel = createLabel(`Radius: ${radius}`)
    radiusLabel.position.set(0, height / 2 + 1, 0)
    scene.add(radiusLabel)

    const heightLabel = createLabel(`Height: ${height}`)
    heightLabel.position.set(0, -height / 2 - 1, 0)
    scene.add(heightLabel)

    // Animate
    const animate = () => {
      requestAnimationFrame(animate)
      if (mesh.scale.x < 1) {
        mesh.scale.x += 0.05
        mesh.scale.y += 0.05
        mesh.scale.z += 0.05
      }
      mesh.rotation.y += 0.01
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      renderer.dispose()
      scene.clear()
    }
  }, [shape, radius, height, wireframe])

  // Export as image
  const handleExport = () => {
    const canvas = containerRef.current.querySelector('canvas')
    const link = document.createElement('a')
    link.download = `${shape}-snapshot.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-white text-lg font-semibold mb-2">3D Shape Preview</h3>

      <div
        ref={containerRef}
        className="w-full max-w-md h-[300px] md:h-[400px] border border-white/10 rounded-lg overflow-hidden"
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setWireframe(!wireframe)}
          className="px-3 py-1 text-sm rounded-md bg-white/20 text-white hover:bg-white/30 ring-1 ring-white/20"
        >
          Toggle Wireframe
        </button>
        <button
          onClick={handleExport}
          className="px-3 py-1 text-sm rounded-md bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 ring-1 ring-cyan-400/30"
        >
          Export Snapshot
        </button>
      </div>
    </div>
  )
}

export default ThreeScene;