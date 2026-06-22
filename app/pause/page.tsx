"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ChevronLeftIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const PauseSmallIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
);

const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const TagIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M20.59 13.41L11 21l-9-9 8.59-8.59A2 2 0 0 1 12 3h7a2 2 0 0 1 2 2v7a2 2 0 0 1-.41 1.41z" />
        <circle cx="14.5" cy="7.5" r="0.5" fill="currentColor" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const XSmallIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
);

const FarmLandscape = () => (
    <svg viewBox="0 0 390 120" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
            <linearGradient id="skyGrad4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <rect width="390" height="120" fill="url(#skyGrad4)" />
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

type PauseType = {
    id: string;
    start_date: string;
    end_date: string;
    pause_type: string;
    status: string;
    customer_id: string;
    customers: {
        customer_code: string;
        name: string;
    }[];
};

export default function PausePage() {
    const [pauses, setPauses] = useState<PauseType[]>([]);
    const [loaded, setLoaded] = useState(false);

    const fetchPauses = async () => {
        const { data, error } = await supabase
            .from("pause_requests")
            .select(`
                id,
                start_date,
                end_date,
                pause_type,
                status,
                customer_id,
                customers!pause_requests_customer_id_fkey (
                    customer_code,
                    name
                )
            `);
        if (error) console.error("fetchPauses error:", error);
        if (!error && data) setPauses(data as PauseType[]);
        setLoaded(true);
    };

    const approvePause = async (id: string) => {
        await supabase.from("pause_requests").update({ status: "approved" }).eq("id", id);
        fetchPauses();
    };

    const rejectPause = async (id: string) => {
        await supabase.from("pause_requests").update({ status: "rejected" }).eq("id", id);
        fetchPauses();
    };

    const deletePause = async (id: string) => {
        await supabase.from("pause_requests").delete().eq("id", id);
        fetchPauses();
    };

    useEffect(() => { fetchPauses(); }, []);

    const pendingCount = pauses.filter((p) => p.status === "pending").length;
    const approvedCount = pauses.filter((p) => p.status === "approved").length;
    const rejectedCount = pauses.filter((p) => p.status === "rejected").length;

    const statusDot: Record<string, string> = {
        pending: "bg-amber-400",
        approved: "bg-green-500",
        rejected: "bg-red-400",
    };
    const statusBadge: Record<string, string> = {
        pending: "bg-amber-50 text-amber-700",
        approved: "bg-green-50 text-green-700",
        rejected: "bg-red-50 text-red-600",
    };
    const statusLabel: Record<string, string> = {
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
    };

    const formatDate = (d: string) => {
        if (!d) return "—";
        return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    };

    return (
        <div className="min-h-screen bg-white font-sans antialiased">

            <header className="sticky top-0 z-30 bg-gradient-to-b from-green-50 to-green-100">
                <div className="flex items-center justify-between px-4 pt-4 pb-1">

                    <div className="flex items-center gap-2">
                        <a href="/" className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-200 text-green-600" aria-label="Back to dashboard">
                            <ChevronLeftIcon />
                        </a>
                        <div>
                            <h1 className="text-gray-900 font-bold text-base leading-tight">Pause Requests</h1>
                            <p className="text-gray-500 text-xs">{pendingCount} pending</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-full shadow-sm border border-amber-200 px-3 py-1.5 flex items-center gap-1.5 text-amber-500">
                        <PauseSmallIcon />
                        <span className="text-xs font-bold">{pauses.length}</span>
                    </div>

                </div>
                <div className="mt-1 -mb-1">
                    <FarmLandscape />
                </div>
            </header>

            <main className="relative z-10 bg-white rounded-t-3xl -mt-3 px-4 pt-5 pb-10 min-h-screen">

                <section className="mb-6">
                    <p className="text-sm font-bold text-gray-800 mb-3">Overview</p>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3.5">
                            <p className="text-[11px] text-amber-700 font-semibold">Pending</p>
                            <p className="text-lg font-black text-amber-600 mt-1 leading-none">{pendingCount}</p>
                        </div>
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-3.5">
                            <p className="text-[11px] text-green-700 font-semibold">Approved</p>
                            <p className="text-lg font-black text-green-700 mt-1 leading-none">{approvedCount}</p>
                        </div>
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-3.5">
                            <p className="text-[11px] text-red-600 font-semibold">Rejected</p>
                            <p className="text-lg font-black text-red-500 mt-1 leading-none">{rejectedCount}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <p className="text-sm font-bold text-gray-800 mb-3">All Requests</p>
                    <div className="flex flex-col gap-3">

                        {pauses.map((pause, i) => {
                            const customer = pause.customers?.[0];
                            return (
                                <div
                                    key={pause.id}
                                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                                    style={{ transitionDelay: `${i * 40}ms`, transition: "opacity 0.3s ease, transform 0.3s ease" }}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${statusDot[pause.status]}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">
                                                {customer?.name || "Unknown customer"}
                                            </p>
                                            <p className="text-xs text-gray-400">ID #{customer?.customer_code || "—"}</p>
                                        </div>
                                        <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${statusBadge[pause.status]}`}>
                                            {statusLabel[pause.status] || pause.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="flex items-center gap-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
                                            <CalendarIcon /> {formatDate(pause.start_date)} → {formatDate(pause.end_date)}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full px-3 py-1.5">
                                            <TagIcon /> {pause.pause_type}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {pause.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => approvePause(pause.id)}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white active:bg-green-700 transition-colors duration-100"
                                                >
                                                    <CheckIcon /> Approve
                                                </button>
                                                <button
                                                    onClick={() => rejectPause(pause.id)}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-200 active:bg-amber-100 transition-colors duration-100"
                                                >
                                                    <XSmallIcon /> Reject
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => deletePause(pause.id)}
                                            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-500 active:bg-red-100 transition-colors duration-100 ${pause.status === "pending" ? "px-3" : "flex-1"}`}
                                        >
                                            <TrashIcon /> {pause.status === "pending" ? "" : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {pauses.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <span className="bg-amber-50 text-amber-400 rounded-full p-4 mb-3">
                                    <PauseSmallIcon />
                                </span>
                                <p className="text-sm font-semibold text-gray-500">No pause requests yet</p>
                                <p className="text-xs text-gray-400 mt-1">Customer pause requests will appear here.</p>
                            </div>
                        )}

                    </div>
                </section>

            </main>
        </div>
    );
}