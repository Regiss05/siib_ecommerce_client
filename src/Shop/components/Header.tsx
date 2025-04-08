import React, { CSSProperties, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { User } from "./Home";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import languageIcon from "../../imges/statics/language.svg";
import shopsloc from "../../imges/statics/shopsloc.svg";
import hand from "../../imges/statics/hand.svg";
import Box from "@mui/material/Box";
import locationshop from "../../imges/statics/locationshop.svg";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

interface HeaderProps {
  user: User | null;
  onSignIn: (user: User) => void; // ✅ Ensure this accepts a User
  onSignOut: () => void;
  setSearchQuery: (query: string) => void;
}

const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: "white",
  width: "80%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "gray",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    "&::placeholder": {
      color: "black",
    },
  },
}));

const headerStyle: CSSProperties = {
  color: "white",
  padding: "20px",
  borderBottomRightRadius: "30px",
  borderBottomLeftRadius: "30px",
};

function Header({ user, onSignIn, onSignOut, setSearchQuery }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize navigate

  // Load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser); // ✅ Ensure it matches the User type
        onSignIn(parsedUser); // ✅ Pass a valid User object
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [onSignIn]);
  

  const handleSignIn = () => {
    const userData: User = { uid: "12345", username: "testUser" }; // ✅ Replace with actual authentication logic
    onSignIn(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store user in localStorage
  };   

  const handleSignOut = () => {
    onSignOut();
    localStorage.removeItem("user"); // ✅ Remove user from localStorage
  };  

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang?: string) => {
    setAnchorEl(null);
    if (lang) i18n.changeLanguage(lang);
  };

  return (
    <header style={headerStyle} className="header">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
        <div>
          {user === null ? (
            <button className="signin" onClick={handleSignIn}>
              {t("signIn")}
            </button>
          ) : (
            <button className="signout" onClick={handleSignOut}>
              {t("signOut")}
            </button>
          )}
        </div>
        <img className="icohome" src={languageIcon} alt={t("language")} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ fontSize: "18px", color: "#eeecfe" }}>
          {t("hello")}, <img className="handico waving-hand" src={hand} alt="hand" />
          <div>
            {user === null ? (
              <div>{t("dear")}</div>
            ) : (
              <div className="userlogin">@{user.username}</div>
            )}
          </div>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <IconButton onClick={() => navigate("/CreateShop")} sx={{ padding: 0 }}>
            <img className="icohome" src={shopsloc} alt="shopsloc" />
          </IconButton>
          <img className="icohome" src={locationshop} alt="sort" />
        </Box>
      </Box>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase 
            placeholder={t("search")} 
            inputProps={{ "aria-label": "search" }} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
        <div>
          <Button
            sx={{ backgroundColor: "#eeecfe", color: "black", borderRadius: "10px", width: "30px" }}
            onClick={handleClick}
          >
            {i18n.language.toUpperCase()}
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
            <MenuItem onClick={() => handleClose("en")}>{t("english")}</MenuItem>
            <MenuItem onClick={() => handleClose("fr")}>{t("french")}</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
