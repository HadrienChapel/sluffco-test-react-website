import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAddresses } from '../../hooks/useAddresses';
import type { Address, AddressFormData } from '../../types';
import AddressForm from './AddressForm';

export default function AddressList() {
  const { t } = useTranslation();
  const {
    addresses: { data: addresses },
    createAddress,
    updateAddress,
    deleteAddress,
    isLoading,
  } = useAddresses();

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSubmit = (data: AddressFormData) => {
    if (editingAddress) {
      updateAddress({ addressId: editingAddress.id, data });
      setEditingAddress(null);
    } else {
      createAddress(data);
      setIsAddingNew(false);
    }
  };

  if (!addresses?.length && !isAddingNew) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500 mb-4">{t('address.noAddresses')}</p>
        <button
          onClick={() => setIsAddingNew(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('address.addNew')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {addresses?.map((address) =>
        editingAddress?.id === address.id ? (
          <div key={address.id} className="bg-white p-6 rounded-lg shadow">
            <AddressForm
              address={address}
              onSubmit={handleSubmit}
              onCancel={() => setEditingAddress(null)}
              isSubmitting={isLoading}
            />
          </div>
        ) : (
          <div
            key={address.id}
            className="bg-white p-6 rounded-lg shadow flex justify-between items-start"
          >
            <div>
              <p className="font-medium">{address.street}</p>
              <p className="text-sm text-gray-500">
                {address.city}, {address.postalCode}
              </p>
              <p className="text-sm text-gray-500">{address.country}</p>
              {address.isDefault && (
                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {t('address.default')}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingAddress(address)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => deleteAddress(address.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )
      )}

      {isAddingNew && (
        <div className="bg-white p-6 rounded-lg shadow">
          <AddressForm
            onSubmit={handleSubmit}
            onCancel={() => setIsAddingNew(false)}
            isSubmitting={isLoading}
          />
        </div>
      )}

      {!isAddingNew && (
        <button
          onClick={() => setIsAddingNew(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('address.addNew')}
        </button>
      )}
    </div>
  );
}