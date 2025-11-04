import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../../lib/api";
import { useUserStore } from "../../store/useUserStore";

export default function RegisterPage() {
    const router = useRouter();
    const { setUser } = useUserStore();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        referralCode: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await registerUser(form);
            setUser(res.data.user, res.data.token);
            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 1500);
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5FA] px-4">
            <div className="bg-white border border-[#E5E5F0] shadow-xl rounded-2xl w-full max-w-md p-8">
                <h2 className="text-3xl font-semibold text-center mb-6 text-[#6C63FF]">
                    Create your account
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
                        Registered successfully! Redirecting...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#DDDDEE] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6C63FF] outline-none"
                    />
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
                    <input
                        type="text"
                        name="referralCode"
                        placeholder="Referral Code (optional)"
                        value={form.referralCode}
                        onChange={handleChange}
                        className="w-full border border-[#DDDDEE] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6C63FF] outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#6C63FF] hover:bg-[#584CF8] text-white py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-[#2F2E41]/70 mt-4">
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-[#6C63FF] hover:underline font-medium">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
