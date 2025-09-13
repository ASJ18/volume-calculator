import { useState, useRef } from "react";

import ShapeVisualizer from './ShapeVisualizer'

import ThreeScene from './ThreeScene'



const formulas = {
  cylinder: ({ radius, height }) => Math.PI * radius ** 2 * height,
  sphere: ({ radius }) => (4 / 3) * Math.PI * radius ** 3,
  cone: ({ radius, height }) => (1 / 3) * Math.PI * radius ** 2 * height,
  prism: ({ length, width, height }) => length * width * height,
  tank: ({ radius, length }) => Math.PI * radius ** 2 * length,
}

const ShapeForm = ({ isDark }) => {
  const resultRef = useRef(null)
  const [shape, setShape] = useState('cylinder')
  const [inputs, setInputs] = useState({})
  const [unit, setUnit] = useState('cm³')
  const [volume, setVolume] = useState(null)
  const [history, setHistory] = useState([])

    const deleteHistoryItem = (index) => {
    const updated = [...history]
    updated.splice(index, 1)
    setHistory(updated)
  }


  const handleChange = (e) => {
    const value = parseFloat(e.target.value)
    setInputs({ ...inputs, [e.target.name]: value >= 0 ? value : 0 })
  }

  const handleSubmit = (e) => {
  e.preventDefault()
  const calc = formulas[shape](inputs)
  const result = calc.toFixed(2)
  setVolume(result)
  setHistory([{ shape, volume: result, unit }, ...history])

  // Scroll to result
  setTimeout(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, 300)
}


  const exportHistory = () => {
  const content = history.map(h => {
    const formulaText = {
      cylinder: 'π × radius² × height',
      sphere: '(4/3) × π × radius³',
      cone: '(1/3) × π × radius² × height',
      prism: 'length × width × height',
      tank: 'π × radius² × length',
    }[h.shape]

    

    const inputDetails = Object.entries(inputs)
      .map(([key, value]) => `${key} = ${value}`)
      .join(', ')

    return `Shape: ${h.shape.charAt(0).toUpperCase() + h.shape.slice(1)}\nFormula: ${formulaText}\nInputs: ${inputDetails}\nVolume: ${h.volume} ${h.unit}\n`
  }).join('\n----------------------\n')

  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'volume-solutions.txt'
  link.click()
  URL.revokeObjectURL(url)
}


  const renderInputs = () => {
    switch (shape) {
      case 'cylinder':
      case 'cone':
        return (
          <>
            <Input name="radius" label="Radius" onChange={handleChange} isDark={isDark} />
            <Input name="height" label="Height" onChange={handleChange} isDark={isDark} />
          </>
        )
      case 'sphere':
        return <Input name="radius" label="Radius" onChange={handleChange} isDark={isDark} />
      case 'prism':
        return (
          <>
            <Input name="length" label="Length" onChange={handleChange} isDark={isDark} />
            <Input name="width" label="Width" onChange={handleChange} isDark={isDark} />
            <Input name="height" label="Height" onChange={handleChange} isDark={isDark} />
          </>
        )
      case 'tank':
        return (
          <>
            <Input name="radius" label="Radius" onChange={handleChange} isDark={isDark} />
            <Input name="length" label="Length" onChange={handleChange} isDark={isDark} />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
      <div className="flex-1 bg-black/30 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/10 ring-2 ring-sky-500/30"><form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Select Shape" value={shape} onChange={setShape} options={['cylinder', 'sphere', 'cone', 'prism', 'tank']} isDark={isDark} />
        <Select label="Select Unit" value={unit} onChange={setUnit} options={['cm³', 'm³', 'in³']} isDark={isDark} />
        {renderInputs()}
        <button
          type="submit"
          className="w-full bg-white/20 text-white py-2 rounded-lg hover:bg-white/30 transition duration-300 ease-in-out hover:scale-105 shadow-md"
        >
          Calculate Volume
        </button>
      </form></div>
      
       <div className="flex-1 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-xl shadow-xl border border-white/10 ring-2 ring-purple-500/30">
    <ThreeScene
  shape={shape}
  radius={inputs.radius || 1}
  height={inputs.height || 2}
/>





      <div className="mt-6">
  
  </div>
</div>


     {(volume || history.length > 0) && (
  <div ref={resultRef} className="mt-6 space-y-4 md:space-y-6">
    {volume && (
      <div className={`p-4 rounded-lg text-center animate-fade-in border ${isDark ? 'border-white/20 bg-black/20 text-white' : 'border-gray-300 bg-white/60 text-gray-800'} backdrop-blur-sm ring-1 ${isDark ? 'ring-cyan-400/30' : 'ring-sky-300/30'}`}>
        <p className="text-lg font-semibold">
          📦 Volume: {volume} {unit}
        </p>
      </div>
    )}

    {history.length > 0 && (
      <div className="space-y-2">
        <div className="flex justify-between items-center gap-2">
          <h3 className={`${isDark ? 'text-white' : 'text-gray-800'} font-semibold`}>History</h3>
          <button
            onClick={exportHistory}
            className={`text-xs px-2 py-1 rounded-md transition ring-1 ${
              isDark
                ? 'bg-white/20 text-white ring-white/20 hover:bg-white/30 hover:ring-white/40'
                : 'bg-sky-100 text-sky-800 ring-sky-200 hover:bg-sky-200 hover:ring-sky-300'
            }`}
          >
            Export
          </button>
          <button
            onClick={() => setHistory([])}
            className={`text-xs px-2 py-1 rounded-md transition ring-1 ${
              isDark
                ? 'bg-red-500/20 text-red-300 ring-red-400/30 hover:bg-red-500/30 hover:ring-red-400/50'
                : 'bg-red-100 text-red-700 ring-red-300 hover:bg-red-200 hover:ring-red-400'
            }`}
          >
            Clear
          </button>
        </div>

        <ul className="max-h-40 overflow-y-auto text-sm space-y-1">
          {history.map((entry, i) => (
            <li
              key={i}
              className={`flex justify-between items-center px-2 py-1 rounded-md backdrop-blur-sm ${
                isDark ? 'text-white/80 bg-white/5' : 'text-gray-800 bg-white/80'
              }`}
            >
              <span>🔹 {entry.shape}: {entry.volume} {entry.unit}</span>
              <button
                onClick={() => deleteHistoryItem(i)}
                className={`text-xs ml-2 ${
                  isDark ? 'text-red-300 hover:text-red-500' : 'text-red-600 hover:text-red-800'
                }`}
                title="Delete entry"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}
      

        
        </div>
      )}
   
const Input = ({ name, label, onChange, isDark }) => {
  const inputStyle = isDark
    ? 'bg-black/20 text-white border-white/20'
    : 'bg-white text-gray-900 border-gray-300'

  return (
    <div>
      <label className={`block mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{label}</label>
      <input
        type="number"
        name={name}
        onChange={onChange}
        min="0"
        required
        step="any"
        className={`w-full p-2 rounded-md border ${inputStyle}`}
      />
    </div>
  )
}

const Select = ({ label, value, onChange, options, isDark }) => {
  const selectStyle = isDark
    ? 'bg-black/20 text-white border-white/20'
    : 'bg-white text-gray-900 border-gray-300'

  return (
    <div>
      <label className={`block font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 rounded-md border ${selectStyle}`}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default ShapeForm;


