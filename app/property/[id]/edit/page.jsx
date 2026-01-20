import PropertyEditForm from '@/app/components/PropertyEditForm';
import connectDB from "@/config/db_config";
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/util/convertToObject';

const PropertyEditPage = async ({ params }) => {
    await connectDB();

    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializeableObject(propertyDoc);

    if (!property) {
        return (
            <h1 className='text-center'>
                Property Not Found
            </h1>
        );
    }

    return (
        <section className="bg-primary bg-opacity-10">
            <div className="container d-flex justify-content-center py-5">
                <div
                    className="bg-white shadow border rounded p-4 w-100"
                    style={{ maxWidth: "720px" }}
                >
                    <PropertyEditForm property={property} />
                </div>
            </div>
        </section>
    );
};

export default PropertyEditPage;