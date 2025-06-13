import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import SignUpPage from "./pages/SignUpPage";
import SignupSuccess from "./pages/SignupSuccess";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

// LayoutWrapper: เป็นตัวครอบทุกหน้า และกำหนดว่าจะโชว์ NavBar / Footer หรือไม่
function LayoutWrapper({ children }) {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // กำหนด path ที่ "ไม่ต้องแสดง NavBar"
    const noNavBarPaths = [];

    // กำหนด path ที่ "ไม่ต้องแสดง Footer"
    const noFooterPaths = ["/signup", "/signup-success", "/login"];

    setShowNavBar(!noNavBarPaths.includes(location.pathname));
    setShowFooter(!noFooterPaths.includes(location.pathname));
  }, [location.pathname]);

  return (
    <>
      {showNavBar && <NavBar />}

      <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="font-[Poppins]">
      <Router>
      <AuthProvider>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/posts/:id" element={<ViewPostPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signup-success" element={<SignupSuccess />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </LayoutWrapper>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
