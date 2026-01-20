"use client"

import PropertySearchForm from "./PropertySearchForm";

const Hero = () => {
    return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        backgroundColor: "#3b67f9ff", // blue background
        minHeight: "60vh",
        color: "white",
        padding: "3rem 1rem",
      }}
    >
      <h1 className="fw-bold display-5 mb-3">
        Find The Perfect Rental
      </h1>
      <p className="mb-4 fs-5">
        Discover the perfect property that suits your needs.
      </p>
      
      <PropertySearchForm/>
      
    </div>
  );
}

export default Hero;