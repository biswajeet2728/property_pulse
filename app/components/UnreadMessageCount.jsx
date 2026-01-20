'use client';
import { useGlobalContext } from "@/context/GlobalContext";

const UnreadMessageCount = () => {
    const { unreadCount } = useGlobalContext();

    return unreadCount > 0 ? (
        <span
            className="position-absolute top-0 end-0 d-inline-flex align-items-center justify-content-center px-2 py-1 fs-6 fw-bold text-white bg-danger rounded-pill"
            style={{ transform: "translate(50%, -50%)" }}
        >
            {unreadCount}
        </span>
    ) : null;
};
export default UnreadMessageCount;