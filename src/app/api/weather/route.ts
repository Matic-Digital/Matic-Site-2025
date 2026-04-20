import { NextResponse } from 'next/server';

export async function GET() {
  const locations = [
    { 
      name: 'Denver HQ', 
      url: 'https://api.open-meteo.com/v1/forecast?latitude=39.74&longitude=-104.98&current_weather=true&temperature_unit=fahrenheit&timezone=America/Denver',
      timezone: 'America/Denver'
    },
    { 
      name: 'Seattle Office', 
      url: 'https://api.open-meteo.com/v1/forecast?latitude=47.61&longitude=-122.33&current_weather=true&temperature_unit=fahrenheit&timezone=America/Los_Angeles',
      timezone: 'America/Los_Angeles'
    },
    { 
      name: 'Amsterdam Office', 
      url: 'https://api.open-meteo.com/v1/forecast?latitude=52.37&longitude=4.90&current_weather=true&temperature_unit=fahrenheit&timezone=Europe/Amsterdam',
      timezone: 'Europe/Amsterdam'
    }
  ];

  try {
    const weatherPromises = locations.map(async (loc) => {
      const response = await fetch(loc.url);
      const data = await response.json();
      
      // Use current time and format it in the correct timezone
      const timeString = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: loc.timezone
      });
      
      return {
        name: loc.name,
        temp: Math.round(data.current_weather.temperature),
        time: timeString
      };
    });

    const results = await Promise.all(weatherPromises);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
