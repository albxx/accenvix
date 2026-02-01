import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const projects = [
  {
    id: 1,
    title: "EduSync School Management System",
    client: "Malaysian Education Sector",
    category: "Educational Technology",
    description: "Comprehensive school management system built with Flutter for Malaysian schools, streamlining communication between teachers, parents, and students.",
    tags: ["Flutter", "Dart", "Firebase", "Mobile App", "Education"],
    image: "/portfolio/edusync-platform.svg",
    alt: "EduSync School Management System Interface",
  },
  // {
  //   id: 2,
  //   title: "E-Commerce Platform",
  //   client: "RetailMax Inc.",
  //   category: "Web Development",
  //   description: "A full-featured e-commerce platform with real-time inventory management, payment integration, and analytics dashboard.",
  //   tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  //   image: "/portfolio/ecommerce-platform.svg",
  //   alt: "E-Commerce Platform Dashboard",
  // },
  // {
  //   id: 3,
  //   title: "Healthcare Management System",
  //   client: "MediCare Solutions",
  //   category: "Enterprise Software",
  //   description: "Comprehensive healthcare management system for patient records, appointments, and billing automation.",
  //   tags: ["Angular", "Python", "MongoDB", "AWS"],
  //   image: "/portfolio/healthcare-dashboard.svg",
  //   alt: "Healthcare Management System Dashboard",
  // },
  // {
  //   id: 4,
  //   title: "FinTech Mobile App",
  //   client: "QuickPay Finance",
  //   category: "Mobile Development",
  //   description: "Cross-platform mobile banking app with biometric authentication and real-time transaction tracking.",
  //   tags: ["React Native", "Firebase", "Node.js"],
  //   image: "/portfolio/fintech-app.svg",
  //   alt: "FinTech Mobile Banking App Interface",
  // },
  // {
  //   id: 5,
  //   title: "Logistics Dashboard",
  //   client: "GlobalShip Ltd.",
  //   category: "Cloud Solutions",
  //   description: "Real-time logistics tracking dashboard with route optimization and delivery management features.",
  //   tags: ["Vue.js", "Go", "Redis", "Google Cloud"],
  //   image: "/portfolio/logistics-dashboard.svg",
  //   alt: "Logistics Tracking Dashboard",
  // },
  // {
  //   id: 6,
  //   title: "EduSync Learning Platform",
  //   client: "LearnSmart Academy",
  //   category: "Web Development",
  //   description: "Interactive online learning platform with video streaming, quizzes, and progress tracking.",
  //   tags: ["Next.js", "PostgreSQL", "WebRTC", "Vercel"],
  //   image: "/portfolio/edusync-platform.svg",
  //   alt: "EduSync Learning Platform Interface",
  // },
  // {
  //   id: 7,
  //   title: "IoT Dashboard",
  //   client: "SmartFactory Corp.",
  //   category: "Enterprise Software",
  //   description: "Industrial IoT monitoring dashboard for real-time sensor data visualization and predictive maintenance.",
  //   tags: ["React", "Python", "InfluxDB", "Azure"],
  //   image: "/portfolio/iot-dashboard.svg",
  //   alt: "Industrial IoT Monitoring Dashboard",
  // },
];

export default function Portfolio() {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      titleKey: "portfolio.EduSyncLearningPlatform",
      client: "Malaysian Education Sector",
      categoryKey: "portfolio.educationTech",
      descriptionKey: "portfolio.EduSyncLearningPlatformDesc",
      tags: ["Flutter", "Dart", "Firebase", "Mobile App", "Education"],
      image: "/portfolio/edusync-platform.svg",
      altKey: "portfolio.EduSyncLearningPlatform",
    },
    // {
    //   id: 2,
    //   titleKey: "portfolio.eCommercePlatform",
    //   client: "RetailMax Inc.",
    //   categoryKey: "portfolio.webDevelopment",
    //   descriptionKey: "portfolio.eCommercePlatformDesc",
    //   tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    //   image: "/portfolio/ecommerce-platform.svg",
    //   altKey: "portfolio.eCommercePlatform",
    // },
    // {
    //   id: 3,
    //   titleKey: "portfolio.healthcareManagement",
    //   client: "MediCare Solutions",
    //   categoryKey: "portfolio.enterpriseSoftware",
    //   descriptionKey: "portfolio.healthcareManagementDesc",
    //   tags: ["Angular", "Python", "MongoDB", "AWS"],
    //   image: "/portfolio/healthcare-dashboard.svg",
    //   altKey: "portfolio.healthcareManagement",
    // },
    // {
    //   id: 4,
    //   titleKey: "portfolio.fintechMobileApp",
    //   client: "QuickPay Finance",
    //   categoryKey: "portfolio.mobileDevelopment",
    //   descriptionKey: "portfolio.fintechMobileAppDesc",
    //   tags: ["React Native", "Firebase", "Node.js"],
    //   image: "/portfolio/fintech-app.svg",
    //   altKey: "portfolio.fintechMobileApp",
    // },
    // {
    //   id: 5,
    //   titleKey: "portfolio.logisticsDashboard",
    //   client: "GlobalShip Ltd.",
    //   categoryKey: "portfolio.cloudSolutions",
    //   descriptionKey: "portfolio.logisticsDashboardDesc",
    //   tags: ["Vue.js", "Go", "Redis", "Google Cloud"],
    //   image: "/portfolio/logistics-dashboard.svg",
    //   altKey: "portfolio.logisticsDashboard",
    // },
    // {
    //   id: 6,
    //   titleKey: "portfolio.EduSyncLearningPlatform2",
    //   client: "LearnSmart Academy",
    //   categoryKey: "portfolio.webDevelopment",
    //   descriptionKey: "portfolio.EduSyncLearningPlatformDesc",
    //   tags: ["Next.js", "PostgreSQL", "WebRTC", "Vercel"],
    //   image: "/portfolio/edusync-platform.svg",
    //   altKey: "portfolio.EduSyncLearningPlatform2",
    // },
    // {
    //   id: 7,
    //   titleKey: "portfolio.iotDashboard",
    //   client: "SmartFactory Corp.",
    //   categoryKey: "portfolio.enterpriseSoftware",
    //   descriptionKey: "portfolio.iotDashboardDesc",
    //   tags: ["React", "Python", "InfluxDB", "Azure"],
    //   image: "/portfolio/iot-dashboard.svg",
    //   altKey: "portfolio.iotDashboard",
    // },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              {t('portfolio.pageTitle')} <span className="text-gradient">{t('portfolio.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t('portfolio.pageSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover-lift"
              >
                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={t(project.altKey)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {t(project.categoryKey)}
                    </Badge>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 text-center">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {project.client}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(project.descriptionKey)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <button className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all duration-300">
                    {t('common.viewDetails')}
                    <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('portfolio.wantToSeeProject')} <span className="text-gradient">{t('portfolio.projectHighlight')}</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('portfolio.wantToSeeProjectDesc')}
            </p>
            <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-opacity">
              <Link to="/contact">
                {t('portfolio.startYourProject')}
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
