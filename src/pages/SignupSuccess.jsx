import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

export default function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <>
    <NavBar/>
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7f3]">
      <div className="bg-white px-10 py-12 rounded-lg shadow-md text-center w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">✓</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-[#26221f] mb-6">
          Registration success
        </h2>
        <button
          className="bg-black text-white rounded-full px-6 py-2"
          onClick={() => navigate("/login")}
        >
          Continue
        </button>
      </div>
    </div>
    </>
  );
}
