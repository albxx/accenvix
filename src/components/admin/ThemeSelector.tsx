import { useTranslation } from 'react-i18next'
import { useTheme, accentColors, type AccentColor } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Palette, Sun, Moon, Check } from 'lucide-react'

export function ThemeSelector() {
  const { t } = useTranslation()
  const { theme, setTheme, accentColor, setAccentColor } = useTheme()

  const colorOptions: { value: AccentColor; label: string; preview: string }[] = [
    { value: 'blue', label: t('theme.colors.blue'), preview: 'bg-blue-500' },
    { value: 'orange', label: t('theme.colors.orange'), preview: 'bg-orange-500' },
    { value: 'purple', label: t('theme.colors.purple'), preview: 'bg-purple-500' },
    { value: 'green', label: t('theme.colors.green'), preview: 'bg-green-500' },
    { value: 'pink', label: t('theme.colors.pink'), preview: 'bg-pink-500' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-muted">
          <Palette className="h-5 w-5" />
          <span className="sr-only">{t('theme.title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-3">
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t('theme.mode')}
        </DropdownMenuLabel>
        <div className="flex gap-2 mb-3">
          <Button
            variant={theme === 'dark' ? 'secondary' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => setTheme('dark')}
          >
            <Moon className="h-4 w-4 mr-2" />
            {t('theme.dark')}
          </Button>
          <Button
            variant={theme === 'light' ? 'secondary' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => setTheme('light')}
          >
            <Sun className="h-4 w-4 mr-2" />
            {t('theme.light')}
          </Button>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-3">
          {t('theme.accentColor')}
        </DropdownMenuLabel>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {colorOptions.map((color) => (
            <Button
              key={color.value}
              variant={accentColor === color.value ? 'default' : 'outline'}
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setAccentColor(color.value)}
              style={{
                backgroundColor: color.value === 'blue' ? 'hsl(217 91% 60%)' :
                                color.value === 'orange' ? 'hsl(24 95% 53%)' :
                                color.value === 'purple' ? 'hsl(270 95% 65%)' :
                                color.value === 'green' ? 'hsl(142 71% 45%)' :
                                'hsl(330 95% 60%)'
              }}
            >
              {accentColor === color.value && (
                <Check className="h-4 w-4 text-white" />
              )}
            </Button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}