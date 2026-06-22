"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { sendNotification } from "@/lib/sendNotification";

type RequestType = {
    id: string;
    request_date: string;
    liters: number;
    status: string;
    customer_id: string;
    customers: {
        customer_code: string;
        name: string;
    }[];
};

// ── SVG Icons ──────────────────────────────────────────────────────────
const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const NavTruckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);

const ReceiptIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
    </svg>
);

const BellIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const PlusCircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
);

// ── Farm Landscape SVG Background ────────────────────────────────────────────
const FarmLandscape = () => (
    <svg viewBox="0 0 390 120" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <rect width="390" height="120" fill="url(#skyGrad)" />
        <ellipse cx="80" cy="115" rx="130" ry="50" fill="#6ee7b7" opacity="0.5" />
        <ellipse cx="310" cy="118" rx="120" ry="45" fill="#6ee7b7" opacity="0.5" />
        <ellipse cx="160" cy="125" rx="160" ry="55" fill="#34d399" opacity="0.7" />
        <ellipse cx="350" cy="128" rx="110" ry="50" fill="#34d399" opacity="0.6" />
        <rect x="0" y="90" width="390" height="30" fill="#10b981" opacity="0.5" />
        <rect x="275" y="52" width="4" height="44" fill="#78716c" />
        <line x1="277" y1="58" x2="277" y2="38" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
        <line x1="277" y1="58" x2="291" y2="65" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
        <line x1="277" y1="58" x2="263" y2="65" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
        <circle cx="277" cy="58" r="3" fill="#57534e" />
    </svg>
);

type NavTab = "dashboard" | "customers" | "deliveries" | "bills";

