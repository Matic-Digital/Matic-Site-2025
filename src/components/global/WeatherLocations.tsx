'use client';

import { useEffect, useState } from 'react';

interface LocationWeather {
  name: string;
  temp: number;
  time: string;
}

export function WeatherLocations() {
  const [locations, setLocations] = useState<LocationWeather[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Data is already formatted from the API
        setLocations(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (locations.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col gap-2 md:flex-row md:gap-8">
      <p className="text-sm text-maticblack/70">Locations</p>
      <div className="flex flex-wrap gap-4 md:gap-8">
        {locations.map((location, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-[#076EFF]" style={{ fontSize: '2.25rem', fontWeight: 300, lineHeight: '140%' }}>{location.temp}°</p>
            <p className="text-sm text-maticblack">{location.time}</p>
            <p className="text-sm text-maticblack">{location.name}</p>
            {location.name === 'Amsterdam Office' && (
              <p className="text-sm text-maticblack/70">Opens summer 2026</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
