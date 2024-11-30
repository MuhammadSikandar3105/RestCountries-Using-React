import { createContext, useState } from "react";

export const ThemeProvider = createContext()

export const Provider = ({ children }) => {
    const [mode, setMode] = useState(JSON.parse(localStorage.getItem('toggleState')))

    return <>
        <ThemeProvider.Provider value={[mode, setMode]}>
            {children}
        </ThemeProvider.Provider>
    </>

}