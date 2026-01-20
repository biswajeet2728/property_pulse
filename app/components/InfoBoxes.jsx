"use client";
import Link from "next/link";

const InfoBoxes = () => {
    const card_first = {
        title: "For Renters",
        description: "Find your dream rental property. Bookmark properties and contact owners",
        button: "Browse Properties"
    };

    const card_second = {
        title: "For Property Owners",
        description: "List your properties and reach potential tenants. Rent as an Airbnb or long term",
        button: "Add Property"
    };

    return (
        <div className="container my-4">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card h-100 text-bg-secondary">
                        <div className="card-body">
                            <h5 className="card-title">{card_first.title}</h5>
                            <p className="card-text">{card_first.description}</p>
                            <Link href='/property' className="btn btn-primary" >{card_first.button}</Link>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100 text-bg-info">
                        <div className="card-body">
                            <h5 className="card-title">{card_second.title}</h5>
                            <p className="card-text">{card_second.description}</p>
                            <Link href='/property/add' className="btn btn-primary">{card_second.button}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoBoxes;
