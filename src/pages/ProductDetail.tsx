import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/useCartStore';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import RelatedProducts from '../components/product/RelatedProducts';
import { formatPrice } from '../lib/utils';

export default function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: products } = useProducts();
  const addItem = useCartStore((state) => state.addItem);

  const product = products?.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{t('product.notFound')}</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedColor) {
      addItem({
        productId: product.id,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - Sluff</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          
          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
            onAddToCart={handleAddToCart}
          />
        </div>

        <RelatedProducts
          currentProduct={product}
          products={products?.filter(
            (p) => p.category === product.category && p.id !== product.id
          )}
        />
      </div>
    </>
  );
}