import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/app/components/PropertyCard'
import PropertySearchForm from '@/app/components/PropertySearchForm';
import connectDB from "@/config/db_config";
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/util/convertToObject';

const SearchResultsPage = async ({ searchParams }) => {
    await connectDB();

    const location = searchParams?.location ?? '';
    const propertyType = searchParams?.propertyType ?? 'All';

    let query = {};

    if (location.trim() !== '') {
        const locationPattern = new RegExp(location, 'i');
        query.$or = [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern },
        ];
    }

    if (propertyType !== 'All') {
        query.propertyType = new RegExp(`^${propertyType}$`, 'i');
    }

    const properties = (await Property.find(query).lean())
        .map(convertToSerializeableObject);

    console.log({ location, propertyType });
    console.log('Final Mongo Query:', JSON.stringify(query, null, 2));


    return (
        <>

            <section className="bg-primary py-4">
                <div className="container">
                    <PropertySearchForm />
                </div>
            </section>


            <section className="py-4">
                <div className="container-xl">
                    <Link
                        href="/property"
                        className="d-inline-flex align-items-center text-primary text-decoration-none mb-3"
                    >
                        <FaArrowAltCircleLeft className="me-2" /> Back To Properties
                    </Link>

                    <h1 className="fs-4 mb-4">Search Results</h1>

                    {properties.length === 0 ? (
                        <p>No search results found</p>
                    ) : (
                        <div className="row g-4">
                            {properties.map((property) => (
                                <div key={property._id} className="col-12 col-md-4">
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </>
    );
};
export default SearchResultsPage;