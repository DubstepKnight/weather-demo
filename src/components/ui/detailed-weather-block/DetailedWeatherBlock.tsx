import React, { useEffect, useState } from 'react';
import { getWeatherForecast } from '@/lib/requests/get_weather_forecast';
import {
  ForecastDay,
  MeasurementType,
  WeatherForecast,
} from '@/types/weather.type';
import styles from './index.module.scss';
import { Position } from '@/types/geo-data.type';
import HourlyBlock from '../hourly-block/HourlyBlock';
import { clamp } from '@/lib/utils';
import { Separator } from '../separator';
import { toast } from 'sonner';

interface DetailedWeatherBlockProps {
  measurementType: MeasurementType;
  position: Position;
}

const DetailedWeatherBlock: React.FC<DetailedWeatherBlockProps> = ({
  measurementType,
  position,
}) => {
  const [forecast, setForecast] = useState<ForecastDay>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [correctWidth, setCorrectWidth] = useState<number>(520);

  useEffect(() => {
    const fetchForecast = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const wthrForecast: WeatherForecast = await getWeatherForecast(
          `${position.lat}, ${position.lng}`
        );
        setForecast(wthrForecast.forecast.forecastday[0]);
      } catch (error) {
        toast('Error getting forecast');
      }
      setIsLoading(false);
    };
    fetchForecast();
  }, [position]);

  useEffect(() => {
    const handleWindowResize = (): void => {
      if (card) {
        setCorrectWidth(clamp(card.offsetWidth - 32, 320, 524));
      }
    };

    const card = document.querySelector('div[data-orientation="vertical"]') as HTMLElement;

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (forecast && !isLoading) {
    return (
      <div className={styles.detailedWeatherBlock}>
        <div className={styles.generalInfoRow}>
          <div className={styles.generalInfoBlock}>
            <h1> Temperature </h1>
            <span>
              <p> Max </p>
              <h2>
                {measurementType === MeasurementType.CELCIUS
                  ? `${forecast.day.maxtemp_c} °C`
                  : `${forecast.day.maxtemp_f} °F`}
              </h2>
            </span>
            <span>
              <p> Avg </p>
              <h2> 
                {measurementType === MeasurementType.CELCIUS
                  ? `${forecast.day.avgtemp_c} °C`
                  : `${forecast.day.avgtemp_f} °F`}
              </h2>
            </span>
            <span>
              <p> Min </p>
              <h2> 
                {measurementType === MeasurementType.CELCIUS
                  ? `${forecast.day.mintemp_c} °C`
                  : `${forecast.day.mintemp_f} °F`}
              </h2>
            </span>
          </div>
          <div className={styles.generalInfoBlock}>
            <h1> Precipitation </h1>
            <span>
              <p> Total </p>
              <h2> {measurementType === MeasurementType.CELCIUS
                ? `${forecast.day.totalprecip_mm} mm`
                : `${forecast.day.totalprecip_in} in`} </h2>
            </span>
            <span>
              <p> Total Snow </p>
              <h2> {forecast.day.totalsnow_cm} </h2>
            </span>
          </div>
          <div className={styles.generalInfoBlock}>
            <h1> Misc </h1>
            <span>
              <p> Wind Max </p>
              <h2> {measurementType === MeasurementType.CELCIUS
                ? `${forecast.day.maxwind_kph} k/h`
                : `${forecast.day.maxwind_mph} m/h`} </h2>
            </span>
            <span>
              <p> Avg hum </p>
              <h2> {forecast.day.avghumidity} </h2>
            </span>
            <span>
              <p> Avg vis </p>
              <h2> {measurementType === MeasurementType.CELCIUS
                ? `${forecast.day.avgvis_km} °C`
                : `${forecast.day.avgvis_miles} °F`} </h2>
            </span>
            <span>
              <p> UV </p>
              <h2> {forecast.day.uv} </h2>
            </span>
          </div>
        </div>
        <Separator className="my-4" />
        <div
          className={styles.hourlyInfoRow}
          style={{ width: `${correctWidth}px` }}
        >
          {forecast.hour.map((hour, index) => {
            return <HourlyBlock hourlyInfo={hour} measurementType={measurementType} key={index} />;
          })}
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default DetailedWeatherBlock;
