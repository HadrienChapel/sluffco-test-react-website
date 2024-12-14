import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { formatPrice } from '../../lib/utils';

interface ProductInfoProps {
  product: Product;
  selectedColor: string | undefined;
  selectedSize: string | undefined;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
}

export default function ProductInfo({
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  onAddToCart,
}: ProductInfoProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 lg:mt-0">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-4 text-2xl font-medium">{formatPrice(product.price)}</p>

      <div className="mt-8">
        <h2 className="text-sm font-medium text-gray-900">
          {t('product.description')}
        </h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-medium text-gray-900">{t('product.color')}</h2>
        <div className="mt-2 flex space-x-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-8 h-8 rounded-full ${
                selectedColor === color ? 'ring-2 ring-black ring-offset-2' : ''
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {product.sizes && (
        <div className="mt-8">
          <h2 className="text-sm font-medium text-gray-900">{t('product.size')}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => onSizeChange(size)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onAddToCart}
        disabled={!selectedColor}
        className="mt-8 w-full bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>{t('product.addToCart')}</span>
      </button>
    </div>
  );
}