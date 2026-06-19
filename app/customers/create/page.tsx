"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
const IdIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M15 9h3M15 13h3M6 17h12" />
    </svg>
);
const KeyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="7.5" cy="15.5" r="5.5" /><path d="M21 2l-9.6 9.6" /><path d="M15.5 7.5l3 3L22 7l-3-3" />
    </svg>
);
const CopyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

// ── Farm Landscape SVG Background (compact variant) ─────────────────────────
const FarmLandscape = () => (
    <svg viewBox="0 0 390 90" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        <defs>
            <linearGradient id="skyGrad3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
        </defs>
        <rect width="390" height="90" fill="url(#skyGrad3)" />
        <ellipse cx="80" cy="88" rx="130" ry="38" fill="#6ee7b7" opacity="0.5" />
        <ellipse cx="310" cy="90" rx="120" ry="34" fill="#6ee7b7" opacity="0.5" />
        <ellipse cx="160" cy="95" rx="160" ry="42" fill="#34d399" opacity="0.7" />
        <ellipse cx="350" cy="98" rx="110" ry="38" fill="#34d399" opacity="0.6" />
        <rect x="0" y="68" width="390" height="22" fill="#10b981" opacity="0.5" />
        <rect x="335" y="42" width="3.5" height="30" fill="#78716c" />
        <ellipse cx="337" cy="40" rx="11" ry="13" fill="#16a34a" />
        <ellipse cx="329" cy="46" rx="8" ry="10" fill="#15803d" />
    </svg>
);

type Field =
    | "name"
    | "phone"
    | "address"
    | "morning_liters"
    | "evening_liters"
    | "price_per_liter";

export default function CreateCustomer() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState<{ code: string; password: string; name: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const [form, setForm] = useState<Record<Field, string>>({
        name: "",
        phone: "",
        address: "",
        morning_liters: "",
        evening_liters: "",
        price_per_liter: "",
    });

    const generateCode = () => "FM" + Math.floor(1000 + Math.random() * 9000);
    const generatePassword = () =>
        Math.floor(100000 + Math.random() * 900000).toString();

    const setField = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [field]: e.target.value });

    const handleSubmit = async () => {
        setErrorMsg("");

        if (!form.name || !form.phone || !form.address || !form.price_per_liter) {
            setErrorMsg("Please fill all required fields");
            return;
        }

        setLoading(true);

        const customer_code = generateCode();
        const password = generatePassword();

        const { data, error } = await supabase
            .from("customers")
            .insert([
                {
                    name: form.name,
                    phone: form.phone,
                    address: form.address,
                    morning_liters: Number(form.morning_liters),
                    evening_liters: Number(form.evening_liters),
                    price_per_liter: Number(form.price_per_liter),
                    customer_code,
                    password,
                },
            ])
            .select();

        console.log("Inserted Data:", data);
        console.log("Error:", error);

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
            return;
        }

        setSuccess({ code: customer_code, password, name: form.name });

        setForm({
            name: "",
            phone: "",
            address: "",
            morning_liters: "",
            evening_liters: "",
            price_per_liter: "",
        });

        setLoading(false);
    };

    const copyCredentials = async () => {
        if (!success) return;
        try {
            await navigator.clipboard.writeText(
                `Customer ID: ${success.code}\nPassword: ${success.password}`
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // clipboard not available — ignore silently
        }
    };

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
                            <h1 className="text-gray-900 font-bold text-base leading-tight">New Customer</h1>
                            <p className="text-gray-500 text-xs">Add to your route</p>
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
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-green-600 disabled:bg-green-300 text-white font-semibold text-sm py-3.5 rounded-xl mt-2 shadow-sm active:scale-[0.98] transition-transform duration-100"
                    >
                        {loading ? "Creating..." : "Create Customer"}
                    </button>
                </div>
            </main>

            {/* ── Success Popup ── */}
            {success && (
                <div className="fixed inset-0 z-40 flex items-center justify-center px-6 bg-black/40 animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl text-center animate-[popIn_0.25s_ease-out]">
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                            <CheckCircleIcon />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Customer added</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {success.name} is now on your route
                        </p>

                        <div className="mt-5 bg-gray-50 rounded-2xl p-4 flex flex-col gap-2.5 text-left">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                    <span className="text-green-600"><IdIcon /></span>
                                    Customer ID
                                </span>
                                <span className="text-sm font-bold text-gray-800">{success.code}</span>
                            </div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                    <span className="text-green-600"><KeyIcon /></span>
                                    Password
                                </span>
                                <span className="text-sm font-bold text-gray-800">{success.password}</span>
                            </div>
                        </div>

                        <button
                            onClick={copyCredentials}
                            className="w-full mt-3 flex items-center justify-center gap-1.5 text-green-600 text-xs font-semibold py-2.5 rounded-xl bg-green-50 active:scale-[0.98] transition-transform duration-100"
                        >
                            <CopyIcon />
                            {copied ? "Copied!" : "Copy ID & password"}
                        </button>

                        <div className="grid grid-cols-2 gap-2.5 mt-4">
                            <button
                                onClick={() => setSuccess(null)}
                                className="text-gray-600 text-sm font-semibold py-3 rounded-xl bg-gray-100 active:scale-[0.98] transition-transform duration-100"
                            >
                                Add another
                            </button>
                            <button
                                onClick={() => router.push("/customers")}
                                className="text-white text-sm font-semibold py-3 rounded-xl bg-green-600 active:scale-[0.98] transition-transform duration-100"
                            >
                                Done
                            </button>
                        </div>
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