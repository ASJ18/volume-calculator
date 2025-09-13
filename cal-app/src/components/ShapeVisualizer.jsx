import React from 'react'

const ShapeVisualizer = ({ shape, inputs }) => {
  switch (shape) {
    case 'cylinder':
      return (
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-40 bg-blue-400 rounded-full"
            style={{ height: `${inputs.height || 100}px` }}
          />
          <p className="text-sm text-white mt-2">Cylinder</p>
        </div>
      )
    case 'sphere':
      return (
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-24 bg-purple-400 rounded-full"
            style={{ width: `${(inputs.radius || 50) * 2}px`, height: `${(inputs.radius || 50) * 2}px` }}
          />
          <p className="text-sm text-white mt-2">Sphere</p>
        </div>
      )
    case 'cone':
      return (
        <div className="flex flex-col items-center">
          <div
            className="w-0 h-0 border-l-12 border-r-12 border-b-[100px] border-transparent border-b-orange-400"
            style={{ borderBottomWidth: `${inputs.height || 100}px` }}
          />
          <p className="text-sm text-white mt-2">Cone</p>
        </div>
      )
    case 'prism':
      return (
        <div className="flex flex-col items-center">
          <div
            className="bg-green-400"
            style={{
              width: `${inputs.length || 100}px`,
              height: `${inputs.height || 60}px`,
            }}
          />
          <p className="text-sm text-white mt-2">Prism</p>
        </div>
      )
    case 'tank':
      return (
        <div className="flex flex-col items-center">
          <div
            className="w-24 bg-cyan-400 rounded-full"
            style={{ height: `${inputs.length || 100}px` }}
          />
          <p className="text-sm text-white mt-2">Tank</p>
        </div>
      )
    default:
      return null
  }
}

export default ShapeVisualizer;