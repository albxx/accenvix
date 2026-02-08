import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslation } from "react-i18next";

const navLinks = [
  { href: "/", key: "navigation.home" },
  { href: "/about", key: "navigation.about" },
  { href: "/services", key: "navigation.services" },
  { href: "/portfolio", key: "navigation.portfolio" },
  { href: "/contact", key: "navigation.contact" },
];

export function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <span className="text-primary-foreground font-display font-bold text-xl">A</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
              {t('common.accenvixSolutions')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift",
                  isActive(link.href)
                    ? "text-primary bg-primary/10 shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Language Switcher, Theme Toggle and CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild className="gradient-primary hover:opacity-90 hover:shadow-glow transition-all duration-300 hover-lift">
              <Link to="/contact">{t('navigation.getStarted')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors duration-300 hover:shadow-glow rounded-lg"
              aria-label={isOpen ? t('common.close') : t('common.open')}
            >
              {isOpen ? <X size={24} className="transition-transform duration-300" /> : <Menu size={24} className="transition-transform duration-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover-lift",
                    isActive(link.href)
                      ? "text-primary bg-primary/10 shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {t(link.key)}
                </Link>
              ))}
              <Button asChild className="gradient-primary hover:opacity-90 mt-2">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  {t('navigation.getStarted')}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
