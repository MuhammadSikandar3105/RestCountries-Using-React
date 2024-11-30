import { useContext } from "react"
import { ThemeProvider } from "../contexts/ThemeProvider"

export const useTheme = () => useContext(ThemeProvider);