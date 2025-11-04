import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDashboard } from "../../lib/api";
import { useUserStore } from "../../store/useUserStore";

export default function DashboardPage() {
    const router = useRouter();
    const { user, token, logout } = useUserStore();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            router.push("/auth/login");
            return;
        }
        const loadDashboard = async () => {
            try {
                const res = await fetchDashboard();
                setData(res.data);
            } catch (err: any) {
                console.error(err);
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, [token, router]);

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Loading dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Welcome, {data?.name}</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-100 p-4 rounded-lg text-center">
                        <h3 className="text-sm text-gray-600">Referral Code</h3>
                        <p className="text-lg font-semibold text-blue-700">
                            {data?.referralCode}
                        </p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                        <h3 className="text-sm text-gray-600">Total Credits</h3>
                        <p className="text-lg font-semibold text-green-700">
                            {data?.totalCredits}
                        </p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg text-center">
                        <h3 className="text-sm text-gray-600">Referred Users</h3>
                        <p className="text-lg font-semibold text-yellow-700">
                            {data?.totalReferred}
                        </p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-3">Referral Summary</h2>
                <ul className="space-y-2">
                    <li className="flex justify-between border-b pb-2">
                        <span>Converted Users:</span>
                        <span className="font-medium">{data?.convertedUsers}</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Active Referrals:</span>
                        <span className="font-medium">
                            {data?.totalReferred - data?.convertedUsers}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
