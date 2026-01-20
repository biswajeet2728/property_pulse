import updateProperty from "../actions/updateProperty";

const PropertyEditForm = ({ property }) => {
  
  const updatePropertyById = updateProperty.bind(null , property._id);
  
  return (
    <form action={updatePropertyById}>
      <h2 className="fs-3 text-center fw-semibold mb-4">Edit Property</h2>

      {/* Property Type */}
      <div className="mb-3">
        <label htmlFor="type" className="form-label fw-bold">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          className="form-select"
          defaultValue={property.type}
          required
        >
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
        <label className="form-label fw-bold">Listing Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          defaultValue={property.name}
          placeholder="eg. Beautiful Apartment In Miami"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label fw-bold">Description</label>
        <textarea
          name="description"
          rows="4"
          className="form-control"
          defaultValue={property.description}
        />
      </div>

      {/* Location */}
      <div className="mb-4 p-3 bg-primary bg-opacity-10 rounded">
        <label className="form-label fw-bold">Location</label>
        <input className="form-control mb-2" name="location.street" defaultValue={property.location.street} placeholder="Street" />
        <input className="form-control mb-2" name="location.city" defaultValue={property.location.city} placeholder="City" required />
        <input className="form-control mb-2" name="location.state" defaultValue={property.location.state} placeholder="State" required />
        <input className="form-control" name="location.zipcode" defaultValue={property.location.zipcode} placeholder="Zipcode" />
      </div>

      {/* Beds / Baths / Sqft */}
      <div className="row mb-3">
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Beds</label>
          <input name="beds" type="number" className="form-control" defaultValue={property.beds} required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Baths</label>
          <input name="baths" type="number" className="form-control" defaultValue={property.baths} required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Square Feet</label>
          <input name="square_feet" type="number" className="form-control" defaultValue={property.square_feet} required />
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <label className="form-label fw-bold">Amenities</label>
        <div className="row">
          {property.amenities.map((amenity) => (
            <div className="col-md-4 col-6" key={amenity}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  defaultChecked={property.amenities.includes(amenity)}
                />
                <label className="form-check-label">{amenity}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rates */}
      <div className="mb-4 p-3 bg-primary bg-opacity-10 rounded">
        <label className="form-label fw-bold">Rates</label>
        <div className="row">
          <div className="col-md-4 mb-2">
            <input className="form-control" name="rates.weekly" defaultValue={property.rates.weekly} placeholder="Weekly" />
          </div>
          <div className="col-md-4 mb-2">
            <input className="form-control" name="rates.monthly" defaultValue={property.rates.monthly} placeholder="Monthly" />
          </div>
          <div className="col-md-4 mb-2">
            <input className="form-control" name="rates.nightly" defaultValue={property.rates.nightly} placeholder="Nightly" />
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="mb-3">
        <label className="form-label fw-bold">Seller Name</label>
        <input name="seller_info.name" className="form-control" defaultValue={property.seller_info.name} />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Seller Email</label>
        <input name="seller_info.email" type="email" className="form-control" defaultValue={property.seller_info.email} required />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Seller Phone</label>
        <input name="seller_info.phone" className="form-control" defaultValue={property.seller_info.phone} />
      </div>

      <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold">
        Update Property
      </button>
    </form>

  );
};

export default PropertyEditForm;
