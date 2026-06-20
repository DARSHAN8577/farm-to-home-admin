"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);
const PlusCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const RupeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M6 3h12M6 8h12M6 13l9 8M6 8a5 5 0 0 1 5 5" />
  </svg>
);
const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />
    <path d="M16 12h2" />
  </svg>
);
const AlertWalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />
    <circle cx="16" cy="12" r="1" fill="currentColor" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const UserPlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);
const FileTextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);
const NavUsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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

// ── Notification item type ────────────────────────────────────────────────────
type NotifItem = {
  id: string;
  type: "pause" | "extra" | "customer";
  label: string;
  detail: string;
  href: string;
  time: string;
};

type NavTab = "dashboard" | "customers" | "deliveries" | "bills";

// ── Delivery status row type ──────────────────────────────────────────────────
type DeliveryStatusRow = {
  id: string;
  is_delivery_started: boolean;
  message: string;
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    customers: 0,
    deliveries: 0,
    extraRequests: 0,
    pauseRequests: 0,
    revenue: 0,
    paidBills: 0,
    unpaidBills: 0,
  });
  const [activeNav, setActiveNav] = useState<NavTab>("dashboard");
  const [loaded, setLoaded] = useState(false);

  // ── Notification state ────────────────────────────────────────────────────
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifSeen, setNotifSeen] = useState(false); // clears badge once opened
  const [notifications, setNotifications] = useState<NotifItem[]>([]);
  const bellRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // ── Delivery Mode state ───────────────────────────────────────────────────
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatusRow | null>(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  // Close popup when clicking outside (checks both bell and popup)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popupRef.current && !popupRef.current.contains(e.target as Node) &&
        bellRef.current && !bellRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
      }
    };
    if (notifOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  // ── Supabase fetching ─────────────────────────────────────────────────────
  const fetchDashboard = async () => {
    const today = new Date().toISOString().split("T")[0];

    const { data: customers } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: deliveries } = await supabase
      .from("deliveries").select("*").eq("delivery_date", today);

    const { data: extraRequests } = await supabase
      .from("extra_requests")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    const { data: pauseRequests } = await supabase
      .from("pause_requests")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    const { data: bills } = await supabase.from("bills").select("*");

    const totalRevenue = bills?.reduce((sum, bill) => sum + Number(bill.total_amount), 0) || 0;
    const paidBills = bills?.filter((bill) => bill.paid_status === "paid").length || 0;
    const unpaidBills = bills?.filter((bill) => bill.paid_status === "unpaid").length || 0;

    setStats({
      customers: customers?.length || 0,
      deliveries: deliveries?.length || 0,
      extraRequests: extraRequests?.length || 0,
      pauseRequests: pauseRequests?.length || 0,
      revenue: totalRevenue,
      paidBills,
      unpaidBills,
    });

    // ── Build real notifications list ────────────────────────────────────────
    const notifs: NotifItem[] = [];

    // Pending pause requests
    (pauseRequests || []).slice(0, 5).forEach((r: any) => {
      notifs.push({
        id: `pause-${r.id}`,
        type: "pause",
        label: "Pause Request",
        detail: r.customer_name || `Customer #${r.customer_id}`,
        href: "/pause",
        time: r.created_at
          ? new Date(r.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
          : "",
      });
    });

    // Pending extra requests
    (extraRequests || []).slice(0, 5).forEach((r: any) => {
      notifs.push({
        id: `extra-${r.id}`,
        type: "extra",
        label: "Extra Request",
        detail: r.customer_name || `Customer #${r.customer_id}`,
        href: "/requests",
        time: r.created_at
          ? new Date(r.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
          : "",
      });
    });

    // Newest customers (last 3)
    (customers || []).slice(0, 3).forEach((c: any) => {
      notifs.push({
        id: `cust-${c.id}`,
        type: "customer",
        label: "New Customer",
        detail: c.name || "Unknown",
        href: `/customers/${c.id}`,
        time: c.created_at
          ? new Date(c.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
          : "",
      });
    });

    setNotifications(notifs);
    setLoaded(true);
  };

  // ── Fetch the single delivery_status row (no hardcoded id) ───────────────
  const fetchDeliveryStatus = async () => {
    const { data, error } = await supabase
      .from("delivery_status")
      .select("*")
      .limit(1)
      .maybeSingle();

    console.log("Delivery Status:", data, error);

    if (!error && data) {
      setDeliveryStatus(data as DeliveryStatusRow);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchDeliveryStatus();
  }, []);

  // ── Toggle Delivery Mode — broadcasts to all customers in the Android app ─
  const toggleDelivery = async () => {
    if (!deliveryStatus || deliveryLoading) return;
    const newStatus = !deliveryStatus.is_delivery_started;

    setDeliveryLoading(true);
    // Optimistic update
    setDeliveryStatus({ ...deliveryStatus, is_delivery_started: newStatus });

    const { error } = await supabase
      .from("delivery_status")
      .update({
        is_delivery_started: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", deliveryStatus.id);

    if (error) {
      // Revert on failure
      setDeliveryStatus({ ...deliveryStatus, is_delivery_started: !newStatus });
    }
    setDeliveryLoading(false);
  };

  // ── Badge count clears once user opens the panel ─────────────────────────
  const totalPending = stats.pauseRequests + stats.extraRequests;
  const notifCount = notifSeen ? 0 : totalPending;

  // ── Data ──────────────────────────────────────────────────────────────────
  const priorityCards = [
    {
      title: "Today Deliveries",
      subtitle: "Today only",
      value: stats.deliveries,
      icon: <TruckIcon />,
      iconBg: "bg-green-500",
      cardBg: "bg-green-50",
      border: "border-green-100",
      titleColor: "text-green-700",
      valueColor: "text-green-700",
      chevronBg: "bg-white text-green-500",
      href: "/deliveries",
      decorIcon: (
        <svg viewBox="0 0 80 60" fill="none" className="w-20 h-16 opacity-10" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="20" width="50" height="32" rx="3" fill="#16a34a" />
          <path d="M55 28h13l10 16v9H55V28z" fill="#16a34a" />
          <circle cx="18" cy="55" r="7" fill="#16a34a" />
          <circle cx="61" cy="55" r="7" fill="#16a34a" />
        </svg>
      ),
    },
    {
      title: "Pause Requests",
      subtitle: "Pending now",
      value: stats.pauseRequests,
      icon: <PauseIcon />,
      iconBg: "bg-amber-400",
      cardBg: "bg-amber-50",
      border: "border-amber-100",
      titleColor: "text-amber-700",
      valueColor: "text-amber-600",
      chevronBg: "bg-white text-amber-500",
      href: "/pause",
      decorIcon: (
        <svg viewBox="0 0 80 80" fill="none" className="w-20 h-16 opacity-10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" stroke="#d97706" strokeWidth="5" />
          <line x1="40" y1="20" x2="40" y2="42" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
          <line x1="40" y1="55" x2="40" y2="58" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Extra Requests",
      subtitle: "Pending now",
      value: stats.extraRequests,
      icon: <PlusCircleIcon />,
      iconBg: "bg-blue-500",
      cardBg: "bg-blue-50",
      border: "border-blue-100",
      titleColor: "text-blue-700",
      valueColor: "text-blue-600",
      chevronBg: "bg-white text-blue-500",
      href: "/requests",
      decorIcon: (
        <svg viewBox="0 0 80 70" fill="none" className="w-20 h-16 opacity-10" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="50" rx="35" ry="18" fill="#2563eb" />
          <ellipse cx="40" cy="40" rx="28" ry="14" fill="#2563eb" />
          <path d="M20 40 Q40 20 60 40" stroke="#2563eb" strokeWidth="3" fill="none" />
        </svg>
      ),
    },
  ];

  const overviewCards = [
    {
      title: "Total Customers",
      subtitle: "All time",
      value: stats.customers,
      icon: <UsersIcon />,
      iconBg: "bg-green-600",
      valueColor: "text-green-600",
      chevronColor: "text-green-400",
      href: "/customers",
    },
    {
      title: "Revenue",
      subtitle: "Total earnings",
      value: `₹${stats.revenue.toLocaleString("en-IN")}`,
      icon: <RupeeIcon />,
      iconBg: "bg-green-600",
      valueColor: "text-green-600",
      chevronColor: "text-green-400",
      href: "/bills",
    },
    {
      title: "Paid Bills",
      subtitle: "Total paid",
      value: stats.paidBills,
      icon: <WalletIcon />,
      iconBg: "bg-green-600",
      valueColor: "text-green-600",
      chevronColor: "text-green-400",
      href: "/bills",
    },
    {
      title: "Unpaid Bills",
      subtitle: "Total unpaid",
      value: stats.unpaidBills,
      icon: <AlertWalletIcon />,
      iconBg: "bg-red-500",
      valueColor: "text-red-500",
      chevronColor: "text-red-300",
      href: "/bills",
    },
  ];

  // ✅ FIX 1: "Add Customer" now routes to /customers/create (not /customers/new)
  const quickActions = [
    { label: "Add Customer", icon: <UserPlusIcon />, href: "/customers/create" },
    { label: "View Deliveries", icon: <NavTruckIcon />, href: "/deliveries" },
    { label: "Generate Bills", icon: <FileTextIcon />, href: "/bills" },
  ];

  const navItems: { key: NavTab; label: string; icon: React.ReactNode; href: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: <HomeIcon />, href: "/" },
    { key: "customers", label: "Customers", icon: <NavUsersIcon />, href: "/customers" },
    { key: "deliveries", label: "Deliveries", icon: <NavTruckIcon />, href: "/deliveries" },
    { key: "bills", label: "Bills", icon: <ReceiptIcon />, href: "/bills" },
  ];

  // ── Notification dot colors by type ───────────────────────────────────────
  const notifDot: Record<NotifItem["type"], string> = {
    pause: "bg-amber-400",
    extra: "bg-blue-500",
    customer: "bg-green-500",
  };
  const notifBadge: Record<NotifItem["type"], string> = {
    pause: "bg-amber-50 text-amber-700",
    extra: "bg-blue-50 text-blue-700",
    customer: "bg-green-50 text-green-700",
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-gradient-to-b from-green-50 to-green-100">

        {/* ✅ FIX 3: Removed hamburger menu icon — logo now left-aligned, bell right */}
        <div className="flex items-center justify-between px-4 pt-4 pb-1">

          {/* Brand logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-200">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C10 8 6 14 6 22c4 0 8-2 10-6 0 4-2 8-6 10 6 0 12-4 14-10s0-12-8-12z" fill="#16a34a" />
                <path d="M16 14 L16 28" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-base leading-tight">Farm to Home</h1>
              <p className="text-gray-500 text-xs">Dashboard</p>
            </div>
          </div>

          {/* Bell — badge clears on open, popup renders as fixed overlay outside header */}
          <div className="relative">
            <button
              ref={bellRef}
              className="relative text-gray-600 p-1"
              onClick={() => {
                setNotifOpen((o) => !o);
                setNotifSeen(true); // clear badge count
              }}
              aria-label="Notifications"
            >
              <BellIcon />
              {notifCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notifCount > 9 ? "9+" : notifCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Farm landscape */}
        <div className="mt-1 -mb-1">
          <FarmLandscape />
        </div>
      </header>

      {/* ── Scrollable Content ── */}
      <main className="relative z-10 bg-white rounded-t-3xl -mt-3 px-4 pt-5 pb-28 min-h-screen">

        {/* ── Delivery Mode ── */}
        <section className="mb-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`rounded-xl p-2.5 ${deliveryStatus?.is_delivery_started ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                  <TruckIcon />
                </span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Delivery Mode</p>
                  <p className="text-xs text-gray-500">
                    Notify all customers when milk is out
                  </p>
                </div>
              </div>
              <button
                onClick={toggleDelivery}
                disabled={!deliveryStatus || deliveryLoading}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-150 disabled:opacity-50 ${deliveryStatus?.is_delivery_started
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                  }`}
              >
                {deliveryStatus?.is_delivery_started ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </section>

        {/* ── Quick Actions ── */}
        <section className="mb-6">
          <p className="text-sm font-bold text-gray-800 mb-3">Quick Actions</p>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2.5 py-4 px-2 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform duration-100"
              >
                <span className="bg-green-50 text-green-600 rounded-xl p-2.5">
                  {action.icon}
                </span>
                <span className="text-[11px] font-semibold text-green-600 text-center leading-tight">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── High Priority ── */}
        <section className="mb-6">
          <p className="text-sm font-bold text-gray-800 mb-3">High Priority</p>
          <div className="flex flex-col gap-3">
            {priorityCards.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                className={`relative flex items-center gap-4 p-4 rounded-2xl border ${card.cardBg} ${card.border} overflow-hidden
                  transition-all duration-200 active:scale-[0.98]
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                style={{ transitionDelay: `${i * 70}ms`, transition: "opacity 0.35s ease, transform 0.35s ease" }}
              >
                <div className={`flex-shrink-0 ${card.iconBg} text-white rounded-2xl p-3 shadow-sm`}>
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${card.titleColor}`}>{card.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{card.subtitle}</p>
                  <p className={`text-3xl font-black mt-1 leading-none ${card.valueColor}`}>{card.value}</p>
                </div>
                <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
                  {card.decorIcon}
                </div>
                <div className={`flex-shrink-0 ${card.chevronBg} rounded-full p-1.5 shadow-sm z-10`}>
                  <ChevronRightIcon />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Overview ── */}
        <section>
          <p className="text-sm font-bold text-gray-800 mb-3">Overview</p>
          <div className="grid grid-cols-2 gap-3">
            {overviewCards.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                className={`flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm
                  transition-all duration-200 active:scale-[0.97]
                  ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                style={{ transitionDelay: `${(i + 3) * 70}ms`, transition: "opacity 0.35s ease, transform 0.35s ease" }}
              >
                <div className={`flex-shrink-0 ${card.iconBg} text-white rounded-full p-2.5`}>
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 font-medium leading-tight">{card.title}</p>
                    <span className={`${card.chevronColor} bg-gray-50 rounded-full p-0.5`}>
                      <ChevronRightIcon />
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{card.subtitle}</p>
                  <p className={`text-xl font-black mt-1 leading-none ${card.valueColor}`}>{card.value}</p>
                </div>
              </Link>
            ))}
          </div>
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
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
        <div className="h-1 bg-white" />
      </nav>
    </div>
  );
}