import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

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
    <NavBar/>
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7f3]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#26221f]">
          Sign up
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full border rounded-md p-2"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full border rounded-md p-2"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-2"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-md p-2"
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

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-black underline">
            Log in
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
