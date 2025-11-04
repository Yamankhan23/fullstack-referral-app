import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../../lib/api";
import { useUserStore } from "../../store/useUserStore";

export default function LoginPage() {
    const router = useRouter();
    const { setUser } = useUserStore();

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await loginUser(form);
            setUser(res.data.user, res.data.token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5FA] px-4">
            <div className="bg-white border border-[#E5E5F0] shadow-xl rounded-2xl w-full max-w-md p-8">
                <h2 className="text-3xl font-semibold text-center mb-6 text-[#6C63FF]">
                    Welcome Back
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#DDDDEE] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6C63FF] outline-none"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#DDDDEE] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6C63FF] outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#6C63FF] hover:bg-[#584CF8] text-white py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-[#2F2E41]/70 mt-4">
                    Don’t have an account?{" "}
                    <a href="/auth/register" className="text-[#6C63FF] hover:underline font-medium">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
