"use client";

import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await fetch("/api/admin-login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (data.success) {
            document.cookie = `admin_auth=${data.token}; path=/; max-age=86400`;
            window.location.href = "/";
        } else {
            alert("Wrong username or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-green-600 text-white py-3 rounded-lg"
                >
                    Login
                </button>
            </div>
        </div>
    );
}