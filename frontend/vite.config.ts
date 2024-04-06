import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from "node:fs"
import tsconfigPaths from "vite-tsconfig-paths"
import reactSvgPlugin from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    // reactSvgPlugin({
    //   svgrOptions: {
    //     titleProp: true,
    //     svgoConfig: {
    //         plugins: [
    //             { removeViewBox: false },
    //             { removeDimensions: true }
    //         ]
    //
    //     }
    //   }
    // }),
    tsconfigPaths(),
    {
      name: "generate-version",
      generateBundle() {
        //YYYYMMDDHHmm
        const version = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 12);
        writeFileSync('dist/version.txt', version);
      }
    }
  ]
})
