'use client';
import { useEffect } from 'react';

export default function ClutchWidget() {
  useEffect(() => {
    // Load Clutch script
    const script = document.createElement('script');
    script.src = 'https://widget.clutch.co/static/js/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="clutch-widget"
      data-url="https://widget.clutch.co"
      data-widget-type="2"
      data-height="auto"
      data-nofollow="true"
      data-expandifr="true"
      data-clutchcompany-id="2004059"
    />
  );
}
