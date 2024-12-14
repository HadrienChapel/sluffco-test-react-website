import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('about.title')} - Sluff</title>
        <meta
          name="description"
          content="Learn about Sluff's mission and commitment to quality winter sports accessories."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('about.title')}</h1>
          
          <div className="prose prose-lg">
            <p className="mb-6">
              {t('about.description')}
            </p>

            <div className="my-12">
              <img
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256"
                alt="Winter sports"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h2>
            <p className="mb-6">
              {t('about.mission.description')}
            </p>

            <h2 className="text-2xl font-bold mb-4">{t('about.values.title')}</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>{t('about.values.quality')}</li>
              <li>{t('about.values.sustainability')}</li>
              <li>{t('about.values.innovation')}</li>
              <li>{t('about.values.community')}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}