import { useTranslation } from 'react-i18next';

export default function AuthDivider() {
  const { t } = useTranslation();
  
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">
          {t('auth.orContinueWith')}
        </span>
      </div>
    </div>
  );
}