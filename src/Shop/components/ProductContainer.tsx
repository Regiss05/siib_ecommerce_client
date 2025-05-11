import React, { useState } from "react";
import CountryFilter from "./CountryFilter";
import ProductsPage from "./ProductsPage";

export default function ProductContainer() {
  const [selectedCountry, setSelectedCountry] = useState<string>("All");

  return (
    <>
      <CountryFilter
        activeCountry={selectedCountry}
        onCountrySelect={setSelectedCountry}
      />
      <ProductsPage selectedCountry={selectedCountry} />
    </>
  );
}
