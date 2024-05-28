import { Component } from "react";
import { formatDay, getWeatherIcon } from "../util";

type DayProps = {
  date: string;
  max: number;
  min: number;
  code: number;
  isToday: boolean;
};

class Day extends Component<DayProps> {
  render() {
    const { date, max, min, code, isToday } = this.props;

    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; {Math.ceil(max)}&deg;
        </p>
      </li>
    );
  }
}

export default Day;
