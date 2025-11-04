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
    const [purchaseMsg, setPurchaseMsg] = useState("");

    const [purchasing, setPurchasing] = useState(false);

    const products = [
        {
            id: "P1",
            name: "Minimalist Tote Bag",
            price: 25,
            image: "https://plus.unsplash.com/premium_photo-1681498947021-6875d6a7b21f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
        },
        {
            id: "P2",
            name: "Classic Wrist Watch",
            price: 55,
            image: "https://images.unsplash.com/photo-1667375565651-b660b574d1a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
        },
        {
            id: "P3",
            name: "Leather Journal",
            price: 18,
            image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=80",
        },
        {
            id: "P4",
            name: "Scented Candle",
            price: 20,
            image: "https://images.unsplash.com/photo-1643122966676-29e8597257f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        },
        {
            id: "P5",
            name: "Silk Scarf",
            price: 30,
            image: "https://images.unsplash.com/photo-1609803384069-19f3e5a70e75?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035",
        },
        {
            id: "P6",
            name: "Desk Lamp",
            price: 40,
            image: "https://images.unsplash.com/photo-1601642964568-1917224f4e4d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        },
    ];

    // ---------- Load dashboard ----------
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

    // ---------- Copy Referral ----------
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

    // ---------- Handle Purchase ----------
    const handleBuy = async (productId: string, price: number) => {
        setPurchasing(true);
        setPurchaseMsg("");
        try {
            await makePurchase({ productId, amount: price });
            setPurchaseMsg(`Purchase successful for ${productId}! Credits updated.`);
            const res = await fetchDashboard();
            setData(res.data);
        } catch (err) {
            console.error(err);
            setPurchaseMsg("Purchase failed. Please try again later.");
        } finally {
            setPurchasing(false);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-[#2F2E41]/70">
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
        <div className="min-h-screen bg-[#F5F5FA] text-[#2F2E41] p-6 flex flex-col items-center">
            <div className="w-full max-w-5xl bg-white border border-[#E5E5F0] shadow-lg rounded-2xl p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Welcome, {data?.name}</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#F8F8FD] p-4 rounded-lg text-center border border-[#E5E5F0]">
                        <h3 className="text-sm text-[#2F2E41]/70">Referral Code</h3>
                        <p className="text-lg font-semibold text-[#6C63FF]">{data?.referralCode}</p>
                        <button
                            onClick={handleCopyReferral}
                            className="text-sm text-[#6C63FF] mt-2 hover:underline"
                        >
                            {copySuccess ? "Copied!" : "Copy referral link"}
                        </button>
                    </div>

                    <div className="bg-[#F8F8FD] p-4 rounded-lg text-center border border-[#E5E5F0]">
                        <h3 className="text-sm text-[#2F2E41]/70">Total Credits</h3>
                        <p className="text-lg font-semibold text-green-600">{data?.totalCredits}</p>
                    </div>

                    <div className="bg-[#F8F8FD] p-4 rounded-lg text-center border border-[#E5E5F0]">
                        <h3 className="text-sm text-[#2F2E41]/70">Referred Users</h3>
                        <p className="text-lg font-semibold text-yellow-600">{data?.totalReferred}</p>
                    </div>
                </div>

                {/* Referral Summary */}
                <h2 className="text-xl font-semibold mb-3">Referral Summary</h2>
                <ul className="space-y-2 mb-10 text-[#2F2E41]/90">
                    <li className="flex justify-between border-b border-[#E5E5F0] pb-2">
                        <span>Converted Users:</span>
                        <span className="font-medium">{data?.convertedUsers}</span>
                    </li>
                    <li className="flex justify-between border-b border-[#E5E5F0] pb-2">
                        <span>Active Referrals:</span>
                        <span className="font-medium">
                            {data?.totalReferred - data?.convertedUsers}
                        </span>
                    </li>
                </ul>

                {/* Store Section */}
                <h2 className="text-xl font-semibold mb-4 text-[#3E1F47] text-center">
                    🛍️ Explore Our Store
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#F8F8FD] border border-[#E5E5F0] rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col items-center text-center">
                                <h3 className="font-medium text-lg text-[#2F2E41]">{product.name}</h3>
                                <p className="text-[#6C63FF] font-semibold mb-3">${product.price}</p>
                                <button
                                    onClick={() => handleBuy(product.id, product.price)}
                                    disabled={purchasing}
                                    className="bg-[#6C63FF] hover:bg-[#584CF8] text-white px-5 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
                                >
                                    {purchasing ? "Processing..." : "Buy Now"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {purchaseMsg && (
                    <div
                        className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white text-sm transition-all duration-300 ${purchaseMsg.includes("failed")
                            ? "bg-red-500"
                            : "bg-green-600"
                            }`}
                    >
                        {purchaseMsg}
                    </div>
                )}

            </div>
        </div>
    );
}
