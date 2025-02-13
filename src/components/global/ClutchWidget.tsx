'use client';

import { useEffect, useState } from 'react';

export function ClutchWidget() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [widgetMounted, setWidgetMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://widget.clutch.co/static/js/widget.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Define types for CLUTCHCO
        interface ClutchWidget {
          Init: (params?: { url?: string }) => void;
        }
        
        interface Window {
          CLUTCHCO?: ClutchWidget;
        }

        // Now we can safely access CLUTCHCO with proper types
        const clutch = (window as Window).CLUTCHCO;
        if (clutch) {
          clutch.Init();
          setScriptLoaded(true);
        }
      };

      script.onerror = (e) => {
        console.error('Error loading Clutch script:', e);
        setError('Failed to load Clutch script');
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  useEffect(() => {
    if (!scriptLoaded) return;

    // Check if the widget container exists
    const widget = document.querySelector('.clutch-widget');
    if (!widget) {
      setError('Widget container not found');
      return;
    }

    // Set up mutation observer to detect widget content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setWidgetMounted(true);
          observer.disconnect();
        }
      });
    });

    observer.observe(widget, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [scriptLoaded]);

  return (
    <>
      <div
        className="clutch-widget"
        data-url="https://widget.clutch.co"
        data-widget-type="1"
        data-height="16"
        data-scale="80"
        data-nofollow="true"
        data-expandifr="true"
        data-clutchcompany-id="2004059"
      />
    </>
  );
}
