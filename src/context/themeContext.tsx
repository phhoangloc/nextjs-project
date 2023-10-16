'use client'

import React, { FC } from 'react'
import { createContext } from 'react'

export type ThemeContextType = {
    theme: string,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [theme, setTheme] = React.useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`theme ${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider