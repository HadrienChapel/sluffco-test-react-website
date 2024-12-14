import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Sluff - Premium Winter Sports Accessories</title>
        <meta name="description" content="Discover our premium collection of winter sports accessories including beanies, ski masks, sweaters, and sunglasses." />
      </Helmet>

      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[70vh]">
          <img
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256"
            alt="Winter sports"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                SLUFF
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Premium Winter Sports Accessories
              </p>
              <Link
                to="/products"
                className="inline-flex items-center bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                {t('nav.products')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('home.categories')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['beanie', 'mask', 'sweater', 'sunglasses'].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    {
                      beanie: '1576871409226-d3a15396ee4b',
                      mask: '1551698618-1dfe5d97d256',
                      sweater: '1578587018452-892bacefd3f2',
                      sunglasses: '1577803645773-f96470509666',
                    }[category]
                  }`}
                  alt={t(`categories.${category}`)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {t(`categories.${category}`)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}