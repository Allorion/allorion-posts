import alNotification from "./alNotification"

export const notificationLoadFetch = async (): Promise<string> => {
    return await alNotification({
        variant: 'info',
        title: 'Ожидайте!',
        body: 'Выполняется загрузка данных, пожалуйста ожидайте'
    })
}