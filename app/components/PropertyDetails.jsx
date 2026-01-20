import {
  FaTimes,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheck,
  FaMapMarker,
} from 'react-icons/fa';

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="bg-white p-4 rounded shadow text-center text-md-start">
        <div className="text-secondary mb-3">{property.type}</div>

        <h1 className="fs-3 fw-bold mb-4">{property.name}</h1>

        <div className="text-secondary mb-4 d-flex align-items-center justify-content-center justify-content-md-start">
          <FaMapMarker className="text-warning me-1" />
          <p className="text-warning mb-0">
            {property.location.street} {property.location.city}{" "}
            {property.location.zipcode}
          </p>
        </div>

        <h3 className="fs-5 fw-bold my-4 bg-dark text-white p-2">
          Rates & Options
        </h3>

        <div className="d-flex flex-column flex-md-row justify-content-around">
          {/* Nightly */}
          <div className="d-flex align-items-center justify-content-center mb-4 border-bottom border-secondary-subtle pb-4 pb-md-0 border-md-0">
            <div className="text-secondary me-2 fw-bold">Nightly</div>
            <div className="fs-4 fw-bold text-primary">
              {property.rates.nightly ? (
                `$${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className="text-danger" />
              )}
            </div>
          </div>

          {/* Weekly */}
          <div className="d-flex align-items-center justify-content-center mb-4 border-bottom border-secondary-subtle pb-4 pb-md-0 border-md-0">
            <div className="text-secondary me-2 fw-bold">Weekly</div>
            <div className="fs-4 fw-bold text-primary">
              {property.rates.weekly ? (
                `$${property.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-danger" />
              )}
            </div>
          </div>

          {/* Monthly */}
          <div className="d-flex align-items-center justify-content-center mb-4 pb-4 pb-md-0">
            <div className="text-secondary me-2 fw-bold">Monthly</div>
            <div className="fs-4 fw-bold text-primary">
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-danger" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="fs-5 fw-bold mb-4">Description & Details</h3>

        <div className="d-flex justify-content-center gap-4 text-primary mb-4 fs-5 flex-wrap">
          <p className="mb-0">
            <FaBed className="me-2" /> {property.beds}
            <span className="d-none d-sm-inline"> Beds</span>
          </p>
          <p className="mb-0">
            <FaBath className="me-2" /> {property.baths}
            <span className="d-none d-sm-inline"> Baths</span>
          </p>
          <p className="mb-0">
            <FaRulerCombined className="me-2" />
            {property.square_feet}
            <span className="d-none d-sm-inline"> sqft</span>
          </p>
        </div>

        <p className="text-secondary mb-0">{property.description}</p>
      </div>

      {/* Amenities */}
      <div className="bg-white p-4 rounded shadow mt-4">
        <h3 className="fs-5 fw-bold mb-4">Amenities</h3>

        <ul className="row list-unstyled">
          {property.amenities.map((amenity, index) => (
            <li key={index} className="col-12 col-md-6 col-lg-4 mb-2">
              <FaCheck className="text-success me-2" />
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      
    </main>
  );
};

export default PropertyDetails;