export default function RequestsPage() {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [activeNav, setActiveNav] = useState<NavTab>("deliveries");
    const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

    const fetchRequests = async () => {
        const { data, error } = await supabase.from("extra_requests").select(`
      id,
      request_date,
      liters,
      status,
      customer_id,
      customers (
        customer_code,
        name
      )
    `);

        if (error) {
            console.log(error);
            return;
        }

        if (data) {
            setRequests(data as RequestType[]);
            setLoaded(true);
        }
    };

    const approveRequest = async (request: RequestType) => {
        await supabase
            .from("extra_requests")
            .update({ status: "approved" })
            .eq("id", request.id);

        const customer = await supabase
            .from("customers")
            .select("fcm_token")
            .eq("id", request.customer_id)
            .single();

        if (customer.data?.fcm_token) {
            await sendNotification(
                customer.data.fcm_token,
                "Extra Milk Approved",
                "Your extra milk request has been approved."
            );
        }

        fetchRequests();
    };

    const rejectRequest = async (request: RequestType) => {
        await supabase
            .from("extra_requests")
            .update({ status: "rejected" })
            .eq("id", request.id);

        const customer = await supabase
            .from("customers")
            .select("fcm_token")
            .eq("id", request.customer_id)
            .single();

        if (customer.data?.fcm_token) {
            await sendNotification(
                customer.data.fcm_token,
                "Extra Milk Rejected",
                "Your extra milk request has been rejected."
            );
        }

        fetchRequests();
    };

    const deleteRequest = async (id: string) => {
        await supabase
            .from("extra_requests")
            .delete()
            .eq("id", id);
        fetchRequests();
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Filter requests based on active filter
    const filteredRequests = requests.filter((r) => {
        if (filter === "all") return true;
        return r.status === filter;
    });

    const pendingCount = requests.filter((r) => r.status === "pending").length;

    // Status badge styling
    const statusStyles = {
        pending: "bg-blue-50 text-blue-700 border-blue-100",
        approved: "bg-green-50 text-green-700 border-green-100",
        rejected: "bg-red-50 text-red-700 border-red-100",
    };

    const navItems: { key: NavTab; label: string; icon: React.ReactNode; href: string }[] = [
        { key: "dashboard", label: "Dashboard", icon: <HomeIcon />, href: "/" },
        { key: "customers", label: "Customers", icon: <UsersIcon />, href: "/customers" },
        { key: "deliveries", label: "Deliveries", icon: <NavTruckIcon />, href: "/deliveries" },
        { key: "bills", label: "Bills", icon: <ReceiptIcon />, href: "/bills" },
    ];

    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            {/* ── Header ── */}
            <header className="sticky top-0 z-30 bg-gradient-to-b from-green-50 to-green-100">
                <div className="flex items-center justify-between px-4 pt-4 pb-1">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-200">
                            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 4C10 8 6 14 6 22c4 0 8-2 10-6 0 4-2 8-6 10 6 0 12-4 14-10s0-12-8-12z" fill="#16a34a" />
                                <path d="M16 14 L16 28" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-gray-900 font-bold text-base leading-tight">Farm to Home</h1>
                            <p className="text-gray-500 text-xs">Extra Requests</p>
                        </div>
                    </div>
                    <button className="relative text-gray-600 p-1" aria-label="Notifications">
                        <BellIcon />
                        {pendingCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {pendingCount > 9 ? "9+" : pendingCount}
                            </span>
                        )}
                    </button>
                </div>
                <div className="mt-1 -mb-1">
                    <FarmLandscape />
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="relative z-10 bg-white rounded-t-3xl -mt-3 px-4 pt-5 pb-28 min-h-screen">
                {/* ── Header Section ── */}
                <section className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Extra Requests</h2>
                            <p className="text-sm text-gray-400 mt-1">Manage customer extra milk requests</p>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                            <PlusCircleIcon />
                            <span className="text-sm font-bold text-blue-600">{pendingCount}</span>
                        </div>
                    </div>

                    {/* ── Filter Chips ── */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {["all", "pending", "approved", "rejected"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status as any)}
                                className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 ${filter === status
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── Requests List ── */}
                <section>
                    {filteredRequests.length === 0 ? (
                        <div className="py-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <PlusCircleIcon />
                            </div>
                            <p className="text-gray-500 font-medium">No {filter === "all" ? "" : filter} requests</p>
                            <p className="text-sm text-gray-400 mt-1">Check back later for new requests</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {filteredRequests.map((request, idx) => (
                                <div
                                    key={request.id}
                                    className={`flex flex-col gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm
                    transition-all duration-300 active:scale-[0.98]
                    ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                >
                                    {/* ── Request Header ── */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900">
                                                    {request.customers?.[0]?.name || "Unknown Customer"}
                                                </h3>
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusStyles[request.status as keyof typeof statusStyles]}`}>
                                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                ID: {request.customers?.[0]?.customer_code || request.customer_id}
                                            </p>
                                        </div>
                                    </div>

                                    {/* ── Request Details Grid ── */}
                                    <div className="grid grid-cols-3 gap-3 py-3 border-t border-gray-100">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-0.5">Quantity</p>
                                            <p className="text-lg font-black text-blue-600">{request.liters}L</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-0.5">Date</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {new Date(request.request_date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-0.5">Time</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {new Date(request.request_date).toLocaleTimeString("en-IN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* ── Action Buttons ── */}
                                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                                        {request.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => approveRequest(request)}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-colors duration-200 active:scale-95"
                                                >
                                                    <CheckIcon />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => rejectRequest(request)}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm transition-colors duration-200 active:scale-95"
                                                >
                                                    <XIcon />
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => deleteRequest(request.id)}
                                            className={`${request.status === "pending" ? "flex-1" : "w-full"
                                                } flex items-center justify-center gap-2 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-colors duration-200 active:scale-95`}
                                        >
                                            <TrashIcon />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* ── Bottom Navigation ── */}
            <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.07)]">
                <div className="flex items-center max-w-lg mx-auto">
                    {navItems.map(({ key, label, icon, href }) => {
                        const isActive = activeNav === key;
                        return (
                            <Link
                                key={key}
                                href={href}
                                onClick={() => setActiveNav(key)}
                                className="flex-1 flex flex-col items-center justify-center gap-1 py-3 relative"
                            >
                                <span className={`transition-colors duration-150 ${isActive ? "text-green-600" : "text-gray-400"}`}>
                                    {icon}
                                </span>
                                <span className={`text-[10px] font-semibold transition-colors duration-150 ${isActive ? "text-green-600" : "text-gray-400"}`}>
                                    {label}
                                </span>
                                {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded-full" />}
                            </Link>
                        );
                    })}
                </div>
                <div className="h-1 bg-white" />
            </nav>
        </div>
    );
}