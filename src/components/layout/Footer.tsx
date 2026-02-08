import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

const socialLinks = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://github.com", icon: Github, label: "GitHub" },
];

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    company: [
      { href: "/about", key: "footer.about" },
      { href: "/services", key: "footer.services" },
      { href: "/portfolio", key: "footer.portfolio" },
      { href: "/contact", key: "footer.contact" },
    ],
    services: [
      { href: "/services#business-consulting", key: "services.businessConsulting" },
      { href: "/services#professional-training", key: "services.professionalTraining" },
      { href: "/services#it-digital", key: "services.itDigital" },
      { href: "/services#learning-support", key: "services.learningSupport" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">A</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Accenvix Solutions
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              {t('footer.brandDescription')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">{t('contact.contactInfo')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@accenvix.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={16} />
                  hello@accenvix.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+60139915339"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone size={16} />
                  +60 13 991 5339
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>11-02 Imperia, No 1 Jalan Laksamana, 79000 Iskandar Puteri, Johor, Malaysia</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Accenvix Solutions. {t('footer.rightsReserved')}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
