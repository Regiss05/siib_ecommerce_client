import React from "react";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import clothes from "../../imges/statics/clothes.svg";
import electronics from "../../imges/statics/electronics.svg";
import shoes from "../../imges/statics/shoes.svg";
import house from "../../imges/statics/house.svg";

interface CathegoriesProps {
  onCategorySelect: (category: string) => void;
}

export default function Cathegories({ onCategorySelect }: CathegoriesProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ margin: "5px 20px", fontSize: "12px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
        <Box sx={{ fontSize: "14px", color: "gray" }}>{t("categories")}</Box>
        {/* <Button sx={{ color: "#362FFF", fontWeight: "bold" }} onClick={() => onCategorySelect("All")}>
          {t("seeAll")}
        </Button> */}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", color: "gray" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button sx={{color: "#362fff", fontWeight: "bold"}} onClick={() => onCategorySelect("All")}>All</Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button onClick={() => onCategorySelect("house")}>
            <img className="icocat" src={house} alt="House" />
          </Button>
          {t("house")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button onClick={() => onCategorySelect("car")}>
            <img className="icocat" src={shoes} alt="Car" />
          </Button>
          {t("car")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button onClick={() => onCategorySelect("clothe")}>
            <img className="icocat" src={clothes} alt="Clothe" />
          </Button>
          {t("clothe")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button onClick={() => onCategorySelect("electronic")}>
            <img className="icocat" src={electronics} alt="Electronic" />
          </Button>
          {t("electronic")}
        </Box>
      </Box>
    </Box>
  );
}
