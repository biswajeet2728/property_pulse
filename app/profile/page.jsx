import Image from 'next/image';
import connectDB from "@/config/db_config";
import Property from '@/models/Property';
import { get_server_session } from '@/util/serverSession';
import profileDefault from '@/assets/images/profile.png';
import ProfileProperties from '../components/ProfileProperties';
import { convertToSerializeableObject } from '@/util/convertToObject';

const ProfilePage = async () => {
    await connectDB();

    const sessionUser = await get_server_session();

    const { userId } = sessionUser;

    if (!userId) {
        throw new Error('User ID is required');
    }

    console.log("username ", sessionUser.user);
    console.log("email", sessionUser.email);

    const propertiesDocs = await Property.find({ owner: userId }).lean();
    const properties = propertiesDocs.map(convertToSerializeableObject);

    

    return (
        <section style={{ backgroundColor: "#eff6ff" }}>
            <div className="container py-5">
                <div className="bg-white px-4 py-4 mb-4 shadow rounded border m-4 m-md-0">
                    <h1 className="fs-3 fw-bold mb-4">Your Profile</h1>

                    <div className="d-flex flex-column flex-md-row">
                        {/* LEFT SIDE */}
                        <div
                            className="mb-4 text-center text-md-start"
                            style={{
                                width: "100%",
                                maxWidth: "280px",
                                margin: "2.5rem auto 0",
                            }}
                        >
                            <div className="mb-3">
                                <Image
                                    src={sessionUser.user.image || profileDefault}
                                    width={160}
                                    height={160}
                                    alt="User"
                                    style={{
                                        width: "160px",
                                        height: "160px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>

                            <h4 className="fs-6 mb-2">
                                <span className="fw-bold d-block">Name:</span>
                                {sessionUser.user}
                            </h4>

                            <h4 className="fs-6">
                                <span className="fw-bold d-block">Email:</span>
                                {sessionUser.email}
                            </h4>
                        </div>

                        <div className="flex-grow-1 ps-md-4">
                            <h2 className="fs-5 fw-semibold mb-4">Your Listings</h2>

                            {properties.length === 0 ? (
                                <p>You have no property listings</p>
                            ) : (
                                <ProfileProperties properties={properties} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ProfilePage;