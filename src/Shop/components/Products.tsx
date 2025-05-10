import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Shop {
  country: string;
  // You can extend this with other fields if needed
}

export default function Products() {
  const { t } = useTranslation();
  const [activeButton, setActiveButton] = useState<string>("All");
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://localhost:8000/shops");
        const data = await response.json();
        if (data?.shops) {
          const uniqueCountries = [
            ...new Set(data.shops.map((shop: Shop) => shop.country)),
          ];
          setCountries(uniqueCountries);
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  const handleButtonClick = (country: string) => {
    setActiveButton(country);
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
            backgroundColor: activeButton === "All" ? "blue" : "#eeeeee",
            color: activeButton === "All" ? "white" : "#454545",
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
              backgroundColor: activeButton === country ? "blue" : "#eeeeee",
              color: activeButton === country ? "white" : "#454545",
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
