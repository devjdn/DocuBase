"use client";

import * as React from 'react';
import { Geist, Libre_Baskerville } from 'next/font/google';
import localFont from 'next/font/local';

export const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist',
    display: 'swap',
});

export const libreBaskerville = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-libre-baskerville',
    display: 'swap',
});

export const openDyslexic = localFont({
    src: '../public/fonts/OpenDyslexic-Regular.woff2',
    display: 'swap',
    variable: '--font-open-dyslexic',
})

const FONTS = {
    geist: geist.className,
    libreBaskerville: libreBaskerville.className,
    openDyslexic: openDyslexic.className,
} as const;

export type FontKey = keyof typeof FONTS;

interface FontContextTypes {
    font: FontKey;
    setFont: (font: FontKey) => void;
    toggleFont: (font: FontKey) => void;
}

const FontContext = React.createContext<FontContextTypes | undefined>(undefined);

export const useFont = () => {
    const context = React.useContext(FontContext);

    if(!context) {
        throw new Error("useFont must be used within a FontProvider");
    }

    return context;
};

export const FontProvider = ({children, initialFont}: {children: React.ReactNode, initialFont: FontKey}) => {
    const [font, setFont] = React.useState<FontKey>(initialFont);

    React.useEffect(() => {
        const fontClass = FONTS[font];
        document.documentElement.classList.remove(...Object.values(FONTS)); // Remove any previously applied font classes
        document.documentElement.classList.add(fontClass); // Add the new font class
        document.cookie = `font=${font}; path=/; SameSite=Lax`; // Set the font cookie
    }, [font]);

    const toggleFont = (newFont: FontKey) => {
        if (FONTS[newFont]) {
            setFont(newFont);
        }
    }

    const contextValue = React.useMemo<FontContextTypes>(
        () => ({
            font,
            setFont,
            toggleFont
        }),
        [font, setFont, toggleFont]
    )

    return(
        <FontContext.Provider value={contextValue}>
            {children}
        </FontContext.Provider>
    )
}