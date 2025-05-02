import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [shopId, setShopId] = useState(""); // ✅ New state for shop selection
  const [shops, setShops] = useState([]); // ✅ Stores available shops
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8000/shops")
      .then((res) => setShops(res.data.shops))
      .catch((error) => console.error("Error fetching shops:", error));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!imageFile) return alert("Please select an image.");
    if (!shopId) return alert("Please select a shop.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("availableStock", availableStock);
    formData.append("shopId", shopId);
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:8000/products/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setAvailableStock("");
        setShopId("");
        setImageFile(null);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="form-container">
      <h3>Add Product</h3>
      <div className="form-content-silver">
        <form className="form-det" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Name"
              multiline
              maxRows={4}
              value={name} onChange={(e) => setName(e.target.value)} required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              value={description} onChange={(e) => setDescription(e.target.value)} required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Category"
              multiline
              maxRows={4}
              value={category} onChange={(e) => setCategory(e.target.value)} required
            />
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">Pi</InputAdornment>}
              label="Amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Available Stock"
              type="number"
              multiline
              maxRows={4}
              value={availableStock} onChange={(e) => setAvailableStock(e.target.value)} required
            />
          </FormControl>
          <select className="selectform" value={shopId} onChange={(e) => setShopId(e.target.value)} required>
            <option value="">Select a Shop</option>
            {shops.map((shop) => (
              // @ts-ignore
              <option key={shop._id} value={shop._id}>{shop.shopName}</option>
            ))}
          </select>

          <input type="file" accept="image/*" onChange={handleFileChange} required />
          <button className="btn-product" type="submit">Add Product</button>
        </form>
        <ToastContainer /> {/* This will render the toast notifications */}
      </div>
    </div>
  );
};

export default AddItem;
