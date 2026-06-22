import { google } from "googleapis";

const PROJECT_ID = "farmtohome-ba67e";

async function getAccessToken() {
    const auth = new google.auth.GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
}

export async function POST(req: Request) {
    const { token, title, body } = await req.json();

    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: {
                        token,
                        notification: {
                            title,
                            body,
                        },
                    },
                }),
            }
        );

        return Response.json(await response.json());
    } catch (error) {
        return Response.json({ error });
    }
}