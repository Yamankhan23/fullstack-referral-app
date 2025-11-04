import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchDashboard, makePurchase } from "../../lib/api";
import { useUserStore } from "../../store/useUserStore";

export default function DashboardPage() {
    const router = useRouter();
    const { user, token, logout } = useUserStore();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [purchaseMsg, setPurchaseMsg] = useState("");

    // ---------- Load dashboard on mount ----------
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

    // ---------- Logout ----------
    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    // ---------- Copy referral link ----------
    const handleCopyReferral = async () => {
        const referralLink = `${window.location.origin}/auth/register?ref=${data?.referralCode}`;
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch {
            alert("Failed to copy link.");
        }
    };

    // ---------- Simulate Purchase ----------
    const handlePurchase = async () => {
        setPurchaseLoading(true);
        setPurchaseMsg("");
        try {
            console.log("Before:", data?.totalCredits);
            await makePurchase({ productId: "TEST_PRODUCT", amount: 1 });
            setPurchaseMsg("Purchase simulated successfully! Credits updated.");
            // reload dashboard data
            const res = await fetchDashboard();
            setData(res.data);
            console.log("After:", res.data.totalCredits);
        } catch (err: any) {
            console.error(err);
            setPurchaseMsg("Purchase failed. Please try again.");
        } finally {
            setPurchaseLoading(false);
        }
    };

    // ---------- Render ----------
    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Loading dashboard...
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Welcome, {data?.name}</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-100 p-4 rounded-lg text-center">
                        <h3 className="text-sm text-gray-600">Referral Code</h3>
                        <p className="text-lg font-semibold text-blue-700">
                            {data?.referralCode}
                        </p>
                        <button
                            onClick={handleCopyReferral}
                            className="text-sm text-blue-600 mt-2 hover:underline"
                        >
                            {copySuccess ? "Copied!" : "Copy referral link"}
                        </button>
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

                {/* Referral Summary */}
                <h2 className="text-xl font-semibold mb-3">Referral Summary</h2>
                <ul className="space-y-2 mb-6">
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

                {/* Simulate Purchase */}
                <button
                    onClick={handlePurchase}
                    disabled={purchaseLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
                >
                    {purchaseLoading ? "Processing..." : "Simulate Purchase"}
                </button>

                {purchaseMsg && (
                    <p className="text-center mt-3 text-sm text-green-700">
                        {purchaseMsg}
                    </p>
                )}
            </div>
        </div>
    );
}
