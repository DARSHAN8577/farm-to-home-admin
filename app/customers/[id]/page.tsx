"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
const BackIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);
const MapPinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
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
const RupeeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M6 3h12M6 8h12M6 13l9 8M6 8a5 5 0 0 1 5 5" />
    </svg>
);
const CheckCircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" /><polyline points="9 12 12 15 16 9" />
    </svg>
);

// ── Farm Landscape SVG Background (compact variant) ─────────────────────────
const FarmLandscape = () => (
    <svg viewBox="0 0 390 90" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
            <linearGradient id="skyGrad4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <rect width="390" height="90" fill="url(#skyGrad4)" />
        <ellipse cx="80" cy="88" rx="130" ry="38" fill="#6ee7b7" opacity="0.5" />
        <ellipse cx="310" cy="90" rx="120" ry="34" fill="#6ee7b7" opacity="0.5" />
        <ellipse cx="160" cy="95" rx="160" ry="42" fill="#34d399" opacity="0.7" />
        <ellipse cx="350" cy="98" rx="110" ry="38" fill="#34d399" opacity="0.6" />
        <rect x="0" y="68" width="390" height="22" fill="#10b981" opacity="0.5" />
        <rect x="20" y="48" width="30" height="20" fill="#fef3c7" rx="2" />
        <polygon points="18,48 52,48 35,34" fill="#f59e0b" />
        <rect x="29" y="58" width="8" height="10" fill="#92400e" rx="1" />
    </svg>
);

type Field =
    | "name"
    | "phone"
    | "address"
    | "morning_liters"
    | "evening_liters"
    | "price_per_liter";

export default function EditCustomer() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState<Record<Field, string>>({
        name: "",
        phone: "",
        address: "",
        morning_liters: "",
        evening_liters: "",
        price_per_liter: "",
    });

    const fetchCustomer = async () => {
        setFetching(true);
        const { data, error } = await supabase
            .from("customers")
            .select("*")
            .eq("id", id)
            .single();

        if (!error && data) {
            setForm({
                name: data.name || "",
                phone: data.phone || "",
                address: data.address || "",
                morning_liters: data.morning_liters?.toString() || "",
                evening_liters: data.evening_liters?.toString() || "",
                price_per_liter: data.price_per_liter?.toString() || "",
            });
        }
        setFetching(false);
    };

    const setField = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [field]: e.target.value });

    const updateCustomer = async () => {
        setErrorMsg("");

        if (!form.name || !form.phone || !form.address || !form.price_per_liter) {
            setErrorMsg("Please fill all required fields");
            return;
        }

        setLoading(true);

        const { error } = await supabase
            .from("customers")
            .update({
                name: form.name,
                phone: form.phone,
                address: form.address,
                morning_liters: Number(form.morning_liters),
                evening_liters: Number(form.evening_liters),
                price_per_liter: Number(form.price_per_liter),
            })
            .eq("id", id);

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        setSuccess(true);
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    const fields: { field: Field; label: string; icon: React.ReactNode; type?: string; required?: boolean }[] = [
        { field: "name", label: "Customer name", icon: <UserIcon />, required: true },
        { field: "phone", label: "Phone number", icon: <PhoneIcon />, type: "tel", required: true },
        { field: "address", label: "Address", icon: <MapPinIcon />, required: true },
    ];

    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            {/* ── Sticky Header with Farm Landscape ── */}
            <header className="sticky top-0 z-30 bg-gradient-to-b from-green-50 to-green-100">
                <div className="flex items-center justify-between px-4 pt-4 pb-1">
                    <Link href="/customers" className="text-gray-600 p-1">
                        <BackIcon />
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-200">
                            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 4C10 8 6 14 6 22c4 0 8-2 10-6 0 4-2 8-6 10 6 0 12-4 14-10s0-12-8-12z" fill="#16a34a" />
                                <path d="M16 14 L16 28" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-gray-900 font-bold text-base leading-tight">Edit Customer</h1>
                            <p className="text-gray-500 text-xs">Update details</p>
                        </div>
                    </div>
                    <div className="w-7" />
                </div>
                <div className="mt-1 -mb-1">
                    <FarmLandscape />
                </div>
            </header>

            {/* ── Form ── */}
            <main className="relative z-10 bg-white rounded-t-3xl -mt-3 px-4 pt-6 pb-28 min-h-screen">
                {fetching ? (
                    <div className="flex flex-col gap-3 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-[58px] bg-gray-100 rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <>
                        <p className="text-sm font-bold text-gray-800 mb-3">Customer Details</p>

                        <div className="flex flex-col gap-3">
                            {fields.map(({ field, label, icon, type, required }) => (
                                <div key={field}>
                                    <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                                        <span className="text-green-600">{icon}</span>
                                        {label} {required && <span className="text-red-400">*</span>}
                                    </label>
                                    <input
                                        type={type || "text"}
                                        className="w-full bg-gray-50 border border-gray-100 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none text-sm text-gray-800 rounded-xl px-3.5 py-3 transition-colors"
                                        placeholder={label}
                                        value={form[field]}
                                        onChange={setField(field)}
                                    />
                                </div>
                            ))}

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                                        <span className="text-green-600"><SunIcon /></span>
                                        Morning (L)
                                    </label>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        className="w-full bg-gray-50 border border-gray-100 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none text-sm text-gray-800 rounded-xl px-3.5 py-3 transition-colors"
                                        placeholder="0"
                                        value={form.morning_liters}
                                        onChange={setField("morning_liters")}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                                        <span className="text-green-600"><MoonIcon /></span>
                                        Evening (L)
                                    </label>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        className="w-full bg-gray-50 border border-gray-100 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none text-sm text-gray-800 rounded-xl px-3.5 py-3 transition-colors"
                                        placeholder="0"
                                        value={form.evening_liters}
                                        onChange={setField("evening_liters")}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                                    <span className="text-green-600"><RupeeIcon /></span>
                                    Price per liter <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    className="w-full bg-gray-50 border border-gray-100 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none text-sm text-gray-800 rounded-xl px-3.5 py-3 transition-colors"
                                    placeholder="e.g. 60"
                                    value={form.price_per_liter}
                                    onChange={setField("price_per_liter")}
                                />
                            </div>

                            {errorMsg && (
                                <div className="bg-red-50 text-red-600 text-xs font-medium rounded-xl px-3.5 py-3">
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={updateCustomer}
                                disabled={loading}
                                className="w-full bg-green-600 disabled:bg-green-300 text-white font-semibold text-sm py-3.5 rounded-xl mt-2 shadow-sm active:scale-[0.98] transition-transform duration-100"
                            >
                                {loading ? "Updating..." : "Update Customer"}
                            </button>
                        </div>
                    </>
                )}
            </main>

            {/* ── Success Popup ── */}
            {success && (
                <div className="fixed inset-0 z-40 flex items-center justify-center px-6 bg-black/40 animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl text-center animate-[popIn_0.25s_ease-out]">
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                            <CheckCircleIcon />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Customer updated</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {form.name}'s details have been saved
                        </p>

                        <button
                            onClick={() => router.push("/customers")}
                            className="w-full mt-5 text-white text-sm font-semibold py-3 rounded-xl bg-green-600 active:scale-[0.98] transition-transform duration-100"
                        >
                            Back to Customers
                        </button>
                    </div>
                </div>
            )}

            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
        </div>
    );
}