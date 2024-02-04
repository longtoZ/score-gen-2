/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
    extend: {
        colors: {
            'bg-color': 'var(--bg-color)',
            'bg-sank-color': 'var(--bg-sank-color)',
            'text-color': 'var(--text-color)',
            'header-color': 'var(--header-color)',
            'even-row-color': 'var(--even-row-color)',
            'text-subtitle-color': 'var(--text-subtitle-color)',
            'input-color': 'var(--input-color)',
            'border-color': 'var(--border-color)',
        },
        boxShadow: {
            'basic': 'var(--box-shadow)',
            'light': 'var(--box-shadow-light)',
            'lighter': 'var(--box-shadow-lighter)',
            'thick': 'var(--box-shadow-thick)',
        },
    },
};
export const plugins = [];
