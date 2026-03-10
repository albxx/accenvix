import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ms' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('i18nextLng', newLang)
  }

  // Show the language we're switching TO (like ThemeToggle shows Moon when going to dark)
  const currentLang = i18n.language === 'en' ? 'ms' : 'en'

  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-muted font-medium"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      {currentLang.toUpperCase()}
    </Button>
  )
}
