import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import clothes from "../../imges/statics/clothes.svg";
import electronics from "../../imges/statics/electronics.svg";
import shoes from "../../imges/statics/shoes.svg";
import house from "../../imges/statics/house.svg";
import accessories from "../../imges/statics/accessories.svg";
import motorcycle from "../../imges/statics/motorcycle.svg";
import tools from "../../imges/statics/tools.svg";
import building from "../../imges/statics/building.svg";
import cosmetics from "../../imges/statics/cosmetics.svg";
import kitchen from "../../imges/statics/kitchen.svg";
import games from "../../imges/statics/games.svg";

interface CathegoriesProps {
  onCategorySelect: (category: string) => void;
}

export default function Cathegories({ onCategorySelect }: CathegoriesProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ margin: "0px 20px", fontSize: "12px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", marginBottom: "10px" }}>
        <Box sx={{ fontSize: "14px", color: "gray" }}>{t("categories")}</Box>
        {/* <Button sx={{ color: "#362FFF", fontWeight: "bold" }} onClick={() => onCategorySelect("All")}>
          {t("seeAll")}
        </Button> */}
      </Box>
      <Box>
        <Box sx={{ display: "flex", gap: "10px", color: "gray" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
              <Button sx={{ color: "#362fff", fontWeight: "bold" }} onClick={() => onCategorySelect("All")}>All</Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize" }} onClick={() => onCategorySelect("houses")}>
                <img className="icocat" src={house} alt="Houses" />
                <Typography sx={{ fontSize: "10px" }}>{t("houses")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize" }} onClick={() => onCategorySelect("cars")}>
                <img className="icocat" src={shoes} alt="cars" />
                <Typography sx={{ fontSize: "10px" }}>{t("cars")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize" }} onClick={() => onCategorySelect("clothes")}>
                <img className="icocat" src={clothes} alt="Clothes" />
                <Typography sx={{ fontSize: "10px" }}>{t("clothes")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize" }} onClick={() => onCategorySelect("electronics")}>
                <img className="icocat" src={electronics} alt="electronics" />
                <Typography sx={{ fontSize: "10px" }}>{t("electronics")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize" }} onClick={() => onCategorySelect("accessories")}>
                <img className="icocat" src={accessories} alt="accessories" />
                <Typography sx={{ fontSize: "10px" }}>{t("accessories")}</Typography>
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize", marginTop: "-17px" }} onClick={() => onCategorySelect("motorcycle")}>
                <img className="icocat" src={motorcycle} alt="motorcycle" />
                <Typography sx={{ fontSize: "10px" }}>{t("motorcycles")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize", marginTop: "-17px" }} onClick={() => onCategorySelect("tools")}>
                <img className="icocat" src={tools} alt="tools" />
                <Typography sx={{ fontSize: "10px" }}>{t("tools")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize" }} onClick={() => onCategorySelect("building materials")}>
                <img className="icocat" src={building} alt="Building materials" />
                <Typography sx={{ fontSize: "10px" }}>{t("Building materials")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize", marginTop: "-17px" }} onClick={() => onCategorySelect("cosmetics")}>
                <img className="icocat" src={cosmetics} alt="cosmetics" />
                <Typography sx={{ fontSize: "10px" }}>{t("cosmetics")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize" }} onClick={() => onCategorySelect("Kitchen and home")}>
                <img className="icocat" src={kitchen} alt="kitchen" />
                <Typography sx={{ fontSize: "10px" }}>{t("Kitchen and home")}</Typography>
              </Button>
              <Button sx={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", color: "gray", textTransform: "capitalize" }} onClick={() => onCategorySelect("Games & Toys")}>
                <img className="icocat" src={games} alt="Games & Toys" />
                <Typography sx={{ fontSize: "10px" }}>{t("Games & Toys")}</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
