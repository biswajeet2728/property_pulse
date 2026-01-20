import connectDB from '@/config/db_config';
import Property from '@/models/Property';
import PropertyCard from './PropertyCard';
import Link from 'next/link';
const Home = async () => {
    
    await connectDB();
    const properties = await Property.find({}).sort({createdAt : -1}).limit(3).lean();
    
    const recentProperties = properties

    return (
        <>
            <section
                className="py-0 px-3"
                style={{ backgroundColor: "#f6f7f8ff" }} // Tailwind's bg-gray-50
            >
                <div className="container-xl container-lg mx-auto py-5 px-3">
                    <h2 className="fs-1 fw-bold text-primary mb-4 text-center">
                        Recent Properties
                    </h2>
                    {properties.length === 0 ? (
                        <p className="text-center text-muted mb-0">No properties</p>
                    ) : (
                        <div className="row g-4">
                            {recentProperties.map((property) => (
                                <div key={property._id} className="col-12 col-md-6 col-lg-4">
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className='mx-auto my-5 px-4' style={{ maxWidth: "32rem" }}>
                <Link href="/property" className='d-block fw-bold bg-primary text-white text-center py-3 px-4 rounded-4 text-decoration-none'>
                    View All Properties
                </Link>
            </section>

        </>
    )
}

export default Home;