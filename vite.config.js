//Kod geliştirirken yapılan her değişiklikte projenin ihtiyaç duyduğu paket/paketleri oluşturan ve derleyen bir araçtır.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
