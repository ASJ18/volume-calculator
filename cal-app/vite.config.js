import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // change to any port you prefer
    strictPort: true, // optional: prevents fallback to another port
  },
})


// export default defineConfig({
//   server: {
//     host: true, // exposes to local network
//     port: 5173, // or any port you prefer
//   },
// })