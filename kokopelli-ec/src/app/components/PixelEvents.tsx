'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function PixelEvents() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.fbq?.('track', 'ViewContent', {
      content_category: 'product_lp',
      content_name: 'kokopelli_silica_mineral',
    });
    window.gtag?.('event', 'view_lp', {
      lp_variant: 'kokopelli_v16',
    });
  }, []);

  return null;
}
