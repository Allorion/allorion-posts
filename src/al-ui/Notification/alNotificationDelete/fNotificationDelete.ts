import "../alNotification/fNotification.css"

const fNotificationDelete = (id: string): void => {
    const el = window.document.querySelector(id);
    if (el !== null) {
        el.className = 'f-function-notification-hidden';
        setTimeout(() => {
            el.classList.remove('f-function-notification-visible');
        }, 1000);
        setTimeout(() => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }

        }, 2000);
    }
}

export default fNotificationDelete
