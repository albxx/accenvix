import { Layout } from "@/components/layout";
import { useTranslation } from "react-i18next";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('privacy.pageTitle')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('privacy.pageSubtitle')}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.informationCollection.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.informationCollection.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.howWeUse.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.howWeUse.content')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>{t('privacy.howWeUse.point1')}</li>
                <li>{t('privacy.howWeUse.point2')}</li>
                <li>{t('privacy.howWeUse.point3')}</li>
                <li>{t('privacy.howWeUse.point4')}</li>
                <li>{t('privacy.howWeUse.point5')}</li>
              </ul>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.cookies.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.cookies.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.dataProtection.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.dataProtection.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.thirdParties.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.thirdParties.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.retention.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.retention.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.rights.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.rights.content')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>{t('privacy.rights.point1')}</li>
                <li>{t('privacy.rights.point2')}</li>
                <li>{t('privacy.rights.point3')}</li>
                <li>{t('privacy.rights.point4')}</li>
              </ul>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.children.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.children.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.changes.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.changes.content')}
              </p>

              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                {t('privacy.contact.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('privacy.contact.content')}
              </p>
              <p className="text-muted-foreground">
                {t('privacy.contact.email')}{' '}
                <a href="mailto:privacy@accenvix.com" className="text-primary hover:underline">
                  privacy@accenvix.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}