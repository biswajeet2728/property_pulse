import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyAddForm from '@/app/components/PropertyAddForm';

const addPropertyPage = () => {
    return (
        <section className="bg-light">
            <div className="container py-5 d-flex justify-content-center">
                <div className="bg-white p-4 p-md-5 mb-4 shadow-sm rounded border w-100" style={{ maxWidth: "700px" }}>
                    <PropertyAddForm />
                </div>
            </div>
        </section>
    )
}

export default addPropertyPage;