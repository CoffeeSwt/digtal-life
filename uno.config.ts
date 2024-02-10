// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  rules: [
    //@ts-ignore
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    ['transition-visible', { transition: 'color .5s' }],
    [/^max-wp-(\d+)$/, ([, d]) => ({ 'max-width': `${d}%` })],
    [/^max-hp-(\d+)$/, ([, d]) => ({ 'max-height': `${d}%` })],
  ],
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['flex-row-center', 'flex justify-between items-center'],
    ['rounded-border', 'border border-solid rounded-2'],
    ['full', 'h-full w-full'],
    ['full-border', 'h-full w-full box-border'],
    ['full-screen', 'h-screen w-screen'],
    ['c-border', 'border border-solid border-gray-400'],
  ],
  theme: {
    colors: {},
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '1.25rem',
        height: '1.25rem',
      },
      prefix: 'i-',
      collections: {},
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
})
