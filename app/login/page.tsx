"use client";

import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/admin-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.success) {
                document.cookie = `admin_auth=${data.token}; path=/; max-age=86400`;
                window.location.href = "/";
            } else {
                setError("Wrong username or password.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-5 py-10"
            style={{ background: "linear-gradient(160deg, #e8f5e9 0%, #c8e6c9 45%, #a5d6a7 100%)" }}>

            {/* Background blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
                    style={{ background: "#66bb6a", filter: "blur(40px)" }} />
                <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full opacity-20"
                    style={{ background: "#388e3c", filter: "blur(36px)" }} />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full opacity-10"
                    style={{ background: "#fff176", filter: "blur(28px)" }} />

                {/* Decorative tree left */}
                <svg className="absolute bottom-10 left-4 opacity-10" width="64" height="80" viewBox="0 0 64 80" fill="none">
                    <ellipse cx="32" cy="30" rx="22" ry="18" fill="#2e7d32" />
                    <ellipse cx="32" cy="20" rx="16" ry="13" fill="#388e3c" />
                    <rect x="28" y="44" width="8" height="28" rx="4" fill="#1b5e20" />
                </svg>

                {/* Decorative tree right */}
                <svg className="absolute top-10 right-6 opacity-10" width="48" height="60" viewBox="0 0 48 60" fill="none">
                    <ellipse cx="24" cy="22" rx="16" ry="13" fill="#2e7d32" />
                    <ellipse cx="24" cy="14" rx="11" ry="9" fill="#43a047" />
                    <rect x="21" y="32" width="6" height="20" rx="3" fill="#1b5e20" />
                </svg>

                {/* Milk drop top center */}
                <svg className="absolute top-6 left-1/2 -translate-x-1/2 opacity-10" width="32" height="40" viewBox="0 0 32 40" fill="none">
                    <path d="M16 2 C16 2, 30 18, 30 26 C30 33.7 23.7 40 16 40 C8.3 40 2 33.7 2 26 C2 18 16 2 16 2Z" fill="#fff" />
                </svg>
            </div>

            {/* Brand header */}
            <div className="relative z-10 mb-8 flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm"
                    style={{ background: "white", border: "2px solid #a5d6a7" }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M6 8h16l-2 14H8L6 8z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M10 8V6a4 4 0 018 0v2" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M10 14h8M10 17.5h5" stroke="#43a047" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#388e3c", letterSpacing: "0.12em" }}>
                    Farm Deliveries
                </p>
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-sm rounded-3xl p-7 shadow-lg"
                style={{ background: "white", border: "0.5px solid #b2dfdb" }}>

                <h1 className="text-xl font-bold mb-1" style={{ color: "#1b5e20" }}>
                    Admin sign in
                </h1>
                <p className="text-sm mb-6" style={{ color: "#81c784" }}>
                    Access your delivery dashboard
                </p>

                {/* Error */}
                {error && (
                    <div className="mb-4 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2"
                        style={{ background: "#ffebee", color: "#c62828", border: "0.5px solid #ef9a9a" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="#c62828" strokeWidth="1.5" />
                            <path d="M8 5v3.5M8 11h.01" stroke="#c62828" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Username */}
                <div className="mb-4">
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: "#388e3c" }}>
                        Username
                    </label>
                    <div className="flex items-center gap-2.5 rounded-xl px-3.5 transition-all"
                        style={{ border: "1.5px solid #c8e6c9", background: "#f9fbe7" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#43a047")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#c8e6c9")}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
                            <circle cx="8.5" cy="5.5" r="3" stroke="#81c784" strokeWidth="1.5" />
                            <path d="M2 15c0-3.314 2.91-6 6.5-6s6.5 2.686 6.5 6" stroke="#81c784" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoCapitalize="none"
                            autoCorrect="off"
                            className="flex-1 py-3 bg-transparent outline-none text-sm"
                            style={{ color: "#1b5e20", fontFamily: "inherit" }}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: "#388e3c" }}>
                        Password
                    </label>
                    <div className="flex items-center gap-2.5 rounded-xl px-3.5 transition-all"
                        style={{ border: "1.5px solid #c8e6c9", background: "#f9fbe7" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#43a047")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#c8e6c9")}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
                            <rect x="3" y="7" width="11" height="8" rx="2" stroke="#81c784" strokeWidth="1.5" />
                            <path d="M5.5 7V5a3 3 0 016 0v2" stroke="#81c784" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="8.5" cy="11" r="1" fill="#81c784" />
                        </svg>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 py-3 bg-transparent outline-none text-sm"
                            style={{ color: "#1b5e20", fontFamily: "inherit" }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 rounded-lg"
                            style={{ color: "#a5d6a7" }}
                            aria-label={showPassword ? "Hide password" : "Show password"}>
                            {showPassword ? (
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <path d="M2 8.5C3.5 5 5.8 3 8.5 3s5 2 6.5 5.5c-1.5 3.5-3.8 5.5-6.5 5.5S3.5 12 2 8.5z" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M2 2l13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <path d="M2 8.5C3.5 5 5.8 3 8.5 3s5 2 6.5 5.5c-1.5 3.5-3.8 5.5-6.5 5.5S3.5 12 2 8.5z" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Login button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95"
                    style={{
                        background: loading ? "#81c784" : "#2e7d32",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}>
                    {loading ? (
                        <>
                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
                            </svg>
                            Signing in…
                        </>
                    ) : (
                        <>
                            Sign in
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </>
                    )}
                </button>

                {/* Footer */}
                <p className="mt-5 text-center text-xs" style={{ color: "#a5d6a7" }}>
                    🌿 Secure admin access only
                </p>
            </div>

            {/* Bottom brand */}
            <p className="relative z-10 mt-6 text-xs" style={{ color: "#66bb6a" }}>
                Farm to Home · Admin Panel
            </p>
        </div>
    );
}