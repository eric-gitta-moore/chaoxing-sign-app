import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from "@ionic/react";

import { useGlobalStore } from "@/application/store/global";

const Settings = () => {
  const { settings, setGlobalStore } = useGlobalStore();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonToggle
              checked={settings.enableNotifications}
              onIonChange={(e) => {
                setGlobalStore({
                  settings: {
                    ...settings,
                    enableNotifications: e.target.checked,
                  },
                });
              }}
            >
              Enable Notifications
            </IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
