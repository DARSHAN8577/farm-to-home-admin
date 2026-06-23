"use client";

import {
    Truck,
    Receipt,
    Plus,
    PauseCircle,
    MapPin,
    User,
    Download,
    ShieldCheck,
    Zap,
    Lock,
    AlertCircle,
    CheckCircle2,
    Package,
    ChevronRight,
} from "lucide-react";

// ── Design tokens mirrored from Flutter app ──────────────────────────────────
// _bg       = #F4F6F3   (page background)
// _surface  = #FFFFFF   (cards)
// _green900 = #1B4332   (hero gradient dark)
// _green700 = #2D6A4F   (hero gradient light, active nav, text)
// _green500 = #40916C   (accent dot, icons)
// _green300 = #74C69D   (pill labels)
// _green100 = #D8F3DC   (icon bg tints)
// _green50  = #EEF7F1   (soft tint)
// _amber    = #F59E0B
// _amberSoft= #FEF3C7
// _ink      = #111827
// _inkMid   = #6B7280
// _inkLight = #D1D5DB

const features = [
    { icon: Truck, title: "Daily Delivery Tracking", desc: "Know when your milk arrives", bg: "#EEF7F1", fg: "#2D6A4F" },
    { icon: Receipt, title: "Bills & Payments", desc: "Clear monthly statements", bg: "#EFF6FF", fg: "#2563EB" },
    { icon: Plus, title: "Extra Milk Requests", desc: "Order more with one tap", bg: "#EEF7F1", fg: "#40916C" },
    { icon: PauseCircle, title: "Pause Deliveries", desc: "Skip days when you're away", bg: "#FEF3C7", fg: "#F59E0B" },
    { icon: MapPin, title: "Live Delivery Status", desc: "Real-time updates every order", bg: "#F5F3FF", fg: "#7C3AED" },
    { icon: User, title: "Profile Management", desc: "Update address & preferences", bg: "#EEF7F1", fg: "#2D6A4F" },
];

const steps = [
    { label: "Download APK", sub: "Tap the button above" },
    { label: "Open downloaded file", sub: "Find it in your notifications or Files app" },
    { label: "Allow unknown sources", sub: "Android will prompt — tap Settings to enable" },
    { label: "Install the app", sub: "Follow the on-screen installer" },
    { label: "Login with customer code", sub: "Use the code shared by your delivery team" },
];

const trust = [
    { icon: ShieldCheck, label: "Secure APK" },
    { icon: Zap, label: "No Ads" },
    { icon: Package, label: "Fast Updates" },
    { icon: Lock, label: "Private Access Only" },
];

