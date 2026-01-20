"use Client"
import React from "react";
import { IoHomeSharp } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-8 px-6">

            <hr className="my-6 border-gray-700" />
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <IoHomeSharp className="fs-3"/>
                    </div>
                    <div className="col-5">
                        <p className="text-sm fw-bold">
                            © {new Date().getFullYear()} PropertyPulse. All rights reserved.
                        </p>
                    </div>
                    <div className="col">
                       <p className="text-sm fw-bold">
                           Properties Terms of Services.
                        </p>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
