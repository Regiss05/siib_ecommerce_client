import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Shop {
  country: string;
}

interface Props {
  activeCountry: string;
  onCountrySelect: (country: string) => void;
}

export default function CountryFilter({ activeCountry, onCountrySelect }: Props) {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("https://eserver.siibarnut.com/shops");
        const data = await response.json();
        if (data?.shops) {
          // Ensure uniqueness by using a Set, and then convert it back to an array
          const uniqueCountries = [...new Set(data.shops.map((shop: Shop) => shop.country))];
          setCountries(uniqueCountries);
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleButtonClick = (country: string) => {
    onCountrySelect(country);
  };

  return (
    <Box sx={{ color: "gray", margin: "0 30px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ fontSize: "14px" }}>{t("products")}</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          padding: "10px 0",
          flexWrap: "nowrap",
        }}
      >
        <Button
          sx={{
            backgroundColor: activeCountry === "All" ? "blue" : "#eeeeee",
            color: activeCountry === "All" ? "white" : "#454545",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            minWidth: "auto",
            padding: "5px 10px",
            fontSize: "11px",
          }}
          onClick={() => handleButtonClick("All")}
        >
          {t("all")}
        </Button>
        {countries.map((country) => (
          <Button
            key={country}
            sx={{
              backgroundColor: activeCountry === country ? "blue" : "#eeeeee",
              color: activeCountry === country ? "white" : "#454545",
              borderRadius: "20px",
              whiteSpace: "nowrap",
              minWidth: "auto",
              padding: "5px 10px",
              fontSize: "11px",
            }}
            onClick={() => handleButtonClick(country)}
          >
            {country}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
