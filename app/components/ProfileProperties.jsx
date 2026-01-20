'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';

const ProfileProperties = ({ properties: initialProperties }) => {
    const [properties, setProperties] = useState(initialProperties);

    const handleDeleteProperty = async (propertyId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this property?'
        );

        if (!confirmed) return;

        

        await deleteProperty(propertyId);

        // toast.success('Property Deleted');

        const updatedProperties = properties.filter(
            (property) => property._id !== propertyId
        );

        setProperties(updatedProperties);

    };
    

    return properties.map((property) => (
        <div key={property._id} className="mb-5">
            <Link href={`/property/${property._id}`}>
                <Image
                    src={property.images[0]}
                    alt=""
                    width={500}
                    height={100}
                    priority
                    className="w-100 rounded"
                    style={{
                        height: "128px",
                        objectFit: "cover",
                    }}
                />
            </Link>

            <div className="mt-2">
                <p className="fs-5 fw-semibold mb-1">{property.name}</p>
                <p className="text-secondary mb-0">
                    Address: {property.location.street}{" "}
                    {property.location.city} {property.location.state}
                </p>
            </div>

            <div className="mt-3">
                <Link
                    href={`/property/${property._id}/edit`}
                    className="btn btn-primary me-2"
                >
                    Edit
                </Link>

                <button
                    onClick={() => handleDeleteProperty(property._id)}
                    className="btn btn-danger"
                    type="button"
                >
                    Delete
                </button>
            </div>
        </div>

    ));
};

export default ProfileProperties;