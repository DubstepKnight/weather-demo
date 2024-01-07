import { WeatherData } from '@/types/weather.type';

/**
 * This file contains the request to the weather API
 * to get the current weather of a city
 * @param {string} query - can be a city name, a zip code or a lat/long coordinates
 */
export const getCurrentWeather = async (
  query: string,
): Promise<WeatherData> => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${
    import.meta.env.VITE_WEATHER_API_KEY
  }&q=${query}&aqi=no`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
