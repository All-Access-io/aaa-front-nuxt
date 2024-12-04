import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary font-montserrat uppercase text-primary-foreground hover:bg-primary/90',
        primary: 'rounded-xl border-2 border-primary bg-primary-foreground font-montserrat font-semibold uppercase tracking-widest text-primary shadow-[0_5px] transition-all duration-300 ease-in-out hover:translate-y-[2px] hover:bg-secondary hover:shadow-[0_3px]',
        primaryY: 'rounded-xl border-2 border-primary bg-primary-yellow font-montserrat font-semibold uppercase tracking-widest text-primary shadow-[0_5px] transition-all duration-300 ease-in-out hover:translate-y-[2px] hover:bg-[#fed773] hover:text-primary hover:shadow-[0_3px]',
        primaryG: 'rounded-xl border-2 border-primary bg-primary-green font-montserrat font-semibold uppercase tracking-widest text-primary shadow-[0_5px] transition-all duration-300 ease-in-out hover:translate-y-[2px] hover:bg-primary-green2 hover:text-primary hover:shadow-[0_3px]',
        'primary-ghost': 'font-montserrat font-semibold uppercase tracking-widest text-primary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary font-montserrat uppercase text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        quiz: 'rounded-2xl border-2 border-primary bg-primary-yellow font-bold text-primary hover:bg-primary hover:text-primary-yellow',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 rounded-lg px-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-lg px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
