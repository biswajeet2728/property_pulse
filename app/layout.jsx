import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthProvider";
import { GlobalProvider } from "@/context/GlobalContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ children }) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html>
                    <body>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    )
}

export default Layout;