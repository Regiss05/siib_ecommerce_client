import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Import images as default imports
import Slide1 from "../../imges/statics/commerce.png";
import Slide2 from "../../imges/statics/bank.png";
import Slide3 from "../../imges/statics/dapps.png";
import Slide4 from "../../imges/statics/articles.png";

const images = [
  // {
  //   label: "Image 1",
  //   src: Slide1,
  //   buttonLabel: "Create Account",
  //   position: { bottom: "15%", left: "27%" },
  // },
  {
    label: "Image 2",
    src: Slide2,
    buttonLabel: "Create Shop",
    position: { bottom: "15%", left: "32%" },
  },
  {
    label: "Image 3",
    src: Slide3,
    buttonLabel: "Apps",
    position: { bottom: "15%", left: "26%" },
  },
  {
    label: "Image 4",
    src: Slide4,
    buttonLabel: "More...",
    position: { bottom: "15%", left: "28%" },
  },
];

export default function ImageSlider() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
    }, 5000);
    return () => clearInterval(interval);
  }, [maxSteps]);

  // Button click handler
  const handleButtonClick = (label) => {
    if (label === "Create Account") {
      window.open("https://bank.siibarnut.com/", "_blank");
    } else if (label === "Create Shop") {
      navigate("/CreateShop");
    }else if (label === "Apps") {
      navigate("/");
    }else if (label === "More...") {
      navigate("/cart");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, flexGrow: 1, margin: 0, textAlign: "center" }}>
      <h4 className="cardforyou">#highlights</h4>

      <Box sx={{ position: "relative", margin: "10px 0" }}>
        <SwipeableViews index={activeStep} onChangeIndex={setActiveStep} enableMouseEvents>
          {images.map((step, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              {Math.abs(activeStep - index) <= 2 ? (
                <>
                  <img
                    src={step.src}
                    alt={step.label}
                    style={{ width: "90%", height: "auto", borderRadius: "10px" }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      position: "absolute",
                      bottom: step.position.bottom,
                      left: step.position.left,
                      transform: "translateX(-50%)",
                      backgroundColor: "orange",
                      color: "white",
                      borderRadius: "5px",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#e69500" },
                    }}
                    onClick={() => handleButtonClick(step.buttonLabel)}
                  >
                    {step.buttonLabel}
                  </Button>
                </>
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      </Box>
    </Box>
  );
}
