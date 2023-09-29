/** @type {import('tailwindcss').Config} */
export default {

  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {fontSize: {
      'xxs': '0.7rem'
    },  fontFamily: {
      'sans': ['Inter', 'sans-serif'],
    },},
    
  },
  plugins: [],
  safelist: [
    'bg-blue-100',
    'p-4',
    'rounded',
    'mb-4',
    'flex',
    'items-center',
    'text-blue-500', 
    'bg-indigo-100',
    'text-indigo-500',
    'text-indigo-600',
    'border-indigo-300',
    'border-yellow-300',
    'border-red-300',
    'border-blue-300',
    'border-green-300',
    'bg-indigo-300',
    'bg-yellow-300',
    'dark:bg-red-600',
    'dark:bg-blue-600',
    'dark:bg-green-600',
    'dark:bg-indigo-600',
    'dark:bg-yellow-600',
    'dark:bg-gray-600',
    'dark:bg-red-400',
    'dark:bg-blue-400',
    'dark:bg-green-400',
    'dark:bg-indigo-400',
    'dark:bg-yellow-400',
    'dark:bg-gray-400',
    'dark:text-red-800',
    'dark:text-blue-800',
    'dark:text-green-800',
    'dark:text-indigo-800',
    'dark:text-yellow-800',
    'dark:text-gray-800',
    'dark:text-red-900',
    'dark:text-blue-900',
    'dark:text-green-900',
    'dark:text-indigo-900',
    'dark:text-yellow-900',
    'dark:text-gray-900',
    'dark:border-none',
    'bg-red-300',
    'bg-blue-300',
    'bg-green-300',
    'text-2xl',
    'mr-4',
    'flex-grow',
    'text-sm',
    'uppercase',
    'tracking-wider',
    'text-blue-600',
    'text-lg',
    'font-medium',
    'text-gray-900',
    'italic',
    'text-yellow-500',
    'text-yellow-600',
    'text-green-500',
    'text-green-600',
    'bg-yellow-100',
    'bg-green-100',
    'bg-red-100',
    'text-red-600',
    'bg-purple-100',
    'text-purple-600',
    'bg-teal-100',
    'text-teal-600',
    'bg-gray-100',
    'text-gray-600',
    "bg-white",
"border-b",
"p-4",
"dark:bg-gray-700",
"bg-gradient-to-l",
"from-slate-200",
"to-slate-100",
"font-bold",
"text-lg",
"flex-1",
"flex",
"flex-col",
"overflow-y-auto",
"gap-4",
"mb-4",
"items-start",
"rounded-full",
"mr-3",
"w-10",
"h-10",
"font-semibold",
"text-gray-500",
"text-xs",
"text-sm",
"ml-4",
"mt-4",
"p-2",
"rounded-md",
"shadow-md",
"bg-slate-50",
"border",
"border-slate-200",
"hover:shadow-lg",
"hover:bg-gray-50",
"transition-all",
"duration-200",
"space-x-2",
"opacity-60",
"w-6",
"text-indigo-500",
"hover:underline",
"text-slate-400",
"mt-3",
"flex-row",
"gap-1",
"justify-start",
"text-left",
"p-3",
"transition-all",
"space-x-2",
"py-1",
"px-3",
"bg-gray-",
"text-indigo-400",
"border",
"border-indigo-500",
"rounded-full",
"bg-white",
"hover:bg-indigo-600",
"hover:text-white",
"hidden",
"p-2",
"rounded",
"bg-blue-500",
"text-white",
"border-t",
"w-full",
"p-2",
"border",
"rounded-lg",
"shadow-md",
"dark:bg-gray-600",
"dark:text-white",
'bg-slack-purple'
]
};