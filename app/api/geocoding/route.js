import { NextResponse } from 'next/server';

const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `${GEOCODING_API_URL}?q=${query}&limit=5&appid=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch city suggestions');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching city suggestions' }, { status: 500 });
  }
}