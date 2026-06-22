import { google } from "googleapis";
import { supabase } from "./supabase";

const PROJECT_ID = "farmtohome-ba67e";

async function getAccessToken() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "service-account.json",
        scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
}

export async function sendNotificationToAll(
    title: string,
    body: string
) {
    const { data: customers } = await supabase
        .from("customers")
        .select("fcm_token");

    const accessToken = await getAccessToken();

    for (const customer of customers || []) {
        if (!customer.fcm_token) continue;

        await fetch(
            `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: {
                        token: customer.fcm_token,
                        notification: {
                            title,
                            body,
                        },
                    },
                }),
            }
        );
    }
}