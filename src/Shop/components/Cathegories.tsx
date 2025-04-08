import React from "react";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import useTranslation
import clothes from "../../imges/statics/clothes.svg";
import electronics from "../../imges/statics/electronics.svg";
import shoes from "../../imges/statics/shoes.svg";
import house from "../../imges/statics/house.svg";

export default function Cathegories() {
  const { t } = useTranslation(); // Get translation function

  return (
    <Box sx={{ margin: "5px 20px", fontSize: "12px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ fontSize: "14px", color: "gray" }}>{t("categories")}</Box>
        <Button sx={{ color: "#362FFF", fontWeight: "bold" }}>{t("seeAll")}</Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", color: "gray" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button><img className="icocat" src={house} alt="House" /></Button>
          {t("houses")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button><img className="icocat" src={shoes} alt="Cars" /></Button>
          {t("cars")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button><img className="icocat" src={clothes} alt="Clothes" /></Button>
          {t("clothes")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button><img className="icocat" src={electronics} alt="Electronics" /></Button>
          {t("electronics")}
        </Box>
      </Box>
    </Box>
  );
}
