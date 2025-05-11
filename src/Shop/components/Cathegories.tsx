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
          <Button onClick={() => onCategorySelect("houses")}>
            <img className="icocat" src={house} alt="House" />
          </Button>
          {t("houses")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button onClick={() => onCategorySelect("cars")}>
            <img className="icocat" src={shoes} alt="Cars" />
          </Button>
          {t("cars")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button onClick={() => onCategorySelect("clothes")}>
            <img className="icocat" src={clothes} alt="Clothes" />
          </Button>
          {t("clothes")}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Button onClick={() => onCategorySelect("electronics")}>
            <img className="icocat" src={electronics} alt="Electronics" />
          </Button>
          {t("electronics")}
        </Box>
      </Box>
    </Box>
  );
}
