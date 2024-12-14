import { config } from '../config';

type EventName = 
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase';

type EventProperties = {
  page_view: {
    page_path: string;
    page_title: string;
  };
  product_view: {
    product_id: string;
    product_name: string;
    product_category: string;
    price: number;
  };
  add_to_cart: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  };
  remove_from_cart: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  };
  begin_checkout: {
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  };
  purchase: {
    transaction_id: string;
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  };
};

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParameters: any
    ) => void;
  }
}

export function trackEvent<T extends EventName>(
  eventName: T,
  properties: EventProperties[T]
) {
  if (!config.analytics.enabled || !window.gtag) {
    if (config.env === 'development') {
      console.log('Analytics event:', eventName, properties);
    }
    return;
  }

  window.gtag('event', eventName, properties);
}

export function initializeAnalytics() {
  if (!config.analytics.enabled || !config.analytics.id) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', config.analytics.id);
}