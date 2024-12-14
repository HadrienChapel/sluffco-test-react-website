import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';
import type { User } from '../../types';
import UserInfoForm from './UserInfoForm';
import AddressList from './AddressList';

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {t('profile.info.personal')}
          </h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <Pencil className="h-5 w-5" />
            </button>
          )}
        </div>

        {isEditing ? (
          <UserInfoForm user={user} onSuccess={() => setIsEditing(false)} />
        ) : (
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t('profile.info.name')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                {t('profile.info.email')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
            </div>
            {user.phone && (
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  {t('profile.info.phone')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
              </div>
            )}
          </dl>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          {t('profile.info.addresses')}
        </h3>
        <AddressList />
      </div>
    </div>
  );
}