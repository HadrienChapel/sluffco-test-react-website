import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../lib/utils';

export default function Cart() {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity } = useCartStore();
  const { data: products } = useProducts();

  const cartItems = items.map((item) => ({
    ...item,
    product: products?.find((p) => p.id === item.productId),
  }));

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product?.price ?? 0) * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>{t('cart.empty')} - Sluff</title>
        </Helmet>

        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('cart.empty')}
          </h1>
          <p className="text-gray-600 mb-8">{t('cart.emptyMessage')}</p>
          <Link
            to="/products"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('cart.title')} - Sluff</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
                >
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {t('cart.color')}: {item.color}
                      {item.size && ` | ${t('cart.size')}: ${item.size}`}
                    </p>
                    <p className="font-medium">{formatPrice(item.product?.price ?? 0)}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                      className="rounded border-gray-300"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">{t('cart.summary')}</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t('cart.shipping')}</span>
                  <span>{shipping === 0 ? t('cart.free') : formatPrice(shipping)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>{t('cart.total')}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {/* Handle checkout */}}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  {t('cart.checkout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}