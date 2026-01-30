import { Users, Target, Eye, Award, Rocket, Heart, Shield, Lightbulb } from "lucide-react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Uncompromising quality standards and structured delivery methodologies ensure consistently exceptional outcomes.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Embracing new technologies and creative solutions to solve complex business challenges.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Operating with the highest standards of professional conduct and corporate responsibility.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Building strategic partnerships with leading experts, certified trainers, and trusted partners.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Building enduring relationships grounded in professionalism and measurable outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Growth",
    description: "Enabling sustainable and measurable growth through skills transformation and digital adoption.",
  },
];

const team = [
  {
    name: "Ahmad Zakry Abadi Abu Bakar",
    role: "Director, Strategic Operations",
    bio: "Strong experience across IT systems development and infrastructure, business management, and organisational change management with training delivery.",
  },
  {
    name: "Ungku Badhrul Hisham Ungku Abdul Rahim",
    role: "Director, Sales & Marketing & Professional Trainer",
    bio: "Extensive experience in the banking and financial sector, complemented by strong expertise in professional training and sales and marketing.",
  },
  {
    name: "Diana Zainal",
    role: "Consultant, Financial & Business Planning",
    bio: "Experienced across various corporate sectors and industries, IT management and compliance, professional training, and sales and marketing.",
  },
  {
    name: "Hj Mohd Hanizam Abdul Aziz",
    role: "Consultant, Learning & Development",
    bio: "Professional business & financial consultant with extensive exposure to the corporate sector, finance, and business development.",
  },
  {
    name: "Mohd Albar Mohamed",
    role: "Consultant, Technology Solution",
    bio: "Solid experience in IT solutions and system development for both small-scale and enterprise-level environments.",
  },
];

export default function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Award,
      titleKey: "about.excellence",
      descriptionKey: "about.excellenceDesc",
    },
    {
      icon: Rocket,
      titleKey: "about.innovation",
      descriptionKey: "about.innovationDesc",
    },
    {
      icon: Heart,
      titleKey: "about.integrity",
      descriptionKey: "about.integrityDesc",
    },
    {
      icon: Users,
      titleKey: "about.collaboration",
      descriptionKey: "about.collaborationDesc",
    },
    {
      icon: Shield,
      titleKey: "about.trust",
      descriptionKey: "about.trustDesc",
    },
    {
      icon: Lightbulb,
      titleKey: "about.growth",
      descriptionKey: "about.growthDesc",
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
              {t('about.pageTitle')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t('about.pageSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('about.our')} <span className="text-gradient">{t('about.storyHighlight')}</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {t('about.storyContent1')}
                </p>
                <p>
                  {t('about.storyContent2')}
                </p>
                <p>
                  {t('about.storyContent3')}
                </p>
                <p>
                  {t('about.storyContent4')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-6 hover-lift">
                <div className="font-display text-3xl font-bold text-gradient mb-2">2025</div>
                <div className="text-sm text-muted-foreground">{t('about.founded')}</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover-lift">
                <div className="font-display text-3xl font-bold text-gradient mb-2">50+</div>
                <div className="text-sm text-muted-foreground">{t('stats.happyClients')}</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover-lift">
                <div className="font-display text-3xl font-bold text-gradient mb-2">150+</div>
                <div className="text-sm text-muted-foreground">{t('stats.projectsCompleted')}</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover-lift">
                <div className="font-display text-3xl font-bold text-gradient mb-2">5+</div>
                <div className="text-sm text-muted-foreground">{t('about.teamMembers')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300">
                  <Target className="text-primary-foreground" size={28} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{t('about.mission')}</h3>
                <p className="text-muted-foreground">
                  {t('about.missionContent')}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t('about.missionContent2')}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300">
                  <Eye className="text-accent-foreground" size={28} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{t('about.vision')}</h3>
                <p className="text-muted-foreground">
                  {t('about.visionContent')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('about.coreValues')} <span className="text-gradient">{t('about.valuesHighlight')}</span>
            </h2>
            <p className="text-muted-foreground">
              {t('about.valuesDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="group bg-card border-border hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <value.icon className="text-primary-foreground" size={28} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(value.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Temporarily Disabled */}
      {/*
      <section className="py-20 md:py-28 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground">
              The talented people behind Accenvix Solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-card border-border hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-display font-bold text-2xl">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      */}
    </Layout>
  );
}
