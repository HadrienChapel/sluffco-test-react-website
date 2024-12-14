import { useTranslation } from 'react-i18next';
import { Apple, Chrome } from 'lucide-react';
import { isMobile } from '../../lib/utils';

interface SocialAuthButtonsProps {
  onGoogleAuth: () => void;
  onAppleAuth: () => void;
}

export default function SocialAuthButtons({
  onGoogleAuth,
  onAppleAuth,
}: SocialAuthButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <button
        onClick={onGoogleAuth}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <Chrome className="h-5 w-5" />
        <span>{t('auth.continueWithGoogle')}</span>
      </button>

      {isMobile() && (
        <button
          onClick={onAppleAuth}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-black text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <Apple className="h-5 w-5" />
          <span>{t('auth.continueWithApple')}</span>
        </button>
      )}
    </div>
  );
}