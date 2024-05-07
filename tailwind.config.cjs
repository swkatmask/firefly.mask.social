/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/modals/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                main: 'rgb(var(--color-main) / <alpha-value>)',
                link: 'rgb(var(--color-link) / <alpha-value>)',
                primaryBottom: 'rgb(var(--color-bottom) / <alpha-value>)',
                secondarySuccess: 'rgb(var(--color-secondary-success) / <alpha-value>)',
                primaryPink: 'rgb(var(--color-primary-pink) / <alpha-value>)',
                danger: 'rgb(var(--color-danger) / <alpha-value>)',
                warn: 'rgb(var(--color-warn) / <alpha-value>)',
                lensPrimary: 'rgb(var(--color-lens-primary) / <alpha-value>)',
                farcasterPrimary: 'rgb(var(--color-farcaster-primary) / <alpha-value>)',
                // Because the secondary and bg color values are fixed alpha values in the design, the css variable is used directly.
                secondary: 'var(--color-secondary)',
                second: 'var(--color-second)',
                bg: 'var(--color-bg)',
                bgModal: 'var(--color-bg-modal)',
                bgModalLayer: 'rgb(var(--color-bg-modal-layer) / <alpha-value>)',
                modalTitleBg: 'var(--m-modal-title-bg)',
                secondaryBottom: 'var(--color-bottom80)',
                blueBottom: 'var(--color-bottom-blue)',
                primaryMain: 'var(--color-main1)',
                secondaryMain: 'var(--color-main2)',
                thirdMain: 'var(--color-main3)',
                fourMain: 'var(--color-main4)',
                third: 'var(--color-third)',
                input: 'var(--color-input)',
                line: 'var(--color-line)',
                secondaryLine: 'var(--color-line2)',
                lightMain: 'var(--color-light-main)',
                lightBg: 'var(--color-light-bg)',
                lightBottom: 'var(--m-light-bottom)',
                lightBottom80: 'var(--color-bottom80)',
                commonDanger: 'var(--m-common-danger)',
                commonWarn: 'var(--m-common-warn)',
                lightSecond: '#767F8D',
                lightLineSecond: '#E6E7E8',
                foreground: 'rgb(var(--foreground-rgb) / <alpha-value>)',
                placeholder: 'var(--plyr-range-fill-background)',
                tabLine: 'var(--color-tab-line)',
                success: 'var(--color-success)',
                collected: 'rgb(var(--color-collected) / <alpha-value>)',
                darkBottom: 'var(--color-dark-bottom)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            boxShadow: {
                send: '0px 0px 20px 0px #0000000D',
                popover: '0px 0px 16px 0px #65778633',
                messageShadow: '0px 0px 16px 0px rgba(101, 119, 134, 0.20)',
                accountCardShadowLight: '0px 0px 20px 0px rgba(0, 0, 0, 0.05)',
                accountCardShadowDark: '0px 0px 20px 0px rgba(255, 255, 255, 0.12)',
            },
            fontFamily: {
                inter: ['var(--font-inter)'],
            },
        },
        screens: {
            sm: '640px',
            md: '990px',
            lg: '1280px',
        },
    },
    plugins: [require('@tailwindcss/forms'), require('tailwindcss-safe-area')],
};
