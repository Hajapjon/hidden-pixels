import { useNavigate } from "react-router-dom";

export default function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <>
    <div className="min-h-screen flex items-start justify-center bg-[#F9F8F6] mt-[60px] lg:mt-[80px] pt-12">
      <div className="bg-[#EFEEEB] px-10 py-12 rounded-lg shadow-md text-center w-full max-w-3xl">
        <div className="flex justify-center mb-10">
          <div className="bg-[#12B279] rounded-full w-12 h-12 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">✓</span>
          </div>
        </div>
        <h2 className="text-4xl font-semibold text-[#26221f] mb-10">
          Registration success
        </h2>
        <button
          className="bg-black text-white rounded-full px-6 py-2 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Continue
        </button>
      </div>
    </div>
    </>
  );
}
