import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    titleKey: "contact.email",
    value: "hello@accenvix.com",
    href: "mailto:hello@accenvix.com",
  },
  {
    icon: Phone,
    titleKey: "contact.phone",
    value: "+60 13 991 5339",
    href: "tel:+60139915339",
  },
  {
    icon: MapPin,
    titleKey: "contact.address",
    value: "11-02 Imperia, No 1 Jalan Laksamana, 79000 Iskandar Puteri, Johor, Malaysia",
    href: null,
  },
  {
    icon: Clock,
    titleKey: "contact.businessHours",
    href: null,
  },
];

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Security: Improved email validation (RFC 5322 inspired)
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 100;
  };

  // Security: Validate name format
  const isValidName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s\-'.()]{1,100}$/;
    return nameRegex.test(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security: Validate name format
    if (!isValidName(formData.name)) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name (letters, spaces, hyphens only).",
        variant: "destructive",
      });
      return;
    }

    // Security: Validate email format
    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Security: Validate field lengths
    if (formData.name.length > 100 || formData.email.length > 100 || 
        formData.subject.length > 200 || formData.message.length > 2000) {
      toast({
        title: "Input Too Long",
        description: "One or more fields exceed maximum length.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use mock API endpoint for local development
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/send-email' 
        : '/api/send-email';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Security: Include honeypot field (empty = human, filled = bot)
        // Include current language for localized email responses
        body: JSON.stringify({
          ...formData,
          honeypot: honeypot,
          lang: i18n.language || 'en',
        }),
      });

      const result = await response.json();

      // Security: Handle rate limiting
      if (response.status === 429) {
        toast({
          title: "Too Many Requests",
          description: "Please wait a moment before trying again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We've sent a confirmation to your email. We'll get back to you soon.",
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setHoneypot("");
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              {t('contact.pageTitle')} <span className="text-gradient">{t('contact.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t('contact.pageSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {t('contact.sendMessage')}
                </h2>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                      <CheckCircle className="text-primary-foreground" size={32} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {t('contact.thankYou')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('contact.messageSent')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Security: Honeypot field - hidden from real users, traps bots */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
                      <label htmlFor="honeypot">Leave this empty</label>
                      <input
                        type="text"
                        id="honeypot"
                        name="honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contact.fullName')}</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t('contact.fullName')}
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contact.emailAddress')}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t('contact.emailAddress')}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="bg-background"
                      />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t('contact.subject')}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={t('contact.subject')}
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        maxLength={200}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t('contact.message')}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t('contact.messagePlaceholder')}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        maxLength={2000}
                        rows={6}
                        className="bg-background resize-none"
                      />
                      <div className="text-xs text-muted-foreground text-right">
                        {formData.message.length}/2000
                      </div>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-primary hover:opacity-90 transition-opacity"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          {t('common.loading')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={18} />
                          {t('common.send')}
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {t('contact.contactInfo')}
                </h2>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-4 p-4 bg-card border border-border rounded-xl hover-lift"
                    >
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 group-hover:shadow-glow transition-all duration-300">
                        <info.icon className="text-primary-foreground" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{t(info.titleKey)}</h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : info.titleKey === 'contact.businessHours' ? (
                          <p className="text-sm text-muted-foreground">{t('contact.hours')}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Integration */}
                <div className="mt-8">
                  <div className="aspect-video rounded-xl bg-card border border-border overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15952.356!2d103.641!3d1.467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjgnMDEuMiJOIDEwM8KwMzgnMjQuMyJF!5e0!3m2!1sen!2smy!4v1635000000000!5m2!1sen!2smy"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Accenvix Solutions Location - Iskandar Puteri, Johor, Malaysia"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}