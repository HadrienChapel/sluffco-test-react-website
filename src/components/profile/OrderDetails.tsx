import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/useProducts';
import type { Order } from '../../types';
import { formatPrice } from '../../lib/utils';

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const { t } = useTranslation();
  const { data: products } = useProducts();

  return (
    <div className="space-y-4">
      {order.items.map((item) => {
        const product = products?.find((p) => p.id === item.productId);
        
        return (
          <div
            key={`${item.productId}-${item.color}-${item.size}`}
            className="flex items-center space-x-4"
          >
            {product && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            
            <div className="flex-1">
              <h4 className="font-medium">{product?.name}</h4>
              <p className="text-sm text-gray-500">
                {t('cart.color')}: {item.color}
                {item.size && ` | ${t('cart.size')}: ${item.size}`}
              </p>
              <p className="text-sm text-gray-500">
                {t('cart.quantity')}: {item.quantity} x {formatPrice(item.price)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}