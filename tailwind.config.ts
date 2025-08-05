import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Aceasta este linia esențială pentru App Router
  ],
  theme: {
    extend: {
      // ... alte setări
    },
  },
  plugins: [],
}
export default config