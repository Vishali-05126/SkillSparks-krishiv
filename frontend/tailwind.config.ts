import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ink: '#17211d',
                cream: '#f3f1ea',
                orange: '#f36c3d',
                lime: '#d8ec7b',
                muted: '#69736d',
                line: '#d9ddd4',
            },
        },
    },
    plugins: [],
}

export default config