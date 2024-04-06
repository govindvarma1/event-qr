import { defineConfig } from 'vite'
import dotenv from 'dotenv';
dotenv.config();
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
