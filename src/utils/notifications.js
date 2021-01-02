export default {
    init() {
        if (!("Notification" in window)) {
            console.log("Your browser environment doesn`t support notification");
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Permission has been granted!");
                }
            })
        }
    },

    show(params) {
        const { title = "NEW Notification!", body = "" } = params;
        new Notification(title, { body })
    }
}