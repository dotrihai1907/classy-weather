import { Component } from "react";
import { WeatherType } from "../model";
import Day from "./Day";

type WeatherProps = {
  weather: WeatherType;
  location: string;
};

class Weather extends Component<WeatherProps> {
  render() {
    const {
      time: dates,
      temperature_2m_max: max,
      temperature_2m_min: min,
      weathercode: codes,
    } = this.props.weather;

    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              key={date}
              date={date}
              max={max[i]}
              min={min[i]}
              code={codes[i]}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Weather;
