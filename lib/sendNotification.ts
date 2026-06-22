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

export const sendNotification = async (
    token: string,
    title: string,
    body: string
) => {
    try {
        const accessToken = await getAccessToken();

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
                        token: token,
                        notification: {
                            title,
                            body,
                        },
                    },
                }),
            }
        );

        console.log("Notification sent successfully");
    } catch (error) {
        console.error(error);
    }
};