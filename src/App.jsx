import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewPostPage from "./pages/ViewPostPage";
import SignUpPage from "./pages/SignUpPage";
import SignupSuccess from "./pages/SignupSuccess";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts/:id" element={<ViewPostPage />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
