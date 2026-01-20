'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PropertySearchForm = () => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('All');

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (location === '' && propertyType === 'All') {
            router.push('/property');
        } else {
            const query = `?location=${location}&propertyType=${propertyType}`;

            router.push(`/property/search-results${query}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="d-flex flex-column flex-md-row gap-2 justify-content-center mt-3 mx-auto"
            style={{ maxWidth: "720px" }}
        >
          
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Location (City, State, Zip, etc)"
                style={{ maxWidth: "350px", borderRadius: "10px" }}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

          
            <select
                className="form-select form-select-lg"
                style={{ maxWidth: "150px", borderRadius: "10px" }}
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Cabin Or Cottage">Cabin or Cottage</option>
                <option value="Loft">Loft</option>
                <option value="Room">Room</option>
                <option value="Other">Other</option>
            </select>

            {/* Search Button */}
            <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{
                    backgroundColor: "#073be5ff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.6rem 1.5rem",
                }}
            >
                Search
            </button>
        </form>


    );
};

export default PropertySearchForm;