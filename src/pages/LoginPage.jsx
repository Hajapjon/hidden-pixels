import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.session.access_token);
      login({
        email: form.email,
        name: data.user.user_metadata?.name,
        username: data.user.user_metadata?.username,
      });

      navigate("/");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f3]">
        <div className="bg-white px-10 py-12 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#26221f]">
            Log in
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-[#26221f]">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full border rounded-md p-2"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-[#26221f]">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border rounded-md p-2"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorMsg && <p className="text-red-500">{errorMsg}</p>}

            <button
              type="submit"
              className="bg-black text-white rounded-full px-6 py-2 w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have any account?{" "}
            <a href="/signup" className="text-black underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
