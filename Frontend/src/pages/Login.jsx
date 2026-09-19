import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ShoppingBasket } from "lucide-react";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    try {
      await login({ email: form.get("email"), password: form.get("password") });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-sm rounded-sm border border-line bg-stone-50 p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center text-center">
          <ShoppingBasket size={24} className="text-brass-500" />
          <h1 className="mt-3 font-display text-2xl font-medium text-ink">Welcome Back</h1>
          <p className="mt-1 text-sm text-ink-500">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 rounded-sm border border-rust/30 bg-rust/10 px-3 py-2 text-sm text-rust">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="email" name="email" type="email" label="Email" placeholder="you@example.com" required />
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="h-11 w-full rounded-sm border border-line bg-stone-50 px-3.5 pr-10 text-sm focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-ink-500">
              <input type="checkbox" className="accent-brass-500" />
              Remember me
            </label>
            <a href="#" className="font-medium text-brass-600 hover:text-brass-700">
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-brass-600 hover:text-brass-700">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
