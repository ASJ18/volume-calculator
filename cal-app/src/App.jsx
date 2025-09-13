import { Routes, Route } from "react-router";

import ShapeForm from "./components/ShapeForm";

import React, { useState } from 'react'


function App() {
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  const isDark = theme === 'dark'

  const bgClass = isDark
  ? 'bg-gradient-to-br from-black via-gray-800 to-slate-900'
  : 'bg-gradient-to-br from-sky-100 via-white to-sky-200'
  const textClass = isDark ? 'text-white' : 'text-gray-900'

  return (
    <div className={`relative min-h-screen w-full animate-fade-in-down ${bgClass} bg-[length:200%_200%] animate-gradient-x ${textClass} flex flex-col items-center transition-colors duration-500 overflow-hidden`}>
      
      {/* ✨ Animated Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 blur-2xl animate-float"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
        <nav className="sticky top-0 z-50 w-full px-4 py-3 flex items-center justify-between bg-black/30 backdrop-blur-md border-b border-white/10">
  {/* Navbar content */}

      {/* 🔝 Navbar */}
      
        <h2 className="text-xl font-bold">Volumetrics</h2>
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 rounded-md ${isDark ? 'bg-white/20 text-white' : 'bg-sky-300 text-gray-900'} hover:opacity-80 transition`}
        >
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
     
</nav>
      {/* 🧮 Main Content */}
      <main className="z-10 flex-grow flex flex-col items-center justify-center p-4 w-full">
        <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-sky-600'}`}>
          Volume Calculator
        </h1>
        <ShapeForm isDark={isDark} />
      </main>

      {/* 📜 Footer */}
      <footer className="z-10 w-full py-4 text-center text-xs text-white/70">
        &copy; 2025 Abdulwahab. All rights reserved.
      </footer>
    </div>
  )
}

export default App;