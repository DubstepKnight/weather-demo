import { WeatherForecast } from '@/types/weather.type';

/**
 * This file contains the request to the weather API
 * to get the current weather of a city
 * @param {string} query - can be a city name, a zip code or a lat/long coordinates
 */
export const getWeatherForecast = async (
  query: string,
): Promise<WeatherForecast> => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${
    import.meta.env.VITE_WEATHER_API_KEY
  }&q=${query}&aqi=no&days=1&alerts=no`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
