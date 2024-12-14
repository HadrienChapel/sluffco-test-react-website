import { useTranslation } from 'react-i18next';
import { Package2, Truck, CheckCircle2 } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { formatPrice } from '../../lib/utils';
import OrderDetails from './OrderDetails';

export default function OrderList() {
  const { t } = useTranslation();
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-100 rounded-lg h-32"
          />
        ))}
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-12">
        <Package2 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {t('profile.orders.empty')}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {t('profile.orders.emptyMessage')}
        </p>
      </div>
    );
  }

  const statusIcon = {
    pending: Package2,
    processing: Package2,
    shipped: Truck,
    delivered: CheckCircle2,
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  {t('profile.orders.orderId')}: {order.id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                {React.createElement(statusIcon[order.status], {
                  className: 'h-5 w-5 text-gray-400 mr-2',
                })}
                <span className="text-sm font-medium">
                  {t(`profile.orders.status.${order.status}`)}
                </span>
              </div>
            </div>

            <OrderDetails order={order} />

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm">
                {order.trackingNumber && (
                  <p>
                    {t('profile.orders.tracking')}:{' '}
                    <span className="font-medium">{order.trackingNumber}</span>
                  </p>
                )}
              </div>
              <p className="text-lg font-medium">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}