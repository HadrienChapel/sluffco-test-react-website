import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SLUFF</h3>
            <p className="text-gray-400">
              Premium winter sports and lifestyle accessories
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('nav.products')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/products?category=beanie">{t('categories.beanie')}</Link>
              </li>
              <li>
                <Link to="/products?category=mask">{t('categories.mask')}</Link>
              </li>
              <li>
                <Link to="/products?category=sweater">{t('categories.sweater')}</Link>
              </li>
              <li>
                <Link to="/products?category=sunglasses">
                  {t('categories.sunglasses')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('nav.about')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sluff. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}