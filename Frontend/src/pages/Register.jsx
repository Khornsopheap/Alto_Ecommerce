import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.target);
    
    try {
      await register({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        password_confirmation: form.get("confirmPassword"),
      });
      navigate("/");
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors ? Object.values(errors)[0]?.[0] : err.response?.data?.message || "Something wentwrong.");
    } finally {
          setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-sm rounded-sm border border-line bg-stone-50 p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center text-center">
          <ShoppingBasket size={24} className="text-brass-500" />
          <h1 className="mt-3 font-display text-2xl font-medium text-ink">Create Your Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="name" name="name" label="Name" placeholder="Jane Doe" required />
          <Input id="email" name="email" type="email" label="Email" placeholder="you@example.com" required />
          <Input id="password" name="password" type="password" label="Password" placeholder="••••••••" required />
          <Input id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" placeholder="••••••••" required />

          <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brass-600 hover:text-brass-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
