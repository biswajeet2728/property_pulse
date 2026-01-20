import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyCard from '../components/PropertyCard';
import connectDB from '@/config/db_config';
import Property from '@/models/Property';

const PropertyPage = async () => {

    await connectDB();
    const properties = await Property.find({}).lean();

    return (

        <section
            className="py-3 px-3"
            style={{ backgroundColor: "#f9fafb" }} 
        >
            <div className="container-xl container-lg mx-auto py-5 px-3">
                {properties.length === 0 ? (
                    <p className="text-center text-muted mb-0">No properties</p>
                ) : (
                    <div className="row g-4">
                        {properties.map((property) => (
                            <div key={property._id} className="col-12 col-md-6 col-lg-4">
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>

    )
}

export default PropertyPage;