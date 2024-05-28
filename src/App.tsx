import { Component } from "react";
import Weather from "./components/Weather";
import { AppType } from "./model";

class App extends Component<{}, AppType> {
  constructor(props: {}) {
    super(props);

    this.state = {
      location: localStorage.getItem("location") ?? "",
      loading: false,
      displayLocation: "",
    };
  }

  handleGetLocation = (location: string) => {
    this.setState({ location });
  };

  handleGetWeather = async () => {
    if (this.state.location.length < 2) {
      this.setState({ weather: undefined });
      return;
    }

    try {
      this.setState({ loading: true });

      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");
      const { latitude, longitude, timezone, name, country } =
        geoData.results.at(0);

      this.setState({
        displayLocation: `${name} ${country}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    if (this.state.location) this.handleGetWeather();
  }

  componentDidUpdate(_prevProps: Readonly<{}>, prevState: Readonly<AppType>) {
    if (this.state.location !== prevState.location) {
      this.handleGetWeather();
      localStorage.setItem("location", this.state.location);
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search from location..."
            value={this.state.location}
            onChange={(e) => this.handleGetLocation(e.target.value)}
          />
        </div>

        {this.state.loading && <div className="loader">Loading...</div>}
        {this.state.weather && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
