import { Building, GraduationCap, Laptop, Users, BookOpen, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  {
    id: "business-consulting",
    icon: Building,
    title: "Business & Financial Consulting",
    description: "Strategic planning, operational excellence, and cost optimization solutions for sustainable growth.",
    features: [
      "ISO System Support (development, review, and audit services)",
      "Strategic & business planning consultation",
      "Operational excellence and cost efficiency improvement",
      "Financial planning, performance analysis, and cost optimisation",
      "SME and startup advisory services",
    ],
  },
  {
    id: "professional-training",
    icon: GraduationCap,
    title: "Professional Training & Skill Development",
    description: "Comprehensive training programs designed to address professional services skill gaps.",
    features: [
      "ISO management system training",
      "QHSE training",
      "Soft skills and leadership training",
      "Professional skilled training",
      "HR & compliance training",
      "Digital tools & AI training",
      "Business & marketing training",
      "HRDC claimable training",
    ],
  },
  {
    id: "it-digital",
    icon: Laptop,
    title: "IT Consulting & Digital Transformation",
    description: "Technology advisory and implementation coordination for digital workflow automation.",
    features: [
      "Digital transformation advisory",
      "Web design, landing page, eCommerce",
      "Web hosting, managed cloud services",
      "Web App, Mobile App, API development",
      "System and application development",
      "e-Invoice, POS System",
      "Digital marketing",
    ],
  },
  {
    id: "learning-support",
    icon: Users,
    title: "Learning & Academic Support",
    description: "Academic tutoring, coaching, and structured learning pathways for students and individuals, including custom school management solutions.",
    features: [
      "Academic tutoring & coaching for students",
      "Academic seminar & workshop",
      "Digital learning resources",
      "Students development & enrichment",
      "Learning Management System (LMS) advisory and implementation",
      "Skills-based learning pathways for students and individuals",
      "Custom educational technology solutions (e.g., EduSync School Management System)",
    ],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 gradient-glow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Comprehensive professional services from Accenvix Solutions tailored to meet your unique business needs and drive sustainable growth through capacity building and digital transformation.
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
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="features" className="border-none">
                    <AccordionTrigger className="text-sm text-primary hover:no-underline py-0">
                      View Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="mt-4 space-y-2">
                        {service.features.map((feature, idx) => (
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
              Need a <span className="text-gradient">Custom Solution?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We understand that every business is unique. Let's discuss your specific requirements and create a tailored solution that fits your needs perfectly.
            </p>
            <Button asChild size="lg" className="gradient-primary hover:opacity-90 transition-opacity">
              <Link to="/contact">
                Get a Free Quote
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
