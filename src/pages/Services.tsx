import { Building, GraduationCap, Laptop, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      id: "business-consulting",
      icon: Building,
      titleKey: "services.businessConsulting",
      descriptionKey: "services.businessConsultingDesc",
      featuresKey: "services.businessConsultingFeatures",
    },
    {
      id: "professional-training",
      icon: GraduationCap,
      titleKey: "services.professionalTraining",
      descriptionKey: "services.professionalTrainingDesc",
      featuresKey: "services.professionalTrainingFeatures",
    },
    {
      id: "it-digital",
      icon: Laptop,
      titleKey: "services.itDigital",
      descriptionKey: "services.itDigitalDesc",
      featuresKey: "services.itDigitalFeatures",
    },
    {
      id: "learning-support",
      icon: Users,
      titleKey: "services.learningSupport",
      descriptionKey: "services.learningSupportDesc",
      featuresKey: "services.learningSupportFeatures",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              {t('services.pageTitle')} <span className="text-gradient">{t('services.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t('services.pageSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="group bg-card border border-border rounded-2xl p-8 hover-lift"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">
                  <service.icon className="text-primary-foreground" size={28} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t(service.descriptionKey)}
                </p>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="features" className="border-none">
                    <AccordionTrigger className="text-sm text-primary hover:no-underline py-0">
                      {t('common.viewDetails')}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="mt-4 space-y-2">
                        {(t(service.featuresKey, { returnObjects: true }) as string[]).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('services.customSolution')} <span className="text-gradient">{t('services.solutionHighlight')}</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('services.customSolutionDesc')}
            </p>
            <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-opacity">
              <Link to="/contact">
                {t('services.getFreeQuote')}
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
