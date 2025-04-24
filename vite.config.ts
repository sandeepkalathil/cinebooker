import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  let taggerPlugin = null;

  if (mode === 'development') {
    try {
      const mod = await import('lovable-tagger');
      taggerPlugin = mod.componentTagger();
    } catch (e) {
      console.warn("Lovable tagger not found, skipping");
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      taggerPlugin,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Provide empty process.env to avoid errors
      'process.env': {},
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      sourcemap: true,
    },
    test: {
      environment: 'jsdom',
      globals: true,
    },
  };
});
