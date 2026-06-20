"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ── Inline SVG Icons (matching home dashboard icon language) ─────────────────
const ChevronDownIcon = ({ open }: { open: boolean }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);
const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
);
const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);
const RupeeSmallIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M6 3h12M6 8h12M6 13l9 8M6 8a5 5 0 0 1 5 5" />
    </svg>
);
const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const UndoIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 7v6h6" />
        <path d="M3 13a9 9 0 1 0 3-7.7L3 7" />
    </svg>
);
const TruckSmallIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);
const ChevronLeftIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
// ── New icon for summary card date chip (Feature 2) ──────────────────────────
const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
);

// ── Farm Landscape SVG Background (same as home dashboard) ───────────────────
const FarmLandscape = () => (
    <svg viewBox="0 0 390 120" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
            <linearGradient id="skyGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <rect width="390" height="120" fill="url(#skyGrad2)" />
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
        <rect x="300" y="72" width="36" height="24" fill="#fef3c7" rx="2" />
        <polygon points="298,72 336,72 318,55" fill="#f59e0b" />
        <rect x="312" y="84" width="10" height="12" fill="#92400e" rx="1" />
        <rect x="315" y="85" width="4" height="11" fill="#78350f" rx="0.5" />
        <rect x="348" y="80" width="4" height="18" fill="#78716c" />
        <ellipse cx="350" cy="76" rx="12" ry="14" fill="#16a34a" />
        <ellipse cx="342" cy="82" rx="9" ry="11" fill="#15803d" />
        <rect x="365" y="82" width="3" height="14" fill="#78716c" />
        <ellipse cx="366" cy="78" rx="10" ry="12" fill="#16a34a" />
    </svg>
);

export default function DeliveriesPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [todayDeliveries, setTodayDeliveries] = useState<any>({});
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [loaded, setLoaded] = useState(false);
    // ── Feature 1: loading flag while a bulk (mark-all) action is running ─────
    const [bulkLoading, setBulkLoading] = useState<"delivered" | "not_collected" | null>(null);

    const today = new Date().toISOString().split("T")[0];
    // Friendly date string for the summary card (Feature 2) — purely cosmetic
    const formattedToday = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const fetchCustomers = async () => {
        const { data } = await supabase
            .from("customers")
            .select("*")
            .eq("is_active", true);

        if (data) setCustomers(data);
    };

    const fetchTodayDeliveries = async () => {
        const { data } = await supabase
            .from("deliveries")
            .select("*")
            .eq("delivery_date", today);

        const map: any = {};
        data?.forEach((item) => {
            map[item.customer_id] = item;
        });

        setTodayDeliveries(map);
    };

    const markMorning = async (customer: any) => {
        const existing = todayDeliveries[customer.id];

        if (!existing) {
            await supabase.from("deliveries").insert([
                {
                    customer_id: customer.id,
                    delivery_date: today,
                    morning_liters: customer.morning_liters,
                    evening_liters: customer.evening_liters,
                    morning_status: "delivered",
                    evening_status: "pending",
                    total_liters: customer.morning_liters,
                    total_amount: customer.morning_liters * customer.price_per_liter,
                },
            ]);
        } else {
            await supabase
                .from("deliveries")
                .update({ morning_status: "delivered" })
                .eq("id", existing.id);
        }

        fetchTodayDeliveries();
    };

    const markEvening = async (customer: any) => {
        const existing = todayDeliveries[customer.id];

        if (!existing) {
            await supabase.from("deliveries").insert([
                {
                    customer_id: customer.id,
                    delivery_date: today,
                    morning_liters: customer.morning_liters,
                    evening_liters: customer.evening_liters,
                    morning_status: "pending",
                    evening_status: "delivered",
                    total_liters: customer.evening_liters,
                    total_amount: customer.evening_liters * customer.price_per_liter,
                },
            ]);
        } else {
            await supabase
                .from("deliveries")
                .update({ evening_status: "delivered" })
                .eq("id", existing.id);
        }

        fetchTodayDeliveries();
    };

    const undoMorning = async (deliveryId: string) => {
        await supabase
            .from("deliveries")
            .update({ morning_status: "pending" })
            .eq("id", deliveryId);

        fetchTodayDeliveries();
    };

    const undoEvening = async (deliveryId: string) => {
        await supabase
            .from("deliveries")
            .update({ evening_status: "pending" })
            .eq("id", deliveryId);

        fetchTodayDeliveries();
    };

    // ── FEATURE 1: Mark All Delivered ──────────────────────────────────────────
    // Marks both morning & evening as "delivered" for every active customer,
    // today. Creates a delivery row if one doesn't exist yet for today.
    const markAllDelivered = async () => {
        if (customers.length === 0) return;
        setBulkLoading("delivered");
        try {
            await Promise.all(
                customers.map(async (customer) => {
                    const existing = todayDeliveries[customer.id];
                    const totalLiters =
                        Number(customer.morning_liters || 0) + Number(customer.evening_liters || 0);
                    const totalAmount = totalLiters * Number(customer.price_per_liter || 0);

                    if (!existing) {
                        await supabase.from("deliveries").insert([
                            {
                                customer_id: customer.id,
                                delivery_date: today,
                                morning_liters: customer.morning_liters,
                                evening_liters: customer.evening_liters,
                                morning_status: "delivered",
                                evening_status: "delivered",
                                total_liters: totalLiters,
                                total_amount: totalAmount,
                            },
                        ]);
                    } else {
                        await supabase
                            .from("deliveries")
                            .update({
                                morning_status: "delivered",
                                evening_status: "delivered",
                                total_liters: totalLiters,
                                total_amount: totalAmount,
                            })
                            .eq("id", existing.id);
                    }
                })
            );
            await fetchTodayDeliveries();
        } finally {
            setBulkLoading(null);
        }
    };

    // ── FEATURE 1: Mark All Not Collected ──────────────────────────────────────
    // Marks both morning & evening as "not_collected" for every active
    // customer, today. Creates a delivery row if one doesn't exist yet.
    const markAllNotCollected = async () => {
        if (customers.length === 0) return;
        setBulkLoading("not_collected");
        try {
            await Promise.all(
                customers.map(async (customer) => {
                    const existing = todayDeliveries[customer.id];

                    if (!existing) {
                        await supabase.from("deliveries").insert([
                            {
                                customer_id: customer.id,
                                delivery_date: today,
                                morning_liters: customer.morning_liters,
                                evening_liters: customer.evening_liters,
                                morning_status: "not_collected",
                                evening_status: "not_collected",
                                total_liters: 0,
                                total_amount: 0,
                            },
                        ]);
                    } else {
                        await supabase
                            .from("deliveries")
                            .update({
                                morning_status: "not_collected",
                                evening_status: "not_collected",
                                total_liters: 0,
                                total_amount: 0,
                            })
                            .eq("id", existing.id);
                    }
                })
            );
            await fetchTodayDeliveries();
        } finally {
            setBulkLoading(null);
        }
    };

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        (async () => {
            await Promise.all([fetchCustomers(), fetchTodayDeliveries()]);
            setLoaded(true);
        })();
    }, []);

    // ── Helpers to derive per-customer delivery state ─────────────────────────
    // getCustomerStats centralizes the math used by both the individual cards
    // and the new Feature 2 summary card / customer-wise breakdown.
    // Daily reset rule: if a customer has NO delivery row for "today", they are
    // automatically treated as status = "not_collected" (old days are never
    // touched — they simply live under their own delivery_date).
    const getCustomerStats = (customer: any) => {
        const delivery = todayDeliveries[customer.id];
        const morningLiters = Number(customer.morning_liters) || 0;
        const eveningLiters = Number(customer.evening_liters) || 0;
        const totalLiters = morningLiters + eveningLiters;
        const price = Number(customer.price_per_liter) || 0;

        const hasMorning = morningLiters > 0;
        const hasEvening = eveningLiters > 0;

        const morningStatus = hasMorning ? delivery?.morning_status ?? (delivery ? "pending" : "not_collected") : null;
        const eveningStatus = hasEvening ? delivery?.evening_status ?? (delivery ? "pending" : "not_collected") : null;

        let deliveredLiters = 0;
        if (hasMorning && morningStatus === "delivered") deliveredLiters += morningLiters;
        if (hasEvening && eveningStatus === "delivered") deliveredLiters += eveningLiters;

        const deliveredAmount = deliveredLiters * price;
        const pendingAmount = (totalLiters - deliveredLiters) * price;

        let status: "delivered" | "partial" | "pending" | "not_collected";

        if (!delivery) {
            status = "not_collected";
        } else {
            const relevantStatuses = [morningStatus, eveningStatus].filter(Boolean) as string[];

            if (relevantStatuses.length === 0) {
                status = "delivered";
            } else if (relevantStatuses.every((s) => s === "delivered")) {
                status = "delivered";
            } else if (relevantStatuses.every((s) => s === "not_collected")) {
                status = "not_collected";
            } else if (relevantStatuses.some((s) => s === "delivered")) {
                status = "partial";
            } else {
                status = "pending";
            }
        }

        return {
            morningLiters,
            eveningLiters,
            totalLiters,
            price,
            deliveredLiters,
            deliveredAmount,
            pendingAmount,
            status,
        };
    };

    const getStatus = (customer: any) => getCustomerStats(customer).status;

    const statusDot: Record<string, string> = {
        delivered: "bg-green-500",
        partial: "bg-amber-400",
        pending: "bg-gray-300",
        not_collected: "bg-red-400",
    };
    const statusLabel: Record<string, string> = {
        delivered: "Delivered",
        partial: "Partial",
        pending: "Pending",
        not_collected: "Not Collected",
    };
    const statusText: Record<string, string> = {
        delivered: "text-green-600",
        partial: "text-amber-600",
        pending: "text-gray-400",
        not_collected: "text-red-500",
    };

    const deliveredCount = customers.filter((c) => getStatus(c) === "delivered").length;

    // ── FEATURE 2: Aggregate totals for the summary card ───────────────────────
    const summaryStats = customers.reduce(
        (acc, customer) => {
            const s = getCustomerStats(customer);
            acc.totalLitersPlanned += s.totalLiters;
            acc.totalLitersDelivered += s.deliveredLiters;
            acc.totalRevenue += s.deliveredAmount;
            acc.totalPending += s.pendingAmount;
            return acc;
        },
        { totalLitersPlanned: 0, totalLitersDelivered: 0, totalRevenue: 0, totalPending: 0 }
    );

    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            {/* ── Sticky Header ── */}
            <header className="sticky top-0 z-30 bg-gradient-to-b from-green-50 to-green-100">
                <div className="flex items-center justify-between px-4 pt-4 pb-1">
                    <div className="flex items-center gap-2">
                        <a
                            href="/"
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-200 text-green-600"
                            aria-label="Back to dashboard"
                        >
                            <ChevronLeftIcon />
                        </a>
                        <div>
                            <h1 className="text-gray-900 font-bold text-base leading-tight">Today Deliveries</h1>
                            <p className="text-gray-500 text-xs">
                                {deliveredCount}/{customers.length} done
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-full shadow-sm border border-green-200 px-3 py-1.5 flex items-center gap-1.5 text-green-600">
                        <TruckSmallIcon />
                        <span className="text-xs font-bold">{customers.length}</span>
                    </div>
                </div>

                <div className="mt-1 -mb-1">
                    <FarmLandscape />
                </div>
            </header>

            {/* ── Scrollable Content ── */}
            <main className="relative z-10 bg-white rounded-t-3xl -mt-3 px-4 pt-5 pb-10 min-h-screen">

                {/* ── FEATURE 1: Top Quick Delivery Toggle Section ── */}
                <div className="mb-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Quick Actions
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={markAllDelivered}
                            disabled={bulkLoading !== null || customers.length === 0}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white active:bg-green-700 disabled:opacity-60 transition-colors duration-100"
                        >
                            <CheckIcon />
                            {bulkLoading === "delivered" ? "Marking..." : "Mark All Delivered"}
                        </button>
                        <button
                            onClick={markAllNotCollected}
                            disabled={bulkLoading !== null || customers.length === 0}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-500 border border-red-200 active:bg-red-100 disabled:opacity-60 transition-colors duration-100"
                        >
                            <UndoIcon />
                            {bulkLoading === "not_collected" ? "Marking..." : "Mark All Not Collected"}
                        </button>
                    </div>
                </div>

                {/* ── FEATURE 2: Full Daily Delivery Summary Card ── */}
                <div className="mb-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-gray-900">Today&apos;s Delivery Summary</h2>
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                            <CalendarIcon /> {formattedToday}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-[11px] text-gray-400 font-medium">Total Customers</p>
                            <p className="text-base font-bold text-gray-900">{customers.length}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-[11px] text-gray-400 font-medium">Liters Planned</p>
                            <p className="text-base font-bold text-gray-900">{summaryStats.totalLitersPlanned}L</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3">
                            <p className="text-[11px] text-green-500 font-medium">Liters Delivered</p>
                            <p className="text-base font-bold text-green-700">{summaryStats.totalLitersDelivered}L</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-3">
                            <p className="text-[11px] text-amber-500 font-medium">Revenue Collected</p>
                            <p className="text-base font-bold text-amber-700">₹{summaryStats.totalRevenue.toFixed(0)}</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3 col-span-2">
                            <p className="text-[11px] text-red-400 font-medium">Pending Amount</p>
                            <p className="text-base font-bold text-red-600">₹{summaryStats.totalPending.toFixed(0)}</p>
                        </div>
                    </div>

                    {/* Customer-wise breakdown */}
                    <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            Customer-wise Breakdown
                        </p>
                        <div className="flex flex-col gap-2">
                            {customers.map((customer) => {
                                const stats = getCustomerStats(customer);
                                return (
                                    <div
                                        key={`summary-${customer.id}`}
                                        className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5"
                                    >
                                        <span className={`flex-shrink-0 w-2 h-2 rounded-full ${statusDot[stats.status]}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-gray-900 truncate">{customer.name}</p>
                                            <p className="text-[10px] text-gray-400">
                                                {stats.morningLiters}L morning · {stats.eveningLiters}L evening · {stats.totalLiters}L total · ₹{stats.price}/L
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-xs font-bold text-gray-900">₹{stats.deliveredAmount.toFixed(0)}</p>
                                            <p className={`text-[10px] font-semibold ${statusText[stats.status]}`}>
                                                {statusLabel[stats.status]}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                            {customers.length === 0 && (
                                <p className="text-xs text-gray-400 text-center py-3">No active customers yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {customers.map((customer, i) => {
                        const delivery = todayDeliveries[customer.id];
                        const isOpen = !!expanded[customer.id];
                        const status = getStatus(customer);
                        const hasMorning = Number(customer.morning_liters) > 0;
                        const hasEvening = Number(customer.evening_liters) > 0;

                        return (
                            <div
                                key={customer.id}
                                className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                  transition-all duration-200
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                                style={{ transitionDelay: `${i * 40}ms`, transition: "opacity 0.3s ease, transform 0.3s ease" }}
                            >
                                {/* ── Collapsed row: name + ID + status dot ── */}
                                <button
                                    onClick={() => toggleExpand(customer.id)}
                                    className="w-full flex items-center gap-3 p-4 active:bg-gray-50 transition-colors duration-100"
                                >
                                    <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${statusDot[status]}`} />

                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-sm font-bold text-gray-900 truncate">{customer.name}</p>
                                        <p className="text-xs text-gray-400">ID #{customer.id}</p>
                                    </div>

                                    <span className={`text-[11px] font-semibold ${statusText[status]}`}>
                                        {statusLabel[status]}
                                    </span>

                                    <span className="flex-shrink-0 text-gray-400">
                                        <ChevronDownIcon open={isOpen} />
                                    </span>
                                </button>

                                {/* ── Expanded details + delivery buttons ── */}
                                {isOpen && (
                                    <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
                                        {/* Customer detail chips */}
                                        <div className="flex flex-wrap gap-2">
                                            <span className="flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
                                                <PhoneIcon /> {customer.phone}
                                            </span>
                                            {hasMorning && (
                                                <span className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full px-3 py-1.5">
                                                    <SunIcon /> {customer.morning_liters}L
                                                </span>
                                            )}
                                            {hasEvening && (
                                                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full px-3 py-1.5">
                                                    <MoonIcon /> {customer.evening_liters}L
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full px-3 py-1.5">
                                                <RupeeSmallIcon /> {customer.price_per_liter}/L
                                            </span>
                                        </div>

                                        {/* Morning delivery */}
                                        {hasMorning && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => markMorning(customer)}
                                                    disabled={delivery?.morning_status === "delivered"}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-100
                            ${delivery?.morning_status === "delivered"
                                                            ? "bg-amber-50 text-amber-600 border border-amber-200"
                                                            : "bg-green-600 text-white active:bg-green-700"
                                                        }`}
                                                >
                                                    {delivery?.morning_status === "delivered" ? (
                                                        <>
                                                            <CheckIcon /> Morning Delivered
                                                        </>
                                                    ) : (
                                                        <>
                                                            <SunIcon /> Mark Morning
                                                        </>
                                                    )}
                                                </button>

                                                {delivery?.morning_status === "delivered" && (
                                                    <button
                                                        onClick={() => undoMorning(delivery.id)}
                                                        className="flex-shrink-0 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-500 active:bg-red-100"
                                                        aria-label="Undo morning delivery"
                                                    >
                                                        <UndoIcon />
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {/* Evening delivery */}
                                        {hasEvening && (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => markEvening(customer)}
                                                    disabled={delivery?.evening_status === "delivered"}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-100
                            ${delivery?.evening_status === "delivered"
                                                            ? "bg-amber-50 text-amber-600 border border-amber-200"
                                                            : "bg-blue-600 text-white active:bg-blue-700"
                                                        }`}
                                                >
                                                    {delivery?.evening_status === "delivered" ? (
                                                        <>
                                                            <CheckIcon /> Evening Delivered
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MoonIcon /> Mark Evening
                                                        </>
                                                    )}
                                                </button>

                                                {delivery?.evening_status === "delivered" && (
                                                    <button
                                                        onClick={() => undoEvening(delivery.id)}
                                                        className="flex-shrink-0 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-500 active:bg-red-100"
                                                        aria-label="Undo evening delivery"
                                                    >
                                                        <UndoIcon />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {customers.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <span className="bg-green-50 text-green-400 rounded-full p-4 mb-3">
                                <TruckSmallIcon />
                            </span>
                            <p className="text-sm font-semibold text-gray-500">No active customers yet</p>
                            <p className="text-xs text-gray-400 mt-1">Add a customer to start tracking deliveries.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}