import PropertyCard from '@/app/components/PropertyCard';
import connectDB from '@/config/db_config';
import User from '@/models/User';
import { get_server_session } from '@/util/serverSession';

const SavedPropertiesPage = async () => {
    await connectDB();

    const sessionUser = await get_server_session();

    const { userId } = sessionUser;


    const user = await User.findById(userId)
        .populate('bookmark')
        .lean();

    const bookmarks = user?.bookmark || [];

    return (
        <section className="px-3 py-4">
            <div className="container-xl mx-auto px-3 py-4">
                <h1 className="fs-4 mb-3">Saved Properties</h1>

                {bookmarks.length === 0 ? (
                    <p>No saved properties</p>
                ) : (
                    <div className="row g-3">
                        {bookmarks.map((property) => (
                            <div key={property._id} className="col-12 col-md-4">
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
export default SavedPropertiesPage;