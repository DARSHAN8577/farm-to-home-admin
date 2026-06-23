"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// ── Types ────────────────────────────────────────────────────────────────────

type Customer = {
    id: string;
    customer_code: string;
    name: string;
    price_per_liter: number;
};

type BillRecord = {
    id: string;
    customer_id: string;
    customer_name: string;
    customer_code: string;
    bill_start_date: string;
    bill_end_date: string;
    bill_month: number;
    bill_year: number;
    normal_liters: number;
    extra_liters: number;
    missed_days: number;
    paused_days: number;
    total_liters: number;
    price_per_liter: number;
    total_amount: number;
    paid_status: "paid" | "unpaid";
    generated_at: string;
};

type FilterType = "all" | "paid" | "unpaid";
type GenerateMode = "all" | "selected";
type Step = "list" | "configure" | "select";

// ── Icons ────────────────────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
const ChevronDownIcon = ({ open }: { open: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const RupeeIcon = () => (
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
const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);
const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const AlertIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const SpinnerIcon = () => (
    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
);

// ── Farm Landscape SVG ───────────────────────────────────────────────────────

const FarmLandscape = () => (
    <svg viewBox="0 0 390 120" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
            <linearGradient id="skyGradBills" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <rect width="390" height="120" fill="url(#skyGradBills)" />
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function isoToDisplay(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function monthStartEnd(year: number, month: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
    };
}

function todayIso() {
    return new Date().toISOString().split("T")[0];
}

function firstOfMonthIso() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
}

// ── Confirmation Modal ────────────────────────────────────────────────────────

function ConfirmModal({
    onConfirm,
    onCancel,
    title,
    body,
    confirmLabel = "Confirm",
    danger = false,
}: {
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    body: React.ReactNode;
    confirmLabel?: string;
    danger?: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white rounded-t-3xl shadow-2xl p-6 pb-8 animate-slide-up">
                <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 rounded-full p-2 ${danger ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-500"}`}>
                        <AlertIcon />
                    </span>
                    <div>
                        <p className="text-gray-900 font-bold text-base">{title}</p>
                        <div className="text-gray-500 text-sm mt-1 leading-relaxed">{body}</div>
                    </div>
                </div>
                <div className="flex gap-3 mt-5">
                    <button onClick={onCancel} className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 active:bg-gray-200">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold text-white ${danger ? "bg-red-500 active:bg-red-600" : "bg-green-600 active:bg-green-700"}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ message, type }: { message: string; type: "success" | "error" | "info" }) {
    const colors = {
        success: "bg-green-600",
        error: "bg-red-500",
        info: "bg-blue-600",
    };
    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] ${colors[type]} text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl max-w-xs text-center`}>
            {message}
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function BillsPage() {
    // State: bills list
    const [bills, setBills] = useState<BillRecord[]>([]);
    const [filter, setFilter] = useState<FilterType>("all");
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [billsLoading, setBillsLoading] = useState(true);

    // State: generate panel
    const [panelOpen, setPanelOpen] = useState(false);
    const [generateMode, setGenerateMode] = useState<GenerateMode>("all");
    const [periodMode, setPeriodMode] = useState<"current" | "custom">("current");
    const [startDate, setStartDate] = useState(firstOfMonthIso());
    const [endDate, setEndDate] = useState(todayIso());

    // State: customer selection
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [customersLoading, setCustomersLoading] = useState(false);

    // State: generation flow
    const [generating, setGenerating] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmPayBillId, setConfirmPayBillId] = useState<string | null>(null);
    const [confirmUnpayBillId, setConfirmUnpayBillId] = useState<string | null>(null);

    // State: toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

    const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ── Load bills ──────────────────────────────────────────────────────────────

    const loadBills = useCallback(async () => {
        setBillsLoading(true);
        const { data, error } = await supabase
            .from("bills")
            .select(`
        id, customer_id, bill_start_date, bill_end_date, bill_month, bill_year,
        normal_liters, extra_liters, missed_days, paused_days,
        total_liters, price_per_liter, total_amount, paid_status, generated_at
      `)
            .order("generated_at", { ascending: false });

        if (error) {
            showToast("Failed to load bills", "error");
            setBillsLoading(false);
            return;
        }

        const { data: customersData } = await supabase.from("customers").select("id, customer_code, name");

        const enriched: BillRecord[] = (data || []).map((bill) => {
            const customer = customersData?.find((c) => c.id === bill.customer_id);
            return {
                ...bill,
                customer_name: customer?.name || "Unknown",
                customer_code: customer?.customer_code || "",
            };
        });

        setBills(enriched);
        setBillsLoading(false);
    }, []);

    useEffect(() => {
        loadBills();
    }, [loadBills]);

    // ── Load customers for selection ────────────────────────────────────────────

    useEffect(() => {
        if (!panelOpen) return;
        setCustomersLoading(true);
        supabase
            .from("customers")
            .select("id, customer_code, name, price_per_liter")
            .order("name")
            .then(({ data }) => {
                setCustomers(data || []);
                setCustomersLoading(false);
            });
    }, [panelOpen]);

    // ── Set date range when period mode changes ─────────────────────────────────

    useEffect(() => {
        if (periodMode === "current") {
            const now = new Date();
            const { start, end } = monthStartEnd(now.getFullYear(), now.getMonth() + 1);
            setStartDate(start);
            setEndDate(end);
        }
    }, [periodMode]);

    // ── Toggle customer selection ───────────────────────────────────────────────

    const toggleCustomer = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const selectAll = () => setSelectedIds(new Set(customers.map((c) => c.id)));
    const clearAll = () => setSelectedIds(new Set());

    // ── Generate bills ──────────────────────────────────────────────────────────

    const handleGenerateConfirmed = async () => {
        setShowConfirm(false);
        setGenerating(true);

        const targetCustomers =
            generateMode === "all" ? customers : customers.filter((c) => selectedIds.has(c.id));

        if (targetCustomers.length === 0) {
            showToast("No customers selected", "error");
            setGenerating(false);
            return;
        }

        const billMonth = new Date(startDate).getMonth() + 1;
        const billYear = new Date(startDate).getFullYear();

        let skipped = 0;
        let created = 0;

        for (const customer of targetCustomers) {
            // ── Duplicate protection ──────────────────────────────────────────────
            const { data: existing } = await supabase
                .from("bills")
                .select("id")
                .eq("customer_id", customer.id)
                .eq("bill_start_date", startDate)
                .eq("bill_end_date", endDate)
                .maybeSingle();

            if (existing) {
                skipped++;
                continue;
            }

            // ── Fetch deliveries in period ────────────────────────────────────────
            const { data: deliveries } = await supabase
                .from("deliveries")
                .select("total_liters, status, delivery_date")
                .eq("customer_id", customer.id)
                .gte("delivery_date", startDate)
                .lte("delivery_date", endDate);

            const normalLiters = (deliveries || [])
                .filter((d) => d.status !== "missed")
                .reduce((sum, d) => sum + Number(d.total_liters || 0), 0);

            const missedDays = (deliveries || []).filter((d) => d.status === "missed").length;

            // ── Fetch approved extra requests in period ───────────────────────────
            const { data: extras } = await supabase
                .from("extra_requests")
                .select("liters, request_date")
                .eq("customer_id", customer.id)
                .eq("status", "approved")
                .gte("request_date", startDate)
                .lte("request_date", endDate);

            const extraLiters = (extras || []).reduce((sum, e) => sum + Number(e.liters || 0), 0);

            // ── Fetch approved pause requests overlapping period ──────────────────
            const { data: pauses } = await supabase
                .from("pause_requests")
                .select("pause_start, pause_end")
                .eq("customer_id", customer.id)
                .eq("status", "approved")
                .lte("pause_start", endDate)
                .gte("pause_end", startDate);

            // Count paused days that fall within the billing window
            let pausedDays = 0;
            for (const pause of pauses || []) {
                const pStart = new Date(Math.max(new Date(pause.pause_start).getTime(), new Date(startDate).getTime()));
                const pEnd = new Date(Math.min(new Date(pause.pause_end).getTime(), new Date(endDate).getTime()));
                const diff = Math.floor((pEnd.getTime() - pStart.getTime()) / 86400000) + 1;
                if (diff > 0) pausedDays += diff;
            }

            const totalLiters = normalLiters + extraLiters;
            const pricePerLiter = Number(customer.price_per_liter || 0);
            const totalAmount = totalLiters * pricePerLiter;

            await supabase.from("bills").insert([
                {
                    customer_id: customer.id,
                    bill_start_date: startDate,
                    bill_end_date: endDate,
                    bill_month: billMonth,
                    bill_year: billYear,
                    normal_liters: normalLiters,
                    extra_liters: extraLiters,
                    missed_days: missedDays,
                    paused_days: pausedDays,
                    total_liters: totalLiters,
                    price_per_liter: pricePerLiter,
                    total_amount: totalAmount,
                    paid_status: "unpaid",
                    generated_at: new Date().toISOString(),
                },
            ]);

            created++;
        }

        await loadBills();
        setGenerating(false);
        setPanelOpen(false);

        if (skipped > 0 && created === 0) {
            showToast(`All bills already exist for this period`, "info");
        } else if (skipped > 0) {
            showToast(`Generated ${created} bill(s). ${skipped} skipped (duplicates)`, "info");
        } else {
            showToast(`Generated ${created} bill(s) successfully`, "success");
        }
    };

    // ── Payment actions ─────────────────────────────────────────────────────────

    const markPaid = async (billId: string) => {
        await supabase.from("bills").update({ paid_status: "paid" }).eq("id", billId);
        setBills((prev) => prev.map((b) => (b.id === billId ? { ...b, paid_status: "paid" } : b)));
        showToast("Marked as paid");
        setConfirmPayBillId(null);
    };

    const markUnpaid = async (billId: string) => {
        await supabase.from("bills").update({ paid_status: "unpaid" }).eq("id", billId);
        setBills((prev) => prev.map((b) => (b.id === billId ? { ...b, paid_status: "unpaid" } : b)));
        showToast("Marked as unpaid", "info");
        setConfirmUnpayBillId(null);
    };

    // ── Filtered bills ──────────────────────────────────────────────────────────

    const filteredBills = bills.filter((b) => {
        if (filter === "paid") return b.paid_status === "paid";
        if (filter === "unpaid") return b.paid_status === "unpaid";
        return true;
    });

    // ── Stats ───────────────────────────────────────────────────────────────────

    const totalRevenue = bills.reduce((sum, b) => sum + b.total_amount, 0);
    const paidCount = bills.filter((b) => b.paid_status === "paid").length;
    const unpaidCount = bills.filter((b) => b.paid_status === "unpaid").length;
    const unpaidAmount = bills.filter((b) => b.paid_status === "unpaid").reduce((s, b) => s + b.total_amount, 0);

    const canGenerate =
        startDate &&
        endDate &&
        startDate <= endDate &&
        (generateMode === "all" || selectedIds.size > 0);

    // ── Render ──────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-white font-sans antialiased">

            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} />}

            {/* Confirm: Generate Bills */}
            {showConfirm && (
                <ConfirmModal
                    title="Generate Bills?"
                    body={
                        <span>
                            This will generate bills from{" "}
                            <strong>{isoToDisplay(startDate)}</strong> to{" "}
                            <strong>{isoToDisplay(endDate)}</strong> for{" "}
                            <strong>{generateMode === "all" ? "all customers" : `${selectedIds.size} customer(s)`}</strong>.
                            Existing bills for this period will be skipped.
                        </span>
                    }
                    confirmLabel="Generate"
                    onConfirm={handleGenerateConfirmed}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            {/* Confirm: Mark Paid */}
            {confirmPayBillId && (
                <ConfirmModal
                    title="Mark as Paid?"
                    body="This will record payment for this bill."
                    confirmLabel="Mark Paid"
                    onConfirm={() => markPaid(confirmPayBillId)}
                    onCancel={() => setConfirmPayBillId(null)}
                />
            )}

            {/* Confirm: Mark Unpaid */}
            {confirmUnpayBillId && (
                <ConfirmModal
                    title="Mark as Unpaid?"
                    body="This will revert the payment status for this bill."
                    confirmLabel="Mark Unpaid"
                    danger
                    onConfirm={() => markUnpaid(confirmUnpayBillId)}
                    onCancel={() => setConfirmUnpayBillId(null)}
                />
            )}

            {/* ── Sticky Header ── */}
            <header className="sticky top-0 z-30 bg-gradient-to-b from-green-50 to-green-100">
                <div className="flex items-center justify-between px-4 pt-4 pb-1">
                    <div className="flex items-center gap-2">
                        <a
                            href="/"
                            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-200 text-green-600"
                            aria-label="Back"
                        >
                            <ChevronLeftIcon />
                        </a>
                        <div>
                            <h1 className="text-gray-900 font-bold text-base leading-tight">Monthly Bills</h1>
                            <p className="text-gray-500 text-xs">Admin billing control</p>
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
            <main className="relative z-10 bg-white rounded-t-3xl -mt-3 px-4 pt-5 pb-24 min-h-screen">

                {/* ── Summary Strip ── */}
                <section className="mb-5">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-3.5 col-span-2">
                            <p className="text-[11px] text-green-700 font-semibold">Total Revenue</p>
                            <p className="text-2xl font-black text-green-700 mt-0.5 leading-none">
                                ₹{totalRevenue.toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3">
                            <p className="text-[10px] text-blue-700 font-semibold">Paid</p>
                            <p className="text-xl font-black text-blue-700 mt-0.5 leading-none">{paidCount}</p>
                        </div>
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-3">
                            <p className="text-[10px] text-red-600 font-semibold">Unpaid</p>
                            <p className="text-xl font-black text-red-500 mt-0.5 leading-none">{unpaidCount}</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3">
                            <p className="text-[10px] text-amber-700 font-semibold">Due (₹)</p>
                            <p className="text-sm font-black text-amber-600 mt-0.5 leading-none truncate">
                                {unpaidAmount.toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Generate Bills Panel ── */}
                <section className="mb-5">
                    <button
                        onClick={() => setPanelOpen((v) => !v)}
                        className="w-full flex items-center justify-between bg-green-600 text-white rounded-2xl px-4 py-3.5 font-semibold text-sm shadow-md active:bg-green-700 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <PlusIcon />
                            <span>Generate Bills</span>
                        </div>
                        <ChevronDownIcon open={panelOpen} />
                    </button>

                    {panelOpen && (
                        <div className="mt-3 bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-5">

                            {/* Mode selector */}
                            <div>
                                <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Generate For</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setGenerateMode("all")}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors
                      ${generateMode === "all"
                                                ? "bg-green-600 text-white border-green-600"
                                                : "bg-white text-gray-700 border-gray-200 active:bg-gray-50"}`}
                                    >
                                        <UsersIcon />
                                        All Customers
                                    </button>
                                    <button
                                        onClick={() => setGenerateMode("selected")}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors
                      ${generateMode === "selected"
                                                ? "bg-green-600 text-white border-green-600"
                                                : "bg-white text-gray-700 border-gray-200 active:bg-gray-50"}`}
                                    >
                                        <CheckIcon />
                                        Select Customers
                                    </button>
                                </div>
                            </div>

                            {/* Customer checklist */}
                            {generateMode === "selected" && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Customers</p>
                                        <div className="flex gap-2">
                                            <button onClick={selectAll} className="text-xs text-green-600 font-semibold active:opacity-70">
                                                All
                                            </button>
                                            <span className="text-gray-300">·</span>
                                            <button onClick={clearAll} className="text-xs text-red-500 font-semibold active:opacity-70">
                                                Clear
                                            </button>
                                        </div>
                                    </div>

                                    {customersLoading ? (
                                        <div className="flex justify-center py-6">
                                            <SpinnerIcon />
                                        </div>
                                    ) : (
                                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden max-h-56 overflow-y-auto divide-y divide-gray-50">
                                            {customers.map((c) => {
                                                const selected = selectedIds.has(c.id);
                                                return (
                                                    <button
                                                        key={c.id}
                                                        onClick={() => toggleCustomer(c.id)}
                                                        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${selected ? "bg-green-50" : "active:bg-gray-50"}`}
                                                    >
                                                        <span
                                                            className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
                                ${selected ? "bg-green-600 border-green-600 text-white" : "border-gray-300 bg-white"}`}
                                                        >
                                                            {selected && <CheckIcon />}
                                                        </span>
                                                        <span className="flex-1 text-left">
                                                            <span className="block text-sm font-semibold text-gray-800">{c.name}</span>
                                                            <span className="text-xs text-gray-400">#{c.customer_code} · ₹{c.price_per_liter}/L</span>
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {selectedIds.size > 0 && (
                                        <p className="text-xs text-green-700 font-semibold mt-2">{selectedIds.size} customer(s) selected</p>
                                    )}
                                </div>
                            )}

                            {/* Period selector */}
                            <div>
                                <p className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Billing Period</p>
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <button
                                        onClick={() => setPeriodMode("current")}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors
                      ${periodMode === "current"
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-200"}`}
                                    >
                                        <CalendarIcon />
                                        This Month
                                    </button>
                                    <button
                                        onClick={() => setPeriodMode("custom")}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors
                      ${periodMode === "custom"
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-200"}`}
                                    >
                                        <CalendarIcon />
                                        Custom Range
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] text-gray-500 font-semibold mb-1.5">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            disabled={periodMode === "current"}
                                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-gray-500 font-semibold mb-1.5">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            disabled={periodMode === "current"}
                                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Generate CTA */}
                            <button
                                onClick={() => {
                                    if (!canGenerate) return;
                                    // Ensure customers are loaded for "all" mode
                                    if (generateMode === "all" && customers.length === 0) {
                                        showToast("Loading customers…", "info");
                                        return;
                                    }
                                    setShowConfirm(true);
                                }}
                                disabled={!canGenerate || generating}
                                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-colors shadow-sm
                  ${canGenerate && !generating
                                        ? "bg-green-600 text-white active:bg-green-700"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                            >
                                {generating ? (
                                    <>
                                        <SpinnerIcon />
                                        Generating…
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon />
                                        Generate Bills
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </section>

                {/* ── Filter Tabs ── */}
                <section className="mb-4">
                    <div className="flex gap-2">
                        {(["all", "paid", "unpaid"] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-colors border
                  ${filter === f
                                        ? f === "paid"
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : f === "unpaid"
                                                ? "bg-red-500 text-white border-red-500"
                                                : "bg-gray-800 text-white border-gray-800"
                                        : "bg-white text-gray-500 border-gray-200"}`}
                            >
                                {f === "all" ? `All (${bills.length})` : f === "paid" ? `Paid (${paidCount})` : `Unpaid (${unpaidCount})`}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── Bill List ── */}
                <section>
                    {billsLoading ? (
                        <div className="flex justify-center py-20">
                            <SpinnerIcon />
                        </div>
                    ) : filteredBills.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <span className="bg-green-50 text-green-400 rounded-full p-4 mb-3">
                                <WalletIcon />
                            </span>
                            <p className="text-sm font-semibold text-gray-500">No bills found</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {bills.length === 0 ? "Use Generate Bills to create the first batch." : "Try a different filter."}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {filteredBills.map((bill, i) => {
                                const isOpen = !!expanded[bill.id];
                                const isPaid = bill.paid_status === "paid";

                                return (
                                    <div
                                        key={bill.id}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                                        style={{ animationDelay: `${i * 30}ms` }}
                                    >
                                        {/* Collapsed row */}
                                        <button
                                            onClick={() => setExpanded((p) => ({ ...p, [bill.id]: !p[bill.id] }))}
                                            className="w-full flex items-center gap-3 p-4 active:bg-gray-50 transition-colors"
                                        >
                                            <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${isPaid ? "bg-green-500" : "bg-red-400"}`} />
                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="text-sm font-bold text-gray-900 truncate">{bill.customer_name}</p>
                                                <p className="text-xs text-gray-400">
                                                    #{bill.customer_code} · {isoToDisplay(bill.bill_start_date)} – {isoToDisplay(bill.bill_end_date)}
                                                </p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-bold text-gray-900">₹{bill.total_amount.toLocaleString("en-IN")}</p>
                                                <p className={`text-[11px] font-semibold ${isPaid ? "text-green-600" : "text-red-500"}`}>
                                                    {isPaid ? "Paid" : "Unpaid"}
                                                </p>
                                            </div>
                                            <span className="flex-shrink-0 text-gray-400 ml-1">
                                                <ChevronDownIcon open={isOpen} />
                                            </span>
                                        </button>

                                        {/* Expanded details */}
                                        {isOpen && (
                                            <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">

                                                {/* Detail grid */}
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-blue-50 rounded-xl p-2.5">
                                                        <p className="text-[10px] text-blue-600 font-semibold">Normal Liters</p>
                                                        <p className="text-sm font-bold text-blue-700">{bill.normal_liters}L</p>
                                                    </div>
                                                    <div className="bg-purple-50 rounded-xl p-2.5">
                                                        <p className="text-[10px] text-purple-600 font-semibold">Extra Liters</p>
                                                        <p className="text-sm font-bold text-purple-700">{bill.extra_liters}L</p>
                                                    </div>
                                                    <div className="bg-red-50 rounded-xl p-2.5">
                                                        <p className="text-[10px] text-red-500 font-semibold">Missed Days</p>
                                                        <p className="text-sm font-bold text-red-500">{bill.missed_days}</p>
                                                    </div>
                                                    <div className="bg-orange-50 rounded-xl p-2.5">
                                                        <p className="text-[10px] text-orange-500 font-semibold">Paused Days</p>
                                                        <p className="text-sm font-bold text-orange-500">{bill.paused_days}</p>
                                                    </div>
                                                </div>

                                                {/* Totals row */}
                                                <div className="flex gap-2">
                                                    <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full px-3 py-1.5">
                                                        <DropletIcon /> {bill.total_liters}L total
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full px-3 py-1.5">
                                                        ₹{bill.price_per_liter}/L
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full px-3 py-1.5">
                                                        <RupeeIcon /> ₹{bill.total_amount.toLocaleString("en-IN")}
                                                    </span>
                                                </div>

                                                {/* Generated timestamp */}
                                                <p className="text-[10px] text-gray-400">
                                                    Generated {new Date(bill.generated_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                                                </p>

                                                {/* Payment action */}
                                                <div className="flex items-center gap-2 pt-1">
                                                    {isPaid ? (
                                                        <>
                                                            <button
                                                                disabled
                                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-green-50 text-green-600 border border-green-200"
                                                            >
                                                                <CheckIcon /> Paid
                                                            </button>
                                                            <button
                                                                onClick={() => setConfirmUnpayBillId(bill.id)}
                                                                className="flex-shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-500 active:bg-red-100"
                                                                aria-label="Mark unpaid"
                                                            >
                                                                <UndoIcon />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={() => setConfirmPayBillId(bill.id)}
                                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white active:bg-green-700 transition-colors"
                                                        >
                                                            <RupeeIcon /> Mark Paid
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>

            <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.25s ease-out;
        }
      `}</style>
        </div>
    );
}