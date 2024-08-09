import alNotification from "@/al-ui/Notification/alNotification"

export const notFetchError = (textError: string) => {
    alNotification({
        variant: 'error',
        title: 'Ошибка при отправке запроса!',
        body: textError,
        timeSecClose: 3
    })
}