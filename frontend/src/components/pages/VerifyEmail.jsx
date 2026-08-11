import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sendVerificationEmail, verifyEmail } from "../../utils/api";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId] = useState(() => {
    return (
      sessionStorage.getItem("verifyUserId") || location.state?.userId || ""
    );
  });
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const sendOtp = async () => {
      setError("");
      setMessage("");
      setSending(true);

      try {
        const resp = await sendVerificationEmail(
          JSON.stringify({ userId })
        );
        setMessage(resp.message || "A verification code was sent to your email.");
      } catch (err) {
        setError(err.message || "Failed to send verification code. Please try again.");
      } finally {
        setSending(false);
      }
    };

    sendOtp();
  }, [userId]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!userId) {
      setError("Unable to verify without a user session. Please sign up again.");
      return;
    }

    if (!otp.trim()) {
      setError("Please enter the verification code.");
      return;
    }

    setLoading(true);
    try {
      const resp = await verifyEmail(JSON.stringify({ userId, otp }));
      setMessage(resp.message || "Email verified successfully.");
      sessionStorage.removeItem("verifyUserId");
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Verification succeeded. You can now sign in." },
        });
      }, 1200);
    } catch (err) {
      setError(err.message || "Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!userId) {
      setError("Unable to resend code without a user session. Please sign up again.");
      return;
    }

    setError("");
    setMessage("");
    setSending(true);

    try {
      const resp = await sendVerificationEmail(JSON.stringify({ userId }));
      setMessage(resp.message || "Verification code resent to your email.");
    } catch (err) {
      setError(err.message || "Unable to resend code. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 px-4">
        <div className="bg-white w-full max-w-sm rounded-lg border border-gray-300 p-6 text-center">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">Verify your email</h1>
          <p className="text-sm text-gray-600 mb-4">
            We cannot verify your account because there is no signup session. Please create a new account.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-2 px-4 rounded"
          >
            Go to Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 px-4 pb-10">
      <div className="bg-white w-full max-w-sm rounded-lg border border-gray-300 p-6">
        <h1 className="text-2xl font-medium text-gray-800 mb-4">Verify your email</h1>
        <p className="text-sm text-gray-600 mb-4">
          Enter the 6-digit code we sent to <strong>{email || "your email"}</strong>.
        </p>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-medium py-2 rounded text-sm transition-colors"
          >
            {loading ? "Verifying..." : "Verify email"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <button
            type="button"
            onClick={handleResend}
            disabled={sending}
            className="text-blue-600 hover:underline disabled:text-gray-400"
          >
            {sending ? "Resending code..." : "Resend code"}
          </button>
        </div>

        <hr className="my-4 border-gray-200" />

        <p className="text-xs text-gray-500 text-center">
          Didn&apos;t receive the email? Check your spam folder or resend the code.
        </p>
      </div>
    </div>
  );
}
