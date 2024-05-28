export type WeatherType = {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weathercode: number[];
};

export type AppType = {
  location: string;
  loading: boolean;
  displayLocation: string;
  weather?: WeatherType;
};
