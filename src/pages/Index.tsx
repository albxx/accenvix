import { Link } from "react-router-dom";
import { ArrowRight, Building, GraduationCap, Laptop, Users, Award, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";




export default function Index() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Building,
      titleKey: "services.businessConsulting",
      descriptionKey: "services.businessConsultingDesc",
    },
    {
      icon: GraduationCap,
      titleKey: "services.professionalTraining",
      descriptionKey: "services.professionalTrainingDesc",
    },
    {
      icon: Laptop,
      titleKey: "services.itDigital",
      descriptionKey: "services.itDigitalDesc",
    },
    {
      icon: Users,
      titleKey: "services.learningSupport",
      descriptionKey: "services.learningSupportDesc",
    },
  ];

  const stats = [
    // { value: "150+", labelKey: "stats.projectsCompleted" },
    // { value: "50+", labelKey: "stats.happyClients" },
    { value: "15+", labelKey: "stats.yearsExperience" },
    { value: "99%", labelKey: "stats.clientSatisfaction" },
  ];

  const features = [
    {
      icon: Users,
      titleKey: "about.excellence",
      descriptionKey: "about.excellenceDesc",
    },
    {
      icon: Award,
      titleKey: "about.innovation",
      descriptionKey: "about.innovationDesc",
    },
    {
      icon: Clock,
      titleKey: "about.trust",
      descriptionKey: "about.trustDesc",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Background Glow and Pattern */}
        <div className="absolute inset-0 gradient-glow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/10 blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-accent/10 blur-xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full bg-primary/10 blur-xl animate-float" style={{ animationDelay: "3s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
                🚀 {t('homepage.heroTagline')}
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
                {t('homepage.heroTitle')}{" "}
                <span className="text-gradient">{t('homepage.heroTitleHighlight')}</span>
                <br />
                {t('homepage.heroTitleSecondLine')}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {t('homepage.heroSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8">
                  <Link to="/contact">
                    {t('navigation.getStarted')}
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/services">{t('homepage.ourServices')}</Link>
                </Button>
              </div>
            </div>
            
            {/* Hero Image/Illustration */}
            <div className="relative flex justify-center animate-float">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 gradient-primary rounded-2xl blur-2xl opacity-20 animate-pulse" />
                <div className="relative bg-card/50 border border-border rounded-2xl p-8 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 rounded-xl p-4 aspect-square flex items-center justify-center">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <div className="bg-accent/10 rounded-xl p-4 aspect-square flex items-center justify-center">
                      <Laptop className="w-8 h-8 text-accent" />
                    </div>
                    <div className="bg-primary/10 rounded-xl p-4 aspect-square flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <div className="bg-accent/10 rounded-xl p-4 aspect-square flex items-center justify-center">
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                  </div>
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Award className="w-4 h-4 mr-1" />
                  {/* {t('homepage.trustedByClients')} */}
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-8 max-w-md">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('homepage.yourTrustedPartner')}{" "}
                <span className="text-gradient">{t('homepage.professionalServices')}</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('about.storyContent1')}
              </p>
              <p className="text-muted-foreground mb-8">
                {t('about.storyContent2')}
              </p>
              
              {/* Key Values */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-foreground">{t('homepage.innovationFirst')}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-foreground">{t('homepage.qualityAssured')}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-foreground">{t('homepage.clientFocused')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-foreground">{t('homepage.onTimeDelivery')}</span>
                </div>
              </div>

              <Button asChild variant="outline">
                <Link to="/about">
                  {t('common.learnMore')}
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl gradient-primary opacity-10 absolute inset-0" />
              <div className="aspect-square rounded-2xl border border-border bg-card/50 backdrop-blur flex items-center justify-center overflow-hidden">
                <div className="text-center p-8 relative z-10">
                  <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-primary-foreground font-display font-bold text-4xl">A</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Accenvix Solutions</h3>
                  <p className="text-muted-foreground mb-4">{t('homepage.innovationMeetsExcellence')}</p>
                  
                  {/* Stats Preview */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {/* <div className="text-center">
                      <div className="font-display text-xl font-bold text-gradient">150+</div>
                      <div className="text-xs text-muted-foreground">{t('stats.projectsCompletedShort')}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-xl font-bold text-gradient">50+</div>
                      <div className="text-xs text-muted-foreground">{t('stats.happyClientsShort')}</div>
                    </div> */}
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-primary/5 blur-xl" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-accent/5 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('homepage.servicesHighlight')} <span className="text-gradient">{t('homepage.ourServices')}</span>
            </h2>
            <p className="text-muted-foreground">
              {t('homepage.comprehensiveSolutions')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover-lift bg-card border-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                    <service.icon className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(service.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/services">
                {t('common.viewAll')} {t('homepage.ourServices')}
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('homepage.featuredProjects')} <span className="text-gradient">{t('homepage.projectsHighlight')}</span>
            </h2>
            <p className="text-muted-foreground">
              {t('homepage.exploreSuccessStories')}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <Card className="group hover-lift bg-card border-border overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src="/portfolio/ecommerce-platform.svg" 
                          alt={t('portfolio.webDevelopment')}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-2">{t('portfolio.educationTech')}</Badge>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                          {t('portfolio.EduSyncLearningPlatform')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t('portfolio.EduSyncLearningPlatformDesc')}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
              {/* <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="group hover-lift bg-card border-border overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src="/portfolio/ecommerce-platform.svg" 
                      alt={t('portfolio.webDevelopment')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2">{t('portfolio.webDevelopment')}</Badge>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {t('portfolio.EduSyncLearningPlatform')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('portfolio.EduSyncLearningPlatformDesc')}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem> */}
              {/* <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="group hover-lift bg-card border-border overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src="/portfolio/healthcare-dashboard.svg" 
                      alt={t('portfolio.enterpriseSoftware')}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2">{t('portfolio.enterpriseSoftware')}</Badge>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {t('portfolio.iotDashboard')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('portfolio.iotDashboardDesc')}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem> */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/portfolio">
                {t('homepage.viewFullPortfolio')}
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Preview Section - Temporarily Disabled */}
      {/* 
      <section className="py-20 md:py-28 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our <span className="text-gradient">Expert Team</span>
            </h2>
            <p className="text-muted-foreground">
              Passionate professionals dedicated to delivering exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover-lift bg-card border-border text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src="/placeholder.svg" alt="Team Member" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  John Doe
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  CEO & Founder
                </p>
                <p className="text-xs text-muted-foreground">
                  10+ years in IT consulting and business transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift bg-card border-border text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src="/placeholder.svg" alt="Team Member" />
                    <AvatarFallback className="text-lg">JS</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  Jane Smith
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  Lead Developer
                </p>
                <p className="text-xs text-muted-foreground">
                  Expert in full-stack development and cloud architecture.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift bg-card border-border text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src="/placeholder.svg" alt="Team Member" />
                    <AvatarFallback className="text-lg">MJ</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  Mike Johnson
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  Business Consultant
                </p>
                <p className="text-xs text-muted-foreground">
                  Strategic planning and operational excellence specialist.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift bg-card border-border text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src="/placeholder.svg" alt="Team Member" />
                    <AvatarFallback className="text-lg">SL</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  Sarah Lee
                </h3>
                <p className="text-sm text-primary font-medium mb-2">
                  Training Director
                </p>
                <p className="text-xs text-muted-foreground">
                  Professional development and learning innovation expert.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/about">
                Meet Our Full Team
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Temporarily Disabled */}
      {/* 
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
            <p className="text-muted-foreground">
              Don't just take our word for it – hear from our satisfied clients.
            </p>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <Card className="group bg-card border-border">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-primary mr-2" />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-lg text-foreground mb-6">
                      "Accenvix transformed our business operations with their innovative solutions. Their team delivered beyond our expectations and helped us achieve significant ROI within the first quarter."
                    </blockquote>
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 mr-4">
                        <AvatarImage src="/placeholder.svg" alt="Client" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-display font-semibold text-foreground">Alex Chen</p>
                        <p className="text-sm text-muted-foreground">CTO, TechCorp Inc.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="group bg-card border-border">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-primary mr-2" />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-lg text-foreground mb-6">
                      "The professional training program developed by Accenvix significantly improved our team's productivity. Their expertise in learning innovation is unmatched in the industry."
                    </blockquote>
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 mr-4">
                        <AvatarImage src="/placeholder.svg" alt="Client" />
                        <AvatarFallback>MW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-display font-semibold text-foreground">Maria Wilson</p>
                        <p className="text-sm text-muted-foreground">HR Director, Global Enterprises</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="group bg-card border-border">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-primary mr-2" />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-lg text-foreground mb-6">
                      "Working with Accenvix on our digital transformation journey was a game-changer. Their strategic approach and technical expertise delivered exceptional results."
                    </blockquote>
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 mr-4">
                        <AvatarImage src="/placeholder.svg" alt="Client" />
                        <AvatarFallback>RK</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-display font-semibold text-foreground">Robert Kim</p>
                        <p className="text-sm text-muted-foreground">CEO, Innovate Solutions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Why Choose Us Section - Temporarily Disabled */}
      {/* 
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose <span className="text-gradient">Accenvix?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                We don't just build software – we build partnerships. Our commitment to excellence, transparency, and innovation sets us apart from the competition.
              </p>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 gradient-glow" />
              <div className="grid grid-cols-2 gap-4 relative">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-xl p-6 hover-lift"
                  >
                    <div className="font-display text-2xl font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('homepage.readyToStart')}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('homepage.contactCTADescription')}
            </p>
            <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8">
              <Link to="/contact">
                {t('common.contactUs')}
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
