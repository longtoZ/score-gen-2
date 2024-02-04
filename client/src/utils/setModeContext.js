import { createContext, useEffect, useState } from 'react';

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem('mode') === null ? 'light' : localStorage.getItem('mode')
    )

    useEffect(() => {
        localStorage.setItem('mode', theme)
    }, [theme])

    return (
        <ModeContext.Provider value={{theme, setTheme}}>
            {children}
        </ModeContext.Provider>
    )
}
