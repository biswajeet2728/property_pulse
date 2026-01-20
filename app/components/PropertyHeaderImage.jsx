import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
    return (
        <section>
            <div className="container-xl mx-auto pt-4">
                <div className="row">
                    <div className="col-12">
                        <Image
                            src={image}
                            alt=""
                            className="img-fluid object-fit-cover"
                            style={{ height: "400px", width: "100%" }}
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                    </div>
                </div>
            </div>
        </section>


    )
}

export default PropertyHeaderImage;