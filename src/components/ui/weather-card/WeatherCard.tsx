import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '../card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Separator } from '@/components/ui/separator';
import styles from './index.module.scss';
import SimpleWeatherBlock from '../simple-weather-block/SimpleWeatherBlock';
import { MeasurementType, WeatherData } from '@/types/weather.type';
import DetailedWeatherBlock from '../detailed-weather-block/DetailedWeatherBlock';
import { Position } from '@/types/geo-data.type';

interface WeatherCardProps {
    weatherData: WeatherData | undefined;
    position: Position;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, position }) => {

  const [measurementType, setMeasurementType] = useState<MeasurementType>(MeasurementType.CELCIUS);

  const onToggleChangeHandler = (value: MeasurementType): void => {
    setMeasurementType(value);
  }

  // check if weatherData is empty
  if (Object.keys(weatherData || weatherData == undefined).length === 0) {
    return null;
  }

  if (weatherData) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <Card>
            <CardHeader className={styles.cardHeader} >
              <AccordionTrigger>
                <h1> Weather  </h1>
              </AccordionTrigger>
            </CardHeader>
            <CardContent className={styles.cardContent} >
              <ToggleGroup value={measurementType}  onValueChange={onToggleChangeHandler} type="single">
                <ToggleGroupItem value="celcius" defaultChecked aria-label="Toggle celcius">
                  <h1> ℃ </h1>
                </ToggleGroupItem>
                <ToggleGroupItem value="fahrenheit" aria-label="Toggle fahrenheit">
                  <h1> ℉ </h1>
                </ToggleGroupItem>
              </ToggleGroup>
              <SimpleWeatherBlock weatherData={weatherData} measurementType={measurementType} />
              <AccordionContent>
                <Separator className='my-4' />
                <DetailedWeatherBlock measurementType={measurementType} position={position} />
              </AccordionContent>
            </CardContent>
          </Card>
        </AccordionItem>
      </Accordion>
    )
  }
}

export default WeatherCard;