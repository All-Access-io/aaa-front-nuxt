import fs from 'node:fs'
import path from 'node:path'
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import animate from 'tailwindcss-animate'
import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import typography from '@tailwindcss/typography'
import tailwindScrollbar from 'tailwind-scrollbar'

function getCollection(dir, name) {
  const files = fs.readdirSync(dir)
  const collection = {
    [name]: {
      icons: {},
    },
  }

  let stat
  for (const file of files) {
    const filePath = `${dir}/${file}`
    try {
      stat = fs.lstatSync(filePath)
    }
    catch (err) {
      continue
    }
    if (stat.isFile()) {
      const svg = fs.readFileSync(filePath, 'utf-8')
      const filename = path.basename(file, '.svg')
      collection[name].icons[filename] = {
        body: svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, ''),
        width: 24,
        height: 24,
      }
    }
  }
  return collection
}

export default {

  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        short: { raw: '(max-height: 800px)' },
        xshort: { raw: '(max-height: 650px)' },
      },
      fontSize: {
        '2xs': ['0.5rem', '0.625rem'],
        '1xs': ['0.625rem', '0.75rem'],
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'Inter'],
        kanit: ['"Kanit"', 'Inter'],
      },
      fontWeight: {
        inherit: 'inherit',
      },
      colors: {
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'primary-yellow': 'hsl(var(--primary-yellow))',
        'primary-yellow-foreground': 'hsl(var(--primary-yellow-foreground))',
        'primary-green': 'hsl(var(--primary-green))',
        'primary-green2': 'hsl(var(--primary-green2))',
        'primary-neon': 'hsl(var(--primary-neon))',
        'primary-error': 'hsl(var(--primary-error))',
        'primary-gold': 'hsl(var(--primary-gold))',
        'primary-gold-light': 'hsl(var(--primary-gold-light))',
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        'destructive': {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        'card': {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },

        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee2': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },

        'fade-yellow-in-out': {
          '50%': { backgroundColor: 'hsl(var(--primary-yellow))' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',

        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee2': 'marquee2 25s linear infinite',

        'fade-yellow': 'fade-yellow-in-out 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
      },
    },
  },
  plugins: [
    typography,
    animate,
    iconsPlugin({
      scale: 1.25,
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        ...getIconCollections(['mdi', 'lucide', 'ic', 'material-symbols']),
        ...getCollection('./assets/images', 'custom'),
      },
    }),
    tailwindScrollbar({

    }),
  ],
} satisfies Config
