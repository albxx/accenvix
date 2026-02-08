import { 
  Globe, 
  Smartphone, 
  Cloud, 
  Shield, 
  Cpu, 
  BarChart3, 
  Code2, 
  ArrowRight,
  CheckCircle2,
  Layers,
  Terminal,
  GitBranch,
  MessageSquare,
  Server,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const techStack = {
  frontend: ["React", "Vue.js", "Angular", "Next.js", "TypeScript"],
  backend: ["Node.js", "Python", "Java", "Go", "Express.js"],
  mobile: ["React Native", "Flutter", "iOS/Swift", "Android/Kotlin"],
  cloud: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
  database: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "MySQL"],
  devops: ["GitHub Actions", "Jenkins", "Terraform", "Ansible", "CI/CD"],
};

export default function ITServices() {
  const { t } = useTranslation();

  const services = [
    {
      id: "web-development",
      icon: Globe,
      titleKey: "services.itServices.webDevelopment",
      descriptionKey: "services.itServices.webDevelopmentDesc",
      featuresKey: "services.itServices.webDevelopmentFeatures",
      color: "blue",
    },
    {
      id: "mobile-apps",
      icon: Smartphone,
      titleKey: "services.itServices.mobileApps",
      descriptionKey: "services.itServices.mobileAppsDesc",
      featuresKey: "services.itServices.mobileAppsFeatures",
      color: "purple",
    },
    {
      id: "cloud-solutions",
      icon: Cloud,
      titleKey: "services.itServices.cloudSolutions",
      descriptionKey: "services.itServices.cloudSolutionsDesc",
      featuresKey: "services.itServices.cloudSolutionsFeatures",
      color: "cyan",
    },
    {
      id: "enterprise-software",
      icon: Server,
      titleKey: "services.itServices.enterpriseSoftware",
      descriptionKey: "services.itServices.enterpriseSoftwareDesc",
      featuresKey: "services.itServices.enterpriseSoftwareFeatures",
      color: "orange",
    },
    {
      id: "digital-transformation",
      icon: Zap,
      titleKey: "services.itServices.digitalTransformation",
      descriptionKey: "services.itServices.digitalTransformationDesc",
      featuresKey: "services.itServices.digitalTransformationFeatures",
      color: "yellow",
    },
    {
      id: "cybersecurity",
      icon: Shield,
      titleKey: "services.itServices.cybersecurity",
      descriptionKey: "services.itServices.cybersecurityDesc",
      featuresKey: "services.itServices.cybersecurityFeatures",
      color: "red",
    },
  ];

  const processSteps = [
    {
      step: "01",
      titleKey: "services.itServices.discovery",
      descKey: "services.itServices.discoveryDesc",
      icon: MessageSquare,
    },
    {
      step: "02",
      titleKey: "services.itServices.planning",
      descKey: "services.itServices.planningDesc",
      icon: Layers,
    },
    {
      step: "03",
      titleKey: "services.itServices.development",
      descKey: "services.itServices.developmentDesc",
      icon: Code2,
    },
    {
      step: "04",
      titleKey: "services.itServices.testing",
      descKey: "services.itServices.testingDesc",
      icon: Terminal,
    },
    {
      step: "05",
      titleKey: "services.itServices.deployment",
      descKey: "services.itServices.deploymentDesc",
      icon: GitBranch,
    },
    {
      step: "06",
      titleKey: "services.itServices.support",
      descKey: "services.itServices.supportDesc",
      icon: Server,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 gradient-hero overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Cpu className="w-4 h-4 mr-2" />
              {t('services.itServices.techExperts')}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              {t('services.itServices.pageTitle')} <span className="text-gradient">{t('services.itServices.titleHighlight')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t('services.itServices.pageSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8">
                <Link to="/contact">
                  {t('services.itServices.getConsultation')}
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/portfolio">
                  {t('services.itServices.viewProjects')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('services.itServices.technologies')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('services.itServices.technologiesDesc')}
            </p>
          </div>

          <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 p-1">
              <TabsTrigger value="frontend" className="text-xs sm:text-sm">{t('services.itServices.frontend')}</TabsTrigger>
              <TabsTrigger value="backend" className="text-xs sm:text-sm">{t('services.itServices.backend')}</TabsTrigger>
              <TabsTrigger value="mobile" className="text-xs sm:text-sm">{t('services.itServices.mobile')}</TabsTrigger>
              <TabsTrigger value="cloud" className="text-xs sm:text-sm">{t('services.itServices.cloud')}</TabsTrigger>
              <TabsTrigger value="database" className="text-xs sm:text-sm">{t('services.itServices.database')}</TabsTrigger>
              <TabsTrigger value="devops" className="text-xs sm:text-sm">{t('services.itServices.devops')}</TabsTrigger>
            </TabsList>
            
            {Object.entries(techStack).map(([category, technologies]) => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="flex flex-wrap justify-center gap-3">
                  {technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('services.itServices.ourITServices')}
            </h2>
            <p className="text-muted-foreground">
              {t('services.itServices.servicesDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                id={service.id}
                className="group bg-card border-border hover-lift hover:shadow-glow transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-xl bg-${service.color}-500/10 flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110`}>
                    <service.icon className={`text-${service.color}-500`} size={28} />
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
                    <ul className="mt-4 space-y-3">
                      {(() => {
                        const features = t(service.featuresKey, { returnObjects: true });
                        // Handle both array and string (fallback)
                        const featureList = Array.isArray(features) ? features : [features];
                        return featureList.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ));
                      })()}
                    </ul>
                  </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('services.itServices.ourProcess')}
            </h2>
            <p className="text-muted-foreground">
              {t('services.itServices.processDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover-lift transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-primary-foreground font-display font-bold">
                      {step.step}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="text-primary" size={20} />
                  </div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    {t(step.titleKey)}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {t(step.descKey)}
                  </p>
                </div>
                
                {/* Connecting Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden xl:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-primary/0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose IT Services */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('services.itServices.whyChooseUs')}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t('services.itServices.whyChooseUsDesc')}
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Code2, titleKey: "services.itServices.technicalExpertise", descKey: "services.itServices.technicalExpertiseDesc" },
                  { icon: Shield, titleKey: "services.itServices.securityFirst", descKey: "services.itServices.securityFirstDesc" },
                  { icon: Zap, titleKey: "services.itServices.rapidDelivery", descKey: "services.itServices.rapidDeliveryDesc" },
                  { icon: BarChart3, titleKey: "services.itServices.measurableResults", descKey: "services.itServices.measurableResultsDesc" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground mb-1">
                        {t(item.titleKey)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-glow opacity-30" />
              <div className="bg-card border border-border rounded-2xl p-8 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    // { value: "50+", labelKey: "services.itServices.projectsDelivered" },
                    // { value: "99%", labelKey: "services.itServices.uptimeGuarantee" },
                    { value: "24/7", labelKey: "services.itServices.support" },
                    { value: "15+", labelKey: "services.itServices.yearsExperience" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-4 rounded-xl bg-primary/5">
                      <div className="font-display text-3xl font-bold text-gradient mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t(stat.labelKey)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="text-primary" size={20} />
                    <span className="font-semibold text-foreground">{t('services.itServices.freeConsultation')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('services.itServices.freeConsultationDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('services.itServices.readyToStart')} <span className="text-gradient">{t('services.itServices.readyHighlight')}</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('services.itServices.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8">
                <Link to="/contact">
                  {t('services.itServices.startProject')}
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/services">
                  {t('services.itServices.backToServices')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}