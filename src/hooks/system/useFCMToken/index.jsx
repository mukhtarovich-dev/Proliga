import { fetchToken } from "lib/firebase/firebase";

export async function getNotificationPermissionAndToken() {
    if (!("Notification" in window)) {
        console.info("This browser does not support desktop notification");
        return null;
    }

    // Step 2: Check if permission is already granted.
    if (Notification.permission === "granted") {
        return await fetchToken();
    }

    // Step 3: If permission is not denied, request permission from the user.
    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            return await fetchToken();
        }
    }

    return null;
}