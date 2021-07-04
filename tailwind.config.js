module.exports = {
    purge: {
        enabled: true,
        content: ['./src/**/*.{html,ts}'],
    },
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#fb6e3b',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
