import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:4001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Sign up failed");
      }

      navigate("/signup-success");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-start justify-center bg-[#f9f7f3] mt-[60px] lg:mt-[80px] pt-12">
      <div className="bg-[#EFEEEB] px-20 py-12 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#26221f]">
          Sign up
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <label className="block mb-1 text-[#75716B]">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Full name"
            className="w-full border rounded-md p-2 bg-white"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="block mb-1 text-[#75716B]">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full border rounded-md p-2 bg-white"
            value={form.username}
            onChange={handleChange}
            required
          />
          <label className="block mb-1 text-[#75716B]">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-2 bg-white"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="block mb-1 text-[#75716B]">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-md p-2 bg-white"
            value={form.password}
            onChange={handleChange}
            required
          />

          {errorMsg && <p className="text-red-500">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded-full px-6 py-2 w-full"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#75716B]">
          Already have an account?{" "}
          <a href="/login" className="text-[#26231E] underline">
            Log in
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
