export type Position = {
  lat: number;
  lng: number;
};

type Coordinates = {
  accuracy: number;
  altitude: null | number;
  altitudeAccuracy: null | number;
  heading: null | number;
  latitude: number;
  longitude: number;
  speed: null | number;
};

export type LocationData = {
  coords: Coordinates;
  timestamp: number;
};
