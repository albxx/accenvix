import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ms' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('i18nextLng', newLang)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-muted"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <Languages className="h-5 w-5" />
    </Button>
  )
}