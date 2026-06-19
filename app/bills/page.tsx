"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ── Inline SVG Icons (matching home dashboard / deliveries icon language) ────
const ChevronLeftIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
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
const RupeeSmallIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M6 3h12M6 8h12M6 13l9 8M6 8a5 5 0 0 1 5 5" />
    </svg>
);
const DropletIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 2.69s-6 6.34-6 10.62a6 6 0 0 0 12 0c0-4.28-6-10.62-6-10.62z" />
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
const WalletIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />
        <path d="M16 12h2" />
    </svg>
);

// ── Farm Landscape SVG Background (same as home dashboard / deliveries) ──────
const FarmLandscape = () => (
    <svg viewBox="0 0 390 120" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
            <linearGradient id="skyGrad3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <rect width="390" height="120" fill="url(#skyGrad3)" />
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

type BillType = {
    id: string;
    customer_id: string;
    customer_name: string;
    total_liters: number;
    total_amount: number;
    paid_status: string;
};

export default function BillsPage() {
    const [bills, setBills] = useState<BillType[]>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [loaded, setLoaded] = useState(false);

    const generateBills = async () => {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const { data: existingBills } = await supabase
            .from("bills")
            .select("*")
            .eq("bill_month", currentMonth)
            .eq("bill_year", currentYear);

        if (existingBills && existingBills.length > 0) {
            const { data: customers } = await supabase.from("customers").select("*");

            const finalBills = existingBills.map((bill) => {
                const customer = customers?.find((c) => c.id === bill.customer_id);

                return {
                    id: bill.id,
                    customer_id: customer?.customer_code || "",
                    customer_name: customer?.name || "",
                    total_liters: Number(bill.total_liters),
                    total_amount: Number(bill.total_amount),
                    paid_status: bill.paid_status,
                };
            });

            setBills(finalBills);
            setLoaded(true);
            return;
        }

        const { data: customers } = await supabase.from("customers").select("*");

        const generatedBills: BillType[] = [];

        for (const customer of customers || []) {
            const { data: deliveries } = await supabase
                .from("deliveries")
                .select("*")
                .eq("customer_id", customer.id);

            const totalLiters =
                deliveries?.reduce((sum, item) => sum + Number(item.total_liters), 0) || 0;

            const totalAmount =
                deliveries?.reduce((sum, item) => sum + Number(item.total_amount), 0) || 0;

            const { data: newBill } = await supabase
                .from("bills")
                .insert([
                    {
                        customer_id: customer.id,
                        bill_month: currentMonth,
                        bill_year: currentYear,
                        total_liters: totalLiters,
                        total_amount: totalAmount,
                        paid_status: "unpaid",
                    },
                ])
                .select()
                .single();

            if (newBill) {
                generatedBills.push({
                    id: newBill.id,
                    customer_id: customer.customer_code,
                    customer_name: customer.name,
                    total_liters: totalLiters,
                    total_amount: totalAmount,
                    paid_status: "unpaid",
                });
            }
        }

        setBills(generatedBills);
        setLoaded(true);
    };

    const markPaid = async (billId: string) => {
        await supabase.from("bills").update({ paid_status: "paid" }).eq("id", billId);
        generateBills();
    };

    const markUnpaid = async (billId: string) => {
        await supabase.from("bills").update({ paid_status: "unpaid" }).eq("id", billId);
        generateBills();
    };

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        generateBills();
    }, []);

    // ── Summary stats ─────────────────────────────────────────────────────────
    const totalRevenue = bills.reduce((sum, b) => sum + b.total_amount, 0);
    const paidCount = bills.filter((b) => b.paid_status === "paid").length;
    const unpaidCount = bills.filter((b) => b.paid_status === "unpaid").length;

    const monthLabel = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

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
                            <h1 className="text-gray-900 font-bold text-base leading-tight">Monthly Bills</h1>
                            <p className="text-gray-500 text-xs">{monthLabel}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-full shadow-sm border border-green-200 px-3 py-1.5 flex items-center gap-1.5 text-green-600">
                        <WalletIcon />
                        <span className="text-xs font-bold">{bills.length}</span>
                    </div>
                </div>

                <div className="mt-1 -mb-1">
                    <FarmLandscape />
                </div>
            </header>

            {/* ── Scrollable Content ── */}
            <main className="relative z-10 bg-white rounded-t-3xl -mt-3 px-4 pt-5 pb-10 min-h-screen">
                {/* ── Summary strip ── */}
                <section className="mb-6">
                    <p className="text-sm font-bold text-gray-800 mb-3">This Month</p>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-3.5">
                            <p className="text-[11px] text-green-700 font-semibold">Revenue</p>
                            <p className="text-lg font-black text-green-700 mt-1 leading-none truncate">
                                ₹{totalRevenue.toLocaleString("en-IN")}
                            </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3.5">
                            <p className="text-[11px] text-blue-700 font-semibold">Paid</p>
                            <p className="text-lg font-black text-blue-700 mt-1 leading-none">{paidCount}</p>
                        </div>
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-3.5">
                            <p className="text-[11px] text-red-600 font-semibold">Unpaid</p>
                            <p className="text-lg font-black text-red-500 mt-1 leading-none">{unpaidCount}</p>
                        </div>
                    </div>
                </section>

                {/* ── Bill list ── */}
                <section>
                    <p className="text-sm font-bold text-gray-800 mb-3">All Bills</p>
                    <div className="flex flex-col gap-3">
                        {bills.map((bill, i) => {
                            const isOpen = !!expanded[bill.id];
                            const isPaid = bill.paid_status === "paid";

                            return (
                                <div
                                    key={bill.id}
                                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                    transition-all duration-200
                    ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                                    style={{ transitionDelay: `${i * 40}ms`, transition: "opacity 0.3s ease, transform 0.3s ease" }}
                                >
                                    {/* ── Collapsed row: name + ID + paid status dot ── */}
                                    <button
                                        onClick={() => toggleExpand(bill.id)}
                                        className="w-full flex items-center gap-3 p-4 active:bg-gray-50 transition-colors duration-100"
                                    >
                                        <span
                                            className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${isPaid ? "bg-green-500" : "bg-red-400"}`}
                                        />

                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="text-sm font-bold text-gray-900 truncate">{bill.customer_name}</p>
                                            <p className="text-xs text-gray-400">ID #{bill.customer_id}</p>
                                        </div>

                                        <span className={`text-[11px] font-semibold ${isPaid ? "text-green-600" : "text-red-500"}`}>
                                            {isPaid ? "Paid" : "Unpaid"}
                                        </span>

                                        <span className="flex-shrink-0 text-gray-400">
                                            <ChevronDownIcon open={isOpen} />
                                        </span>
                                    </button>

                                    {/* ── Expanded details + payment buttons ── */}
                                    {isOpen && (
                                        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
                                            {/* Bill detail chips */}
                                            <div className="flex flex-wrap gap-2">
                                                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full px-3 py-1.5">
                                                    <DropletIcon /> {bill.total_liters}L
                                                </span>
                                                <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full px-3 py-1.5">
                                                    <RupeeSmallIcon /> ₹{bill.total_amount.toLocaleString("en-IN")}
                                                </span>
                                            </div>

                                            {/* Payment action */}
                                            <div className="flex items-center gap-2">
                                                {isPaid ? (
                                                    <>
                                                        <button
                                                            disabled
                                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-amber-50 text-amber-600 border border-amber-200"
                                                        >
                                                            <CheckIcon /> Paid
                                                        </button>
                                                        <button
                                                            onClick={() => markUnpaid(bill.id)}
                                                            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-500 active:bg-red-100"
                                                            aria-label="Undo payment"
                                                        >
                                                            <UndoIcon />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => markPaid(bill.id)}
                                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white active:bg-green-700 transition-colors duration-100"
                                                    >
                                                        <RupeeSmallIcon /> Mark Paid
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {bills.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <span className="bg-green-50 text-green-400 rounded-full p-4 mb-3">
                                    <WalletIcon />
                                </span>
                                <p className="text-sm font-semibold text-gray-500">No bills yet</p>
                                <p className="text-xs text-gray-400 mt-1">Bills will appear here once generated.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}