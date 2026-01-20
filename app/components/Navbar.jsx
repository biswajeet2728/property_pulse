"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect } from "react";
import UnreadMessageCount from "./UnreadMessageCount";

const Navbar = () => {

  const pathName = usePathname();

  const { data: session } = useSession();
  console.log(session);

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const setAuthprovider = async () => {
      const resp = await getProviders();
      setProviders(resp);

    }
    setAuthprovider();
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary border-bottom border-info py-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <IoHomeSharp className="fs-3 me-2" />
          <span className="fw-bold fs-4">PropertyPulse</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item m-2">
              <Link className={`${pathName === '/' ? 'btn-dark text-white ' : ''}btn btn-outline-dark rounded px-3 p-2`} href="/">
                Home
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link className={`${pathName === '/property' ? 'btn-dark text-white ' : ''}btn btn-outline-dark rounded px-3 p-2`} href="/property">
                Properties
              </Link>
            </li>
            <li className="nav-item m-2">
              {
                session && (
                  <Link className={`${pathName === '/property/add' ? 'btn-dark text-white ' : ''}btn btn-outline-dark rounded px-3 p-2`} href="/property/add">
                    Add Property
                  </Link>
                )}
            </li>
          </ul>

          {/* Right side menu (Logged Out) */}
          {
            !session && (
              <div className="d-flex align-items-center me-3">
                {providers && Object.values(providers).map((provider, index) => (
                  <button
                    key={index}
                    className="btn btn-dark d-flex align-items-center"
                    onClick={() => signIn(provider.id)}
                  >
                    <FaGoogle className="me-1" />
                    Login or Register
                  </button>
                ))}
              </div>
            )}

          {/* Right side menu (Logged In) */}
          {
            session && (
              <div className="dropdown p-1">
                <button
                  className="btn btn-dark d-flex align-items-center justify-content-center rounded-circle p-2"
                  type="button"
                  id="userMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <CgProfile className="fs-4" />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow"
                  aria-labelledby="userMenuButton"
                >
                  <li>
                    <Link className="dropdown-item" href="/profile">
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/property/saved">
                      Saved Properties
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => signOut()}>Sign Out</button>
                  </li>
                </ul>
              </div>
            )}

          {/* Notification Bell */}
          {
            session && (
              <div className="position-relative p-1">
                <button
                  type="button"
                  className="btn btn-dark position-relative rounded-circle p-2"
                >
                  <Link href="/messages"><IoNotifications className="fs-4" /></Link>
                  <UnreadMessageCount/>
                </button>
              </div>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
