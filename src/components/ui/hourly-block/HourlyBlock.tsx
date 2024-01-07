import React from 'react';
import { HourlyInfo, MeasurementType } from '@/types/weather.type';
import styles from './index.module.scss';

interface HourlyBlockProps {
  hourlyInfo: HourlyInfo;
  measurementType: MeasurementType;
}

const HourlyBlock: React.FC<HourlyBlockProps> = ({
  hourlyInfo,
  measurementType,
}) => {
  return (
    <div className={styles.hourlyInfoBlock}>
      <p> {hourlyInfo.time.substring(10)} </p>
      <img
        className={styles.hourlyImage}
        src={hourlyInfo.condition.icon}
        alt={hourlyInfo.condition.text}
      />
      <p>
        {measurementType === MeasurementType.CELCIUS
          ? `${hourlyInfo.temp_c} °C`
          : `${hourlyInfo.temp_f} °F`}
      </p>
    </div>
  );
};

export default HourlyBlock;
