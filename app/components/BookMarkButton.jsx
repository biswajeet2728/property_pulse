'use client';
import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import bookmarkProperty from '../actions/bookMarkProperty';
import checkBookmarkStatus from '../actions/checkBookmarkStatus';
import { toast } from 'react-toastify';

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        checkBookmarkStatus(property._id).then((res) => {
            if (res.error) alert(res.error);
            if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
            setLoading(false);
        });
    }, [property._id, userId, checkBookmarkStatus]);

    const handleClick = async () => {
        if (!userId) {
            alert('You need to sign in to bookmark a property');
            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) return alert(res.error);
            setIsBookmarked(res.isBookmarked);
            alert(res.message);
        });
    };

    if (loading) return <p className='text-center'>Loading...</p>;

    return isBookmarked ? (
        <button
            onClick={handleClick}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
            style={{ borderRadius: "50px" }}
        >
            <FaBookmark className='mr-2' /> Remove Bookmark
        </button>
    ) : (
        <button
            onClick={handleClick}
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
            style={{ borderRadius: "50px" }}
        >
            <FaBookmark className='mr-2' /> Bookmark Property
        </button>
    );
};
export default BookmarkButton;