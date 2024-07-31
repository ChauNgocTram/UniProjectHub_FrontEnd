import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Mở báo cáo trong trình duyệt sau khi build
      gzipSize: true, // Hiển thị kích thước gzip
      brotliSize: true, // Hiển thị kích thước brotli
    }),
  ],
});
