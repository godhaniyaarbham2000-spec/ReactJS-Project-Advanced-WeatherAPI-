import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = useState(null);
  const [data, setData] = useState(null);

  const handleSearch = (cityName, weatherData) => {
    setCity(cityName);
    setData(weatherData);
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Weather App 🌦
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <WeatherCard city={city} data={data} />
    </Container>
  );
}