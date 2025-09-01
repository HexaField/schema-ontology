import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: `src/index.ts`,
  external: [],
  output: [
    {
      file: `dist/index.js`,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationMap: true,
      outDir: 'dist',
      exclude: ['**/*.test.*', '**/*.spec.*']
    })
  ]
}
