import netlify from '@astrojs/netlify'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import auth from 'auth-astro'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), auth()],
  adapter: netlify(),
})
