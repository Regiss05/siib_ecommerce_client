import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
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

const categories = [
  { name: "houses", icon: house },
  { name: "cars", icon: shoes },
  { name: "clothes", icon: clothes },
  { name: "electronics", icon: electronics },
  { name: "accessories", icon: accessories },
  { name: "motorcycle", icon: motorcycle },
  { name: "tools", icon: tools },
  { name: "building materials", icon: building },
  { name: "cosmetics", icon: cosmetics },
  { name: "Kitchen and home", icon: kitchen },
  { name: "Games & Toys", icon: games },
];

export default function Cathegories({ onCategorySelect }: CathegoriesProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track selected category

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    onCategorySelect(categoryName);
    handleClose();
  };

  const renderCategoryButton = (category: { name: string; icon?: string }) => {
    const isAll = category.name === "All";
    const isSelected = selectedCategory === category.name;

    return (
      <Button
        key={category.name}
        sx={{
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          color: isAll
            ? isSelected
              ? "#362fff"
              : "gray"
            : "gray",
          textTransform: "capitalize",
          mx: 1,
        }}
        onClick={() => handleCategoryClick(category.name)}
      >
        {category.icon && (
          <img className="icocat" src={category.icon} alt={category.name} />
        )}
        <Typography
          sx={{
            fontSize: isAll ? "15px" : "10px", // font size set for All
            fontWeight: isAll && isSelected ? "bold" : "normal",
          }}
        >
          {t(category.name)}
        </Typography>
      </Button>
    );
  };

  return (
    <Box sx={{ margin: "13px 0 0 0", fontSize: "12px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          px: 2,
        }}
      >
        <Box sx={{ fontSize: "14px", color: "gray" }}>{t("categories")}</Box>
        <Box
          sx={{ fontSize: "14px", color: "#362fff", cursor: "pointer" }}
          onClick={handleOpen}
        >
          {t("See All")}
        </Box>
      </Box>

      {/* Grid for All + 10 categories */}
      <Box sx={{ overflow: "hidden", px: 0 }}>
        <Grid
          container
          spacing={1}
          sx={{
            margin: 0,
            padding: 0,
            width: "100%",
          }}
        >
          <Grid
            item
            xs={2.4}
            sx={{ display: "flex", justifyContent: "center", padding: 0 }}
          >
            {renderCategoryButton({ name: "All" })}
          </Grid>

          {categories.slice(0, 9).map((cat) => (
            <Grid
              item
              xs={2.4}
              key={cat.name}
              sx={{ display: "flex", justifyContent: "center", padding: 0 }}
            >
              {renderCategoryButton(cat)}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Full category popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>{t("All Categories")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {[{ name: "All" }, ...categories].map((cat) => (
              <Grid item xs={4} key={cat.name}>
                {renderCategoryButton(cat)}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