export default function DownloadPage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F4F6F3", fontFamily: "system-ui, -apple-system, sans-serif" }}>

            {/* ── Top accent bar (matches Flutter's green500 dot header) ── */}
            <div style={{ height: 3, background: "linear-gradient(90deg, #1B4332, #40916C, #74C69D)" }} />

            {/* ── Fixed-style app header (mirrors Flutter _FixedHeader) ── */}
            <header style={{
                backgroundColor: "#FFFFFF",
                borderBottom: "0.8px solid #D1D5DB",
                boxShadow: "0 1px 8px rgba(17,24,39,0.04)",
                position: "sticky", top: 0, zIndex: 50,
            }}>
                <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 18px", height: 56, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#40916C", flexShrink: 0 }} />
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#111827", letterSpacing: "-0.3px", lineHeight: 1.1 }}>Farm To Home</div>
                        <div style={{ fontSize: 10, color: "#6B7280" }}>Fresh Milk · Customer App</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            backgroundColor: "#D8F3DC",
                            border: "1.5px solid #74C69D",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 14, fontWeight: 800, color: "#2D6A4F",
                        }}>F</div>
                    </div>
                </div>
            </header>

            <main style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 40px" }}>

                {/* ── Hero Banner (mirrors Flutter _HeroBanner gradient) ── */}
                <section style={{
                    margin: "16px 0 0",
                    borderRadius: 20,
                    background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
                    padding: "24px 22px 22px",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    {/* Decorative circles */}
                    <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)" }} />
                    <div style={{ position: "absolute", right: 30, bottom: -30, width: 90, height: 90, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)" }} />

                    {/* Logo area */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, position: "relative" }}>
                        <div style={{
                            width: 60, height: 60, borderRadius: 16,
                            backgroundColor: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 28, flexShrink: 0,
                        }}>
                            🥛
                        </div>
                        <div>
                            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 2 }}>Farm To Home</div>
                            <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, letterSpacing: "-0.4px", lineHeight: 1.1 }}>
                                Download the App
                            </div>
                            <div style={{ color: "#74C69D", fontSize: 12, marginTop: 3 }}>Fresh milk delivered daily 🥛</div>
                        </div>
                    </div>

                    {/* Pills (mirrors Flutter _MiniPill) */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {[
                            { icon: "☀️", label: "Morning delivery" },
                            { icon: "🌙", label: "Evening delivery" },
                        ].map(p => (
                            <div key={p.label} style={{
                                padding: "5px 10px", borderRadius: 20,
                                backgroundColor: "rgba(255,255,255,0.12)",
                                display: "flex", alignItems: "center", gap: 4,
                            }}>
                                <span style={{ fontSize: 11 }}>{p.icon}</span>
                                <span style={{ color: "#FFFFFF", fontSize: 11, fontWeight: 500 }}>{p.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Primary CTA (mirrors Flutter InkWell green card) ── */}
                <section style={{ marginTop: 14 }}>
                    <a
                        href="/apk/farm-to-home.apk"
                        download
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                            width: "100%", padding: "16px",
                            background: "linear-gradient(135deg, #2D6A4F, #40916C)",
                            borderRadius: 16,
                            color: "#FFFFFF", fontSize: 16, fontWeight: 800,
                            textDecoration: "none",
                            boxShadow: "0 8px 24px rgba(45,106,79,0.35)",
                            letterSpacing: "-0.2px",
                        }}
                    >
                        <Download size={20} />
                        Download APK (v1.0)
                        <ChevronRight size={18} style={{ opacity: 0.7 }} />
                    </a>

                    {/* Warning box (mirrors Flutter amber info card) */}
                    <div style={{
                        marginTop: 10,
                        padding: "12px 14px",
                        borderRadius: 14,
                        backgroundColor: "#FEF3C7",
                        border: "1px solid rgba(245,158,11,0.3)",
                        display: "flex", gap: 10, alignItems: "flex-start",
                    }}>
                        <AlertCircle size={16} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }} />
                        <p style={{ color: "#92400E", fontSize: 12, lineHeight: 1.5, margin: 0 }}>
                            This app is shared directly and is safe to install. Since it's not from the Play Store, Android may ask permission to install from unknown sources.
                        </p>
                    </div>
                </section>

                {/* ── App info strip (mirrors Flutter _InsightTile row) ── */}
                <section style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                    {[
                        { label: "Version", value: "1.0.0" },
                        { label: "Size", value: "61.9 MB" },
                        { label: "OS", value: "Android" },
                        { label: "Type", value: "Delivery" },
                    ].map(item => (
                        <div key={item.label} style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 14,
                            padding: "10px 8px",
                            textAlign: "center",
                            boxShadow: "0 3px 10px rgba(17,24,39,0.05)",
                        }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{item.value}</div>
                            <div style={{ fontSize: 10, color: "#6B7280", marginTop: 3 }}>{item.label}</div>
                        </div>
                    ))}
                </section>

                {/* ── Features grid (mirrors Flutter _QuickActionsGrid 2×2) ── */}
                <section style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#111827", letterSpacing: "-0.2px", marginBottom: 12 }}>
                        What's inside the app
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {features.map(({ icon: Icon, title, desc, bg, fg }) => (
                            <div key={title} style={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: 16,
                                padding: "14px 14px",
                                boxShadow: "0 3px 12px rgba(17,24,39,0.05)",
                                display: "flex", flexDirection: "column", gap: 10,
                            }}>
                                <div style={{
                                    width: 38, height: 38, borderRadius: 10,
                                    backgroundColor: bg,
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                }}>
                                    <Icon size={18} color={fg} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{title}</div>
                                    <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Installation steps (mirrors Flutter step number list) ── */}
                <section style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#111827", letterSpacing: "-0.2px", marginBottom: 12 }}>
                        How to install
                    </div>
                    <div style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 16,
                        padding: "6px 0",
                        boxShadow: "0 3px 12px rgba(17,24,39,0.05)",
                        overflow: "hidden",
                    }}>
                        {steps.map((step, i) => (
                            <div key={i} style={{
                                display: "flex", alignItems: "flex-start", gap: 14,
                                padding: "14px 16px",
                                borderBottom: i < steps.length - 1 ? "0.8px solid #D1D5DB" : "none",
                            }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                                    backgroundColor: "#EEF7F1",
                                    border: "1px solid #D8F3DC",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 11, fontWeight: 800, color: "#2D6A4F",
                                }}>
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <div style={{ paddingTop: 2 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{step.label}</div>
                                    <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2, lineHeight: 1.4 }}>{step.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Trust strip (mirrors Flutter _StatusChip green row) ── */}
                <section style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {trust.map(({ icon: Icon, label }) => (
                        <div key={label} style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 12,
                            padding: "10px 12px",
                            display: "flex", alignItems: "center", gap: 8,
                            boxShadow: "0 2px 8px rgba(17,24,39,0.04)",
                        }}>
                            <CheckCircle2 size={15} color="#40916C" />
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{label}</span>
                        </div>
                    ))}
                </section>

                {/* ── Second CTA (bottom) ── */}
                <section style={{ marginTop: 20 }}>
                    <a
                        href="/apk/farm-to-home.apk"
                        download
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                            width: "100%", padding: "15px",
                            background: "linear-gradient(135deg, #1B4332, #2D6A4F)",
                            borderRadius: 16,
                            color: "#FFFFFF", fontSize: 15, fontWeight: 700,
                            textDecoration: "none",
                            boxShadow: "0 6px 20px rgba(27,67,50,0.3)",
                        }}
                    >
                        <Download size={18} />
                        Download APK · v1.0.0 · 61.9 MB
                    </a>
                </section>
            </main>

            {/* ── Footer (mirrors Flutter footer bar) ── */}
            <footer style={{
                borderTop: "0.8px solid #D1D5DB",
                backgroundColor: "#FFFFFF",
                padding: "14px 18px",
            }}>
                <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>
                        Powered by <span style={{ fontWeight: 700, color: "#2D6A4F" }}>Farm To Home</span>
                    </p>
                    <p style={{ fontSize: 11, color: "#D1D5DB", margin: 0 }}>v1.0.0 · Android</p>
                </div>
            </footer>
        </div>
    );
}