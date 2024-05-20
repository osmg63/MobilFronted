import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const sendNotification = async (username) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "KAYIT OLUŞTU",
      body: `${username}`,
    },
    trigger: null,
  });
  console.log("Bildirim gönderildi");
};
