import connectDB from '@/config/db_config';
import Message from '@/models/Message';
import MessageCard from '../components/MessageCard';
import '@/models/Property';
import { convertToSerializeableObject } from '@/util/convertToObject';
import { get_server_session } from '@/util/serverSession';

const MessagePage = async () => {
    await connectDB();

    const sessionUser = await get_server_session();

    const { userId } = sessionUser;
    console.log(userId);

    const readMessages = await Message.find({ recipient: userId, read: true })
        .sort({ createdAt: -1 }) // Sort read messages in asc order
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    const unreadMessages = await Message.find({
        recipient: userId,
        read: false,
    })
        .sort({ createdAt: -1 }) // Sort read messages in asc order
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean();

    // Convert to serializable object so we can pass to client component.
    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
        const message = convertToSerializeableObject(messageDoc);
        message.sender = convertToSerializeableObject(messageDoc.sender);
        message.property = convertToSerializeableObject(messageDoc.property);
        return message;
    });

    return (
        <section className="bg-light">
            <div className="container py-5" style={{ maxWidth: "72rem" }}>
                <div className="bg-white px-4 py-4 mb-4 shadow rounded border m-3 m-md-0">
                    <h1 className="fs-3 fw-bold mb-4">Your Messages</h1>

                    <div className="d-flex flex-column gap-3">
                        {messages.length === 0 ? (
                            <p className="mb-0">You have no messages</p>
                        ) : (
                            messages.map((message) => (
                                <MessageCard key={message._id} message={message} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>

    );
};
export default MessagePage;