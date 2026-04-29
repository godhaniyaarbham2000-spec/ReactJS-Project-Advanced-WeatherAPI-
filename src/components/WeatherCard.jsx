import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import OpacityIcon from "@mui/icons-material/Opacity";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import summerImage from "../assets/images/summer.jpg"
import winterImage from "../assets/images/winter.jpg"
import rainImage from "../assets/images/rain.jpg"

function pickImage(temp, humidity) {
  
  if (humidity && temp && humidity >= 85 && temp > 5) {
    return rainImage; 
  }
  
  else if (temp <= 12) {
    return winterImage; 
  }
  
  else {
    return summerImage;
  }
}

export default function WeatherCard({ city, data }) {
  if (!data) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h6" color="text.secondary">
          🔍 Search for a city to view weather
        </Typography>
      </Box>
    );
  }

  if (data.error) {
    return (
      <Card sx={{ borderRadius: 2, textAlign: "center", padding: 4 }}>
        <ErrorOutlineIcon sx={{ fontSize: 40, color: "warning.main" }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {data.error}
        </Typography>
      </Card>
    );
  }

  const img = pickImage(data.temp, data.humidity);

  return (
    <Card sx={{ borderRadius: 2, overflow: "hidden", mt: 4 }}>
      <CardMedia component="img" height="200" image={img} alt="Weather" />
      <CardContent>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h4">{city}</Typography>
          {data.humidity >= 85 && data.temp >5 ? (
            <OpacityIcon sx={{ fontSize: 32, color: "#0077b6" }} />
          ) : data.temp <= 12 ? (
            <AcUnitIcon sx={{ fontSize: 32, color: "#00b4d8" }} />
          ) : (
            <WbSunnyIcon sx={{ fontSize: 32, color: "orange" }} />
          )}
        </Box>

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h6">
            Temperature: {data.temp ? data.temp + "°C" : "N/A"}
          </Typography>
          <Typography>
            Humidity: {data.humidity ? data.humidity + "%" : "N/A"}
          </Typography>
          <Typography>
            Min Temp: {data.dailyMin ? data.dailyMin + "°C" : "N/A"}
          </Typography>
          <Typography>
            Max Temp: {data.dailyMax ? data.dailyMax + "°C" : "N/A"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ArrowUpwardIcon />
            <Typography>
              {data.dailyMax ? data.dailyMax + "°C" : "—"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ArrowDownwardIcon />
            <Typography>
              {data.dailyMin ? data.dailyMin + "°C" : "—"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}   