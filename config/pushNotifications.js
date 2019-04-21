import { Permissions, Notifications } from 'expo';

/*export default function registerForPushNotificationsAsync() {
  const { status: existingStatus } = getNotificationPermission();
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = askForNotificationPermission();
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  /*let token = await Notifications.getExpoPushTokenAsync();
  console.warn(token);
  return token;* /
}

async function askForNotificationPermission() {
  let status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return status;
}
async function getNotificationPermission() {
  let status = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  return status;
}*/

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return new Promise((resolve) => {
    resolve();
  });
}

export default registerForPushNotificationsAsync;
