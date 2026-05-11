import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signUpUser } from "../../utils/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  // ── Handle any input change ──────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear the error for this field as the user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Client-side validation ───────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Full name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.phone.trim())
      newErrors.phone = "Phone Number is required";
    else if (!/^[789][0-9]{9}$/.test(formData.phone))
      newErrors.phone = "Phone number must be have 10 digits"

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  // ── Password strength indicator ──────────────────────────
  const getPasswordStrength = (password) => {
    if (!password) return null;
    if (password.length < 6)
      return { label: "Too short", color: "bg-red-400", width: "w-1/4" };
    if (password.length < 8)
      return { label: "Weak", color: "bg-orange-400", width: "w-2/4" };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
      return { label: "Fair", color: "bg-yellow-400", width: "w-3/4" };
    return { label: "Strong", color: "bg-green-500", width: "w-full" };
  };

  const strength = getPasswordStrength(formData.password);

  // ── Submit ───────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const resp = await signUpUser(JSON.stringify(formData));
      if (resp.userId)
        navigate("/login");
    } catch (err) {
      setServerError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 px-4 pb-10">

      {/* Logo */}
      <Link to="/">
        <img
          src="/src/assets/logo.png"
          alt="Amazon"
          className="h-10 mb-6 invert"
        />
      </Link>

      <div className="bg-white w-full max-w-sm rounded-lg border border-gray-300 p-6">
        <h1 className="text-2xl font-medium text-gray-800 mb-5">
          Create account
        </h1>

        {/* Server error banner */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded text-sm text-red-700 flex items-start gap-2">
            <i className="fas fa-exclamation-circle mt-0.5 flex-shrink-0"></i>
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Full name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="First and last name"
              className={`w-full border rounded px-3 py-2 text-sm outline-none transition-colors
                ${errors.name
                  ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-red-50"
                  : "border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i> {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="8888888888"
              className={`w-full border rounded px-3 py-2 text-sm outline-none transition-colors
                ${errors.phone
                  ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-red-50"
                  : "border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i> {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full border rounded px-3 py-2 text-sm outline-none transition-colors
                ${errors.email
                  ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-red-50"
                  : "border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`w-full border rounded px-3 py-2 pr-10 text-sm outline-none transition-colors
                  ${errors.password
                    ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-red-50"
                    : "border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  }`}
              />
              {/* Show / hide toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password strength bar */}
            {formData.password && strength && (
              <div className="mt-2">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
                  />
                </div>
                <p className={`text-xs mt-1
                  ${strength.label === "Strong" ? "text-green-600" :
                    strength.label === "Fair" ? "text-yellow-600" :
                      strength.label === "Weak" ? "text-orange-500" :
                        "text-red-500"}`}>
                  Password strength: {strength.label}
                </p>
              </div>
            )}

            {errors.password && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Re-enter password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full border rounded px-3 py-2 pr-10 text-sm outline-none transition-colors
                  ${errors.confirmPassword
                    ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400 bg-red-50"
                    : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? "border-green-400 focus:border-green-400 focus:ring-1 focus:ring-green-400 bg-green-50"
                      : "border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>

            {/* Passwords match indicator */}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <i className="fas fa-check-circle"></i> Passwords match
              </p>
            )}

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-medium py-2 rounded text-sm transition-colors mt-1"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-spinner fa-spin"></i> Creating account...
              </span>
            ) : (
              "Create your Amazon account"
            )}
          </button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
          By creating an account, you agree to Amazon's{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Notice
          </a>.
        </p>

        <hr className="my-4 border-gray-200" />

        {/* Already have account */}
        <p className="text-sm text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}