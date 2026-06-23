import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

    if (error || !data) {
        return NextResponse.json(
            { success: false, message: "Invalid credentials" },
            { status: 401 }
        );
    }

    return NextResponse.json({
        success: true,
        token: "farmtohome_secure_2026",
    });
}