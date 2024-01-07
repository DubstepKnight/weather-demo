import React, {  useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  GoogleMap,
  Libraries,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api';
import styles from './styles.module.scss';
import { getCurrentWeather } from '@/lib/requests/get_weather';
import WeatherCard from '@/components/ui/weather-card/WeatherCard';
import { WeatherData } from '@/types/weather.type';
import { LocationData, Position } from '@/types/geo-data.type';
import User from '@/types/user.type';
import LocationSearchDialog from '@/components/ui/location-search-dialog/LocationSearchDialog';
import WeatherCardSkeleton from '@/components/ui/weather-card/WeatherCardSkeleton';
import { Header } from '@/components/ui/header/header';
import { toast } from 'sonner';

function IndexPage(): React.ReactElement {
  const user = useLoaderData() as User;

  const libraries = useRef<Libraries>(['places']);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_ACCESS_API_KEY!,
    libraries: libraries.current,
  });

  const [position, setPosition] = useState<Position>({
    lat: 60.12,
    lng: 24.24,
  });
  const [address, setAddress] = useState<string>('Current location');
  const [currentWeather, setCurrentWeather] = useState<WeatherData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const makeCalls = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const pos: LocationData = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const currentPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setPosition(currentPosition);

        const curWeather = await getCurrentWeather(
          `${currentPosition.lat}, ${currentPosition.lng}`,
        );
        setCurrentWeather(curWeather);
      } catch (error) {
        toast('Error getting current location');
      }
      setIsLoading(false);
    };

    makeCalls();
  }, []);

  useEffect((): void => {
    const updateCurrentWeather = async (): Promise<void> => {
      const curWeather = await getCurrentWeather(
        `${position.lat}, ${position.lng}`,
      );
      setCurrentWeather(curWeather);
    };
    updateCurrentWeather();
  }, [position]);

  const onClickHandler = (): void => {
    setIsDialogOpen(!isDialogOpen);
  };

  if (!isLoaded) {
    return <div> Loading </div>;
  }

  return (
    <section className={styles.mainBlock}>
      <div className={styles.hoveringElements}>
        <Header user={user} onClick={onClickHandler} address={address} />
        {isLoaded && (
          <LocationSearchDialog
            setAddress={setAddress}
            setPosition={setPosition}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}
        {isLoading && <WeatherCardSkeleton />}
        {!isLoading && (
          <WeatherCard weatherData={currentWeather} position={position} />
        )}
      </div>
      <GoogleMap
        zoom={12}
        center={position}
        mapContainerClassName={styles.mapContainer}
      >
        <MarkerF position={position} />
      </GoogleMap>
    </section>
  );
}

export default IndexPage;
