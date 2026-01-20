import "bootstrap/dist/css/bootstrap.min.css";
import addProperty from "../actions/AddProperty";

const PropertyAddForm = () => {
  return (
    <form className="container mt-0 mb-0" action={addProperty}>
      <h2 className="text-center fw-semibold mb-4">Add Property</h2>

      {/* Property Type */}
      <div className="mb-3">
        <label htmlFor="type" className="form-label fw-bold">
          Property Type
        </label>
        <select id="type" name="type" className="form-select" required>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Listing Name */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-bold">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="eg. Beautiful Apartment In Miami"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-bold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          rows="4"
          placeholder="Add an optional description of your property"
        ></textarea>
      </div>

      {/* Location */}
      <div className="mb-4 p-3 bg-light border rounded">
        <label className="form-label fw-bold">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="form-control mb-2"
          placeholder="Street"
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="form-control mb-2"
          placeholder="City"
          required
        />
        <input
          type="text"
          id="state"
          name="location.state"
          className="form-control mb-2"
          placeholder="State"
          required
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          className="form-control mb-2"
          placeholder="Zipcode"
        />
      </div>

      {/* Beds, Baths, Square Feet */}
      <div className="row mb-4">
        <div className="col-sm-4 mb-3 mb-sm-0">
          <label htmlFor="beds" className="form-label fw-bold">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            className="form-control"
            required
          />
        </div>
        <div className="col-sm-4 mb-3 mb-sm-0">
          <label htmlFor="baths" className="form-label fw-bold">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            className="form-control"
            required
          />
        </div>
        <div className="col-sm-4">
          <label htmlFor="square_feet" className="form-label fw-bold">
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            className="form-control"
            required
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <label className="form-label fw-bold">Amenities</label>
        <div className="row row-cols-2 row-cols-md-3 g-2">
          {[
            "Wifi",
            "Full kitchen",
            "Washer & Dryer",
            "Free Parking",
            "Swimming Pool",
            "Hot Tub",
            "24/7 Security",
            "Wheelchair Accessible",
            "Elevator Access",
            "Dishwasher",
            "Gym/Fitness Center",
            "Air Conditioning",
            "Balcony/Patio",
            "Smart TV",
            "Coffee Maker",
          ].map((amenity, i) => (
            <div className="form-check col" key={i}>
              <input
                type="checkbox"
                id={`amenity_${i}`}
                name="amenities"
                value={amenity}
                className="form-check-input"
              />
              <label htmlFor={`amenity_${i}`} className="form-check-label">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rates */}
      <div className="mb-4 p-3 bg-light border rounded">
        <label className="form-label fw-bold">
          Rates (Leave blank if not applicable)
        </label>
        <div className="row g-3">
          <div className="col-sm-4">
            <label htmlFor="weekly_rate" className="form-label">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="form-control"
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="monthly_rate" className="form-label">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="form-control"
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="nightly_rate" className="form-label">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              className="form-control"
            />
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="mb-3">
        <label htmlFor="seller_name" className="form-label fw-bold">
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          className="form-control"
          placeholder="Name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="seller_email" className="form-label fw-bold">
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          className="form-control"
          placeholder="Email address"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="seller_phone" className="form-label fw-bold">
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          className="form-control"
          placeholder="Phone"
        />
      </div>

      {/* Images */}
      <div className="mb-4">
        <label htmlFor="images" className="form-label fw-bold">
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="form-control"
          accept="image/*"
          multiple
          required
        />
      </div>

      {/* Submit */}
      <div className="d-grid">
        <button
          className="btn btn-primary fw-bold py-2 rounded-pill"
          type="submit"
        >
          Add Property
        </button>
      </div>
    </form>
  );
};

export default PropertyAddForm;
