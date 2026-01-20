import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";

const PropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };
  console.log("Images", property);

  return (
     <div
      className="card border-0 shadow-lg position-relative overflow-hidden"
      style={{ borderRadius: "1rem" }}
    >
      {/* Property Image */}
      <Image
        src={property.images[0]}
        alt={property.name}
        width={0}
        height={0}
        sizes="100vw"
        className="card-img-top img-fluid"
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      />

      {/* Price Tag */}
      <h3
        className="position-absolute top-0 end-0 bg-white text-primary fw-semibold rounded-3 px-3 py-2 m-2 text-end"
        style={{ fontSize: "1rem" }}
      >
        {getRateDisplay()}
      </h3>

      <div className="card-body px-4 py-3">
        {/* Property Type & Name */}
        <div className="text-start text-md-center text-lg-start mb-3">
          <div className="text-secondary small">{property.type}</div>
          <h5 className="fw-bold mb-0">{property.name}</h5>
        </div>

        {/* Beds, Baths, Area */}
        <div className="d-flex justify-content-center gap-4 text-muted mb-3">
          <p className="mb-0">
            <FaBed className="me-1" />
            {property.beds} <span className="d-none d-lg-inline">Beds</span>
          </p>
          <p className="mb-0">
            <FaBath className="me-1" />
            {property.baths} <span className="d-none d-lg-inline">Baths</span>
          </p>
          <p className="mb-0">
            <FaRulerCombined className="me-1" />
            {property.square_feet} <span className="d-none d-lg-inline">sqft</span>
          </p>
        </div>

        {/* Rent Type */}
        <div className="d-flex justify-content-center gap-4 text-success small mb-3 fw-semibold">
          <p className="mb-0">
            <FaMoneyBill className="me-1" /> Weekly
          </p>
          <p className="mb-0">
            <FaMoneyBill className="me-1" /> Monthly
          </p>
        </div>

        <hr className="my-3 text-light" />

        {/* Location + Button */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center">
          <div className="d-flex align-items-center text-danger fw-semibold mb-3 mb-lg-0">
            <FaMapMarker className="me-2" />
            <span>
              {property.location.city}, {property.location.state}
            </span>
          </div>

          <Link
            href={`/property/${property._id}`}
            className="btn btn-primary btn-sm px-4 py-2 fw-semibold"
            style={{ backgroundColor: "#3B82F6", borderColor: "#3B82F6" }} // Tailwind blue-500
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
