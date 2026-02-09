import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'
type AccentColor = 'blue' | 'orange' | 'purple' | 'green' | 'pink'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const accentColors: Record<AccentColor, { primary: string; accent: string }> = {
  blue: { primary: '217 91% 60%', accent: '25 95% 53%' },
  orange: { primary: '24 95% 53%', accent: '38 92% 50%' },
  purple: { primary: '270 95% 65%', accent: '290 91% 65%' },
  green: { primary: '142 71% 45%', accent: '160 60% 45%' },
  pink: { primary: '330 95% 60%', accent: '340 90% 55%' },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [accentColor, setAccentColor] = useState<AccentColor>('blue')

  useEffect(() => {
    // Load from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const savedAccent = localStorage.getItem('accentColor') as AccentColor | null

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('light', savedTheme === 'light')
    }

    if (savedAccent && accentColors[savedAccent]) {
      setAccentColor(savedAccent)
    }
  }, [])

  useEffect(() => {
    // Apply theme
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    // Apply accent color CSS variables
    const colors = accentColors[accentColor]
    const root = document.documentElement

    root.style.setProperty('--primary', colors.primary)
    root.style.setProperty('--accent', colors.accent)
    root.style.setProperty('--ring', colors.primary)

    // Update gradients
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, hsl(${colors.primary}) 0%, hsl(${parseInt(colors.primary.split(' ')[0]) - 18} 89% 48%) 100%)`)
    root.style.setProperty('--gradient-accent', `linear-gradient(135deg, hsl(${colors.accent}) 0%, hsl(${parseInt(colors.accent.split(' ')[0]) + 13} 92% 50%) 100%)`)

    localStorage.setItem('accentColor', accentColor)
  }, [accentColor])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { accentColors }
export type { Theme, AccentColor }