'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
  loading: () => null,
});

export default function ChatWidgetLoader() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const idle =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (
            window as Window &
              typeof globalThis & {
                requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
              }
          ).requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 1500);

    const handle = idle(() => setShouldRender(true), { timeout: 3000 });

    return () => {
      if (
        typeof window !== 'undefined' &&
        'cancelIdleCallback' in window &&
        typeof handle === 'number'
      ) {
        (
          window as Window & typeof globalThis & { cancelIdleCallback: (h: number) => void }
        ).cancelIdleCallback(handle);
      } else {
        clearTimeout(handle as ReturnType<typeof setTimeout>);
      }
    };
  }, []);

  if (!shouldRender) return null;
  return <ChatWidget />;
}
