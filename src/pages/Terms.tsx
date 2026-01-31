import { Layout } from "@/components/layout";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('terms.pageTitle')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('terms.pageSubtitle')}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.acceptance.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.acceptance.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.services.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.services.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.intellectualProperty.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.intellectualProperty.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.userResponsibilities.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.userResponsibilities.content')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>{t('terms.userResponsibilities.point1')}</li>
                <li>{t('terms.userResponsibilities.point2')}</li>
                <li>{t('terms.userResponsibilities.point3')}</li>
                <li>{t('terms.userResponsibilities.point4')}</li>
              </ul>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.limitation.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.limitation.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.thirdParty.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.thirdParty.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.termination.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.termination.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.governingLaw.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.governingLaw.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.changes.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.changes.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('terms.contact.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('terms.contact.content')}
              </p>
              <p className="text-muted-foreground">
                {t('terms.contact.email')}{' '}
                <a href="mailto:legal@accenvix.com" className="text-primary hover:underline">
                  legal@accenvix.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}