import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]);
}

export function useProductTracking(productId: string) {
  return {
    trackView: (product: {
      name: string;
      category: string;
      price: number;
    }) => {
      trackEvent('product_view', {
        product_id: productId,
        product_name: product.name,
        product_category: product.category,
        price: product.price,
      });
    },
    trackAddToCart: (product: {
      name: string;
      quantity: number;
      price: number;
    }) => {
      trackEvent('add_to_cart', {
        product_id: productId,
        product_name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
    },
  };
}