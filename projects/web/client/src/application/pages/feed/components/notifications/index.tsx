import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";

import { useGlobalStore } from "@/application/store/global";
import type { NotificationItem } from "@/application/mock/test";

const NotificationItem = ({ notification }: { notification: NotificationItem }) => (
  <IonItem>
    <IonLabel>{notification.title}</IonLabel>
    <IonNote slot="end">{notification.when}</IonNote>
    <IonButton slot="end" fill="clear" color="dark">
      <IonIcon icon={close} />
    </IonButton>
  </IonItem>
);

export default function Notifications({ open, onDidDismiss }: { open: boolean; onDidDismiss: () => void }) {
  const { notifications } = useGlobalStore();

  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {notifications.map((notification, i) => (
            <NotificationItem notification={notification} key={i} />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
}
