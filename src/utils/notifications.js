// export default {
//     init() {
//         if (!("Notification" in window)) {
//             console.log("Середовище вашого браузера не підтримує сповіщення");
//         } else if (Notification.permission !== "denied") {
//             Notification.requestPermission().then(permission => {
//                 if (permission === "granted") {
//                     console.log("Дозвіл надано!");
//                 }
//             })
//         }
//     },

//     show(params) {
//         const { title = "НОВЕ Сповіщення!", body = "" } = params;
//         new Notification(title, { body })
//     }
// }