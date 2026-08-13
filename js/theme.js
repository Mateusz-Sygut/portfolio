const LEAF_COLORS = {
    base: '#0c0c0e',
    section: '#141416',
    surface: '#1c1c1f',
    card: '#252529',
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    muted: '#71717a',
};

const rootStyle = document.createElement('style');
rootStyle.textContent = `
:root {
    --color-base: ${LEAF_COLORS.base};
    --color-section: ${LEAF_COLORS.section};
    --color-surface: ${LEAF_COLORS.surface};
    --color-card: ${LEAF_COLORS.card};
    --color-accent: ${LEAF_COLORS.accent};
    --color-accent-rgb: ${LEAF_COLORS.accentRgb};
    --color-muted: ${LEAF_COLORS.muted};
    --font-sans: 'Inter', system-ui, sans-serif;
}
`;
document.head.appendChild(rootStyle);

window.LEAF_COLORS = LEAF_COLORS;
window.TAILWIND_CONFIG = {
    theme: {
        extend: {
            colors: {
                base: LEAF_COLORS.base,
                section: LEAF_COLORS.section,
                surface: LEAF_COLORS.surface,
                card: LEAF_COLORS.card,
                accent: LEAF_COLORS.accent,
                'accent-hover': LEAF_COLORS.accent,
                muted: LEAF_COLORS.muted,
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
};
