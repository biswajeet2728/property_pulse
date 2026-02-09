'use client';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useActionState } from "react";
import { useSession } from 'next-auth/react';
// import { toast } from 'react-toastify';
import addMessage from '@/app/actions/addMessage';
import SubmitMessageButton from './SubmitMessageButton';

const PropertyContactForm = ({ property }) => {
    const { data: session } = useSession();

    const [state, setState] = useState({ submitted: false, error: null });

    useEffect(() => {
        if (state.error) alert(state.error);
        if (state.submitted) alert('Message sent successfully');
    }, [state]);

    if (!session) return null;

    if (!property || !property._id || !property.owner) {
        return <p>Loading property details…</p>;
    }

    if (state.submitted) {
        return (
            <p className='text-green-500 mb-4'>
                Your message has been sent successfully
            </p>
        );
    }

    return (
        session && (
            <div className="bg-white p-4 mt-4 rounded shadow">
                <h3 className="fs-5 fw-bold mb-4">Contact Property Manager</h3>

                <form action={formAction}>
                    <input type="hidden" name="property" value={property._id} />
                    <input type="hidden" name="recipient" value={property.owner} />

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label fw-bold">
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            className="form-control"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="body" className="form-label fw-bold">
                            Message
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            rows="6"
                            className="form-control"
                            placeholder="Enter your message"
                        ></textarea>
                    </div>

                    <SubmitMessageButton />
                </form>
            </div>

        )
    );
};
export default PropertyContactForm;