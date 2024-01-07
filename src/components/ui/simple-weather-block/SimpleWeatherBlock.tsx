import React from 'react';
import styles from './index.module.scss';
import { MeasurementType, WeatherData } from '@/types/weather.type';

interface SimpleWeatherBlockProps {
  weatherData: WeatherData;
  measurementType: MeasurementType;
}

const SimpleWeatherBlock: React.FC<SimpleWeatherBlockProps> = ({
  weatherData,
  measurementType,
}) => {
  return (
    <div className={styles.simpleWeatherBlock}>
      <div className={styles.simpleWeatherBlockChild}>
        <div>
          <h1 className={styles.currentTemperature}>
            {measurementType === MeasurementType.CELCIUS
              ? `${weatherData.current.temp_c} °C`
              : `${weatherData.current.temp_f} °F`}
          </h1>
          <p>{weatherData.current.condition.text}</p>
          <p className={styles.feelsLike}>
            Feels like
            {measurementType === MeasurementType.CELCIUS
              ? `${weatherData.current.feelslike_c} °C`
              : `${weatherData.current.feelslike_f} °F`}
          </p>
        </div>
      </div>
      <div>
        <h2 className={styles.locationName}> {weatherData.location.name} </h2>
        <p className={styles.regionText}> {weatherData.location.region} </p>
      </div>
    </div>
  );
};

export default SimpleWeatherBlock;
