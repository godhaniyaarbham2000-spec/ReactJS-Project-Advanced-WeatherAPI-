import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);

    try {
      const geoResponse = await fetch(
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
          encodeURIComponent(city) +
          "&count=1"
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        onSearch(city, { error: "City not found" });
        setLoading(false);
        return;
      }

      const place = geoData.results[0];
      const latitude = place.latitude;
      const longitude = place.longitude;
      const name = place.name;
      const country = place.country;

      const weatherResponse = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=" +
          latitude +
          "&longitude=" +
          longitude +
          "&current_weather=true&daily=temperature_2m_min,temperature_2m_max&hourly=relativehumidity_2m&timezone=auto"
      );
      const weatherData = await weatherResponse.json();

      const payload = {
        temp: weatherData.current_weather
          ? weatherData.current_weather.temperature
          : null,
        humidity: weatherData.hourly
          ? weatherData.hourly.relativehumidity_2m[0]
          : null,
        dailyMin: weatherData.daily
          ? weatherData.daily.temperature_2m_min[0]
          : null,
        dailyMax: weatherData.daily
          ? weatherData.daily.temperature_2m_max[0]
          : null,
        resolvedName: name,
        country: country,
      };

      onSearch(name + ", " + country, payload);
    } catch {
      onSearch(city, { error: "Failed to fetch weather data" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 4,
      }}
    >
      <TextField
        label="Enter City Name"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{ width: "100%", maxWidth: 500 }}
      />
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={fetchWeather}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </Button>
    </Box>
  );
}