import 'bootstrap/dist/css/bootstrap.min.css';
import connectDB from '@/config/db_config';
import Property from '@/models/Property';
import PropertyHeaderImage from '@/app/components/PropertyHeaderImage';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyDetails from '@/app/components/PropertyDetails';
import PropertyImages from '@/app/components/PropertyImages';
import { convertToSerializeableObject } from '@/util/convertToObject';
import PropertyContactForm from '@/app/components/PropertyContactForm';
import BookmarkButton from '@/app/components/BookMarkButton';


const furthur = async ({ params }) => {

    await connectDB();

    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializeableObject(propertyDoc);

    if(!propertyDoc){
        return (<h1 className='text-center'>Property Not Found</h1>)
    }

    return (
        <>
            <PropertyHeaderImage image={property.images[0]} />
            <section>
                <div className="container mx-auto py-4 px-4">
                    <Link href="/property" className="text-primary text-decoration-none d-flex align-items-center">
                        <FaArrowLeft className="me-2" /> Back to properties
                    </Link>
                </div>
            </section>
            <section className="bg-info">
                <div className="container mx-auto py-5 px-4">
                    <div className="row w-100 g-4 align-items-start">
                        <div className="col-12 col-md-8">
                            <PropertyDetails property={property}/>
                        </div>
                        <div className="col-12 col-md-4">
                            <BookmarkButton property={property}/>
                            <PropertyContactForm property={property}/>
                        </div>
                    </div>
                </div>
            </section>
            <PropertyImages images={property.images}/>
        </>
    )
}

export default furthur;