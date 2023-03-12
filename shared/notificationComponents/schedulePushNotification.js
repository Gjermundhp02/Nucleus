import NotificationDelay from '../eventComponents/notificationDelay';
import * as Notifications from 'expo-notifications';                                    // Local notifications
import fetchEmoji from '../functions/fetchEmoji';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8
// import messaging from '@react-native-firebase/messaging';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8

/**
 * Function for scheduling push notifications
 * @param {string} title    Notification title
 * @param {string} body     Notification Body
 * @param {date} sendtime   Time the notification should be sent
 */
export default async function SchedulePushNotification(props, lang) {                           // --- SCHEDULE PUSH NOTIFICATION ---
    const emoji = fetchEmoji(props)                                                     // Fetches emoji from emoji function
    await Notifications.scheduleNotificationAsync({
      content: {  
        title: props.eventname + emoji,                                                 // Notification title
        body: lang ? 'Begynner om en time! 🏃':'Starts in one hour! 🏃',                // Notificaton body
      },
      trigger: { seconds: NotificationDelay(props) },                                   // Triggers 1 hour before event
      identifier: JSON.stringify(props.eventID)                                         // ID of the notification
    });
};