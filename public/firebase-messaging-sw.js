/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyA8TSa7hv25LtomigQekCxixYXLH8k4zBk",
  authDomain: "proligauz-a294e.firebaseapp.com",
  projectId: "proligauz-a294e",
  storageBucket: "proligauz-a294e.firebasestorage.app",
  messagingSenderId: "892756456327",
  appId: "1:892756456327:web:e3784f6a6ee90b242a9922",
  measurementId: "G-V9T9SPRXYJ",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const parseJSON = (v) => { try { return v ? JSON.parse(v) : undefined; } catch { return undefined; } };
const parseBool = (v, d = false) => v === 'true' ? true : v === 'false' ? false : d;

messaging.onBackgroundMessage((payload) => {
  //  --- split title from the other keys
  const { title = '', ...raw } = payload.data || {};
  console.log("title", title);
  const options = {
    body: raw.body,
    icon: raw.icon || 'favicon-32x32.png',
    image: raw.image,
    badge: raw.badge,
    sound: raw.sound,
    tag: raw.tag,

    // values that need conversion
    actions: parseJSON(raw.actions),          // JSON string → array
    vibrate: parseJSON(raw.vibrate),          // JSON string → array
    requireInteraction: parseBool(raw.requireInteraction),
    renotify: parseBool(raw.renotify),
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.action === 'open'
    ? 'https://your.site/specific-page'
    : '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(winList => {
        for (const w of winList) { if (w.url === url && 'focus' in w) return w.focus(); }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});
