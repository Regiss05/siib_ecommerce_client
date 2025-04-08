import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import useTranslation

export default function Products() {
  const { t } = useTranslation(); // Get translation function

  // State to track the active button
  const [activeButton, setActiveButton] = useState<string>("All");

  // Function to handle button click and set active button
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <Box sx={{ color: "gray", margin: "0 30px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ fontSize: "14px" }}>{t("products")}</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto", // Enable horizontal scrolling
          gap: "10px", // Space between buttons
          padding: "10px 0", // Padding around the button container
          flexWrap: "nowrap", // Prevent buttons from wrapping to the next line
        }}
      >
        {[
          { key: "all", label: t("all") },
          { key: "siibBurundi", label: t("siibBurundi") },
          { key: "siibTanzania", label: t("siibTanzania") },
          { key: "siibCongo", label: t("siibCongo") },
          { key: "siibRwanda", label: t("siibRwanda") },
          { key: "siibBenin", label: t("siibBenin") },
          { key: "siibSouthAfrica", label: t("siibSouthAfrica") },
          { key: "siibIvoryCost", label: t("siibIvoryCost") },
          { key: "others", label: t("others") },
        ].map(({ key, label }) => (
          <Button
            key={key}
            sx={{
              backgroundColor: activeButton === key ? "blue" : "#eeeeee",
              color: activeButton === key ? "white" : "#454545",
              borderRadius: "20px",
              whiteSpace: "nowrap",
              minWidth: "auto",
              padding: "5px 10px",
              fontSize: "11px",
            }}
            onClick={() => handleButtonClick(key)}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
