'use client';
import { useState , useEffect} from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '../actions/markMessageAsRead';
import deleteMessage from '../actions/deleteMessage';
import { useGlobalContext } from '@/context/GlobalContext';

const MessageCard = ({ message }) => {
    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);

    const { setUnreadCount } = useGlobalContext();

    const [clientDate, setClientDate] = useState("");

    useEffect(() => {
        setClientDate(new Date(message.createdAt).toLocaleString());
    }, [message.createdAt]);


    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id);
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        alert(`Marked as ${read ? 'read' : 'new'}`);
    };

    const handleDeleteClick = async () => {
        await deleteMessage(message._id);
        setIsDeleted(true);
        setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
        alert('Message Deleted');
    };

    if (isDeleted) {
        return <p>Deleted message</p>;
    }

    return (
        <div className="position-relative bg-white p-3 rounded shadow border border-secondary-subtle">
            {!isRead && (
                <div className="position-absolute top-0 end-0 mt-2 me-2 bg-warning text-white px-2 py-1 rounded">
                    New
                </div>
            )}

            <h2 className="fs-4 mb-4">
                <span className="fw-bold">Property Inquiry:</span>{" "}
                {message.property.name}
            </h2>

            <p className="text-secondary">{message.body}</p>

            <ul className="mt-4">
                <li>
                    <strong>Reply Email:</strong>{" "}
                    <a href={`mailto:${message.email}`} className="text-primary">
                        {message.email}
                    </a>
                </li>
                <li>
                    <strong>Reply Phone:</strong>{" "}
                    <a href={`tel:${message.phone}`} className="text-primary">
                        {message.phone}
                    </a>
                </li>
                <li>
                    <strong>Received:</strong>{" "}
                    {clientDate}
                </li>
            </ul>

            <button
                onClick={handleReadClick}
                className={`mt-3 me-3 btn ${isRead ? "btn-secondary" : "btn-primary"
                    } btn-sm`}
            >
                {isRead ? "Mark As New" : "Mark As Read"}
            </button>

            <button
                onClick={handleDeleteClick}
                className="mt-3 btn btn-danger btn-sm"
            >
                Delete
            </button>
        </div>

    );
};

export default MessageCard;