import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { loginUser } from "../../utils/api";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const reqBody = {
        email,
        password
    }

    try {
      const resp = await loginUser(JSON.stringify(reqBody));
      const {token, name, email} = resp;
      console.log("Login response:", resp);
      login({ name, email }, token);
      navigate("/");
    } catch (err) {
        console.log("ERROR: ", err)
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 px-4">
      <Link to="/">
        <img
          src="/src/assets/logo.png"
          alt="Amazon"
          className="h-10 mb-6 invert"
        />
      </Link>

      <div className="bg-white w-full max-w-sm rounded-lg border border-gray-300 p-6">
        <h1 className="text-2xl font-medium text-gray-800 mb-5">Sign in</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-gray-900 font-medium py-2 rounded text-sm transition-colors mt-1"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By continuing you agree to Amazon's conditions of use.
        </p>

        <hr className="my-4 border-gray-200" />

        <p className="text-sm text-center text-gray-700">
          New to Amazon?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
}