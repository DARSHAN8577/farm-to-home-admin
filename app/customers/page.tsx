"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);
const RupeeSmallIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M6 3h12M6 8h12M6 13l9 8M6 8a5 5 0 0 1 5 5" />
    </svg>
);
const IdIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M15 9h3M15 13h3M6 17h12" />
    </svg>
);
const KeyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <circle cx="7.5" cy="15.5" r="5.5" /><path d="M21 2l-9.6 9.6" /><path d="M15.5 7.5l3 3L22 7l-3-3" />
    </svg>
);
const EditIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);
const KeyChangeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="7.5" cy="15.5" r="5.5" /><path d="M21 2l-9.6 9.6" /><path d="M15.5 7.5l3 3L22 7l-3-3" />
    </svg>
);
const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);
const UserPlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
    </svg>
);
const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const BellIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);
const MenuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);
const UsersEmptyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
);
const NavUsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const NavTruckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);
const ReceiptIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
    </svg>
);

// ── Farm Landscape SVG Background (same as dashboard, compact variant) ──────
const FarmLandscape = () => (
    <svg viewBox="0 0 390 90" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
            <linearGradient id="skyGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <rect width="390" height="90" fill="url(#skyGrad2)" />
        <ellipse cx="80" cy="88" rx="130" ry="38" fill="#6ee7b7" opacity="0.5" />
        <ellipse cx="310" cy="90" rx="120" ry="34" fill="#6ee7b7" opacity="0.5" />
        <ellipse cx="160" cy="95" rx="160" ry="42" fill="#34d399" opacity="0.7" />
        <ellipse cx="350" cy="98" rx="110" ry="38" fill="#34d399" opacity="0.6" />
        <rect x="0" y="68" width="390" height="22" fill="#10b981" opacity="0.5" />
        <rect x="30" y="42" width="3.5" height="30" fill="#78716c" />
        <ellipse cx="32" cy="40" rx="11" ry="13" fill="#16a34a" />
        <ellipse cx="24" cy="46" rx="8" ry="10" fill="#15803d" />
        <rect x="345" y="50" width="3" height="22" fill="#78716c" />
        <ellipse cx="346" cy="46" rx="10" ry="12" fill="#16a34a" />
    </svg>
);

type Customer = {
    id: string;
    name: string;
    phone: string;
    address: string;
    morning_liters: number;
    evening_liters: number;
    price_per_liter: number;
    customer_code: string;
    password: string;
};

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");
    const [toast, setToast] = useState<{ message: string; tone: "success" | "error" } | null>(null);

    const showToast = (message: string, tone: "success" | "error" = "success") => {
        setToast({ message, tone });
        window.clearTimeout((window as any).__toastTimer);
        (window as any).__toastTimer = window.setTimeout(() => setToast(null), 2600);
    };

    const fetchCustomers = async () => {
        const { data, error } = await supabase
            .from("customers")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) {
            setCustomers(data || []);
        }
        setLoaded(true);
    };

    const deleteCustomer = async (id: string) => {
        const confirmDelete = confirm("Delete this customer completely?");
        if (!confirmDelete) return;

        const { error } = await supabase.from("customers").delete().eq("id", id);

        if (!error) {
            showToast("Customer deleted");
            fetchCustomers();
        } else {
            showToast("Could not delete customer", "error");
        }
    };

    const changePassword = async (id: string) => {
        const newPassword = prompt("Enter new 6-digit password");
        if (!newPassword) return;

        const { error } = await supabase
            .from("customers")
            .update({ password: newPassword })
            .eq("id", id);

        if (!error) {
            showToast("Password updated");
            fetchCustomers();
        } else {
            showToast("Could not update password", "error");
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const filtered = customers.filter((c) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
            c.name?.toLowerCase().includes(q) ||
            c.phone?.toLowerCase().includes(q) ||
            c.customer_code?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            {/* ── Sticky Header with Farm Landscape ── */}
            <header className="sticky top-0 z-30 bg-gradient-to-b from-green-50 to-green-100">
                <div className="flex items-center justify-between px-4 pt-4 pb-1">
                    <button className="text-gray-600 p-1">
                        <MenuIcon />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-200">
                            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 4C10 8 6 14 6 22c4 0 8-2 10-6 0 4-2 8-6 10 6 0 12-4 14-10s0-12-8-12z" fill="#16a34a" />
                                <path d="M16 14 L16 28" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-gray-900 font-bold text-base leading-tight">Customers</h1>
                            <p className="text-gray-500 text-xs">{customers.length} total</p>
                        </div>
                    </div>
                    <button className="relative text-gray-600 p-1">
                        <BellIcon />
                        <span className="absolute -top-0.5 -right-0.5 bg-green-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>
                </div>
                <div className="mt-1 -mb-1">
                    <FarmLandscape />
                </div>
            </header>

            {/* ── Scrollable Content ── */}
            <main className="relative z-10 bg-white rounded-t-3xl -mt-3 px-4 pt-5 pb-28 min-h-screen">
                {/* ── Search + Add ── */}
                <section className="mb-5 flex items-center gap-2.5">
                    <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5">
                        <span className="text-gray-400">
                            <SearchIcon />
                        </span>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name, phone, ID"
                            className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
                        />
                    </div>
                    <Link
                        href="/customers/create"
                        className="flex-shrink-0 bg-green-600 text-white rounded-xl p-3 shadow-sm active:scale-95 transition-transform duration-100"
                    >
                        <UserPlusIcon />
                    </Link>
                </section>

                {/* ── Customer List ── */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                        <div className="bg-green-50 text-green-500 rounded-full p-5 mb-4">
                            <UsersEmptyIcon />
                        </div>
                        <p className="text-gray-700 font-bold text-sm">
                            {customers.length === 0 ? "No customers yet" : "No matches found"}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                            {customers.length === 0
                                ? "Add your first customer to get started"
                                : "Try a different name, phone, or ID"}
                        </p>
                    </div>
                ) : (
                    <section className="flex flex-col gap-3">
                        {filtered.map((customer, i) => (
                            <div
                                key={customer.id}
                                className={`bg-white border border-gray-100 rounded-2xl shadow-sm p-4
                  transition-all duration-200
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                                style={{
                                    transitionDelay: `${Math.min(i, 6) * 60}ms`, transitionProperty: "opacity, transform",
                                    transitionDuration: "0.35s",
                                    transitionTimingFunction: "ease"
                                }}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-sm">
                                            {customer.name?.charAt(0)?.toUpperCase() || "?"}
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="text-sm font-bold text-gray-900 truncate">{customer.name}</h2>
                                            <p className="text-xs text-gray-400 truncate">{customer.address}</p>
                                        </div>
                                    </div>
                                    <span className="flex-shrink-0 bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <IdIcon />
                                        {customer.customer_code}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-3.5">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-2">
                                        <span className="text-green-600"><PhoneIcon /></span>
                                        {customer.phone}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-2">
                                        <span className="text-green-600"><RupeeSmallIcon /></span>
                                        ₹{customer.price_per_liter}/L
                                    </div>
                                    <div className="col-span-2 flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-2">
                                        <span className="text-green-600"><KeyIcon /></span>
                                        Password: <span className="font-semibold text-gray-600">{customer.password}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-3">
                                    <Link
                                        href={`/customers/${customer.id}`}
                                        className="flex items-center justify-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold py-2.5 rounded-xl active:scale-95 transition-transform duration-100"
                                    >
                                        <EditIcon />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => changePassword(customer.id)}
                                        className="flex items-center justify-center gap-1.5 bg-amber-50 text-amber-600 text-xs font-semibold py-2.5 rounded-xl active:scale-95 transition-transform duration-100"
                                    >
                                        <KeyChangeIcon />
                                        Password
                                    </button>
                                    <button
                                        onClick={() => deleteCustomer(customer.id)}
                                        className="flex items-center justify-center gap-1.5 bg-red-50 text-red-500 text-xs font-semibold py-2.5 rounded-xl active:scale-95 transition-transform duration-100"
                                    >
                                        <TrashIcon />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </main>

            {/* ── Bottom Navigation ── */}
            <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.07)]">
                <div className="flex items-center max-w-lg mx-auto">
                    {[
                        { key: "dashboard", label: "Dashboard", icon: <HomeIcon />, href: "/" },
                        { key: "customers", label: "Customers", icon: <NavUsersIcon />, href: "/customers" },
                        { key: "deliveries", label: "Deliveries", icon: <NavTruckIcon />, href: "/deliveries" },
                        { key: "bills", label: "Bills", icon: <ReceiptIcon />, href: "/bills" },
                    ].map(({ key, label, icon, href }) => {
                        const isActive = key === "customers";
                        return (
                            <Link
                                key={key}
                                href={href}
                                className="flex-1 flex flex-col items-center justify-center gap-1 py-3 relative"
                            >
                                <span className={`transition-colors duration-150 ${isActive ? "text-green-600" : "text-gray-400"}`}>
                                    {icon}
                                </span>
                                <span className={`text-[10px] font-semibold transition-colors duration-150 ${isActive ? "text-green-600" : "text-gray-400"}`}>
                                    {label}
                                </span>
                                {isActive && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>
                <div className="h-1 bg-white" />
            </nav>

            {/* ── Toast ── */}
            {toast && (
                <div className="fixed bottom-24 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
                    <div
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white
              ${toast.tone === "success" ? "bg-green-600" : "bg-red-500"}
              animate-[toastIn_0.25s_ease-out]`}
                    >
                        {toast.tone === "success" ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        )}
                        {toast.message}
                    </div>
                </div>
            )}

            <style jsx global>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}