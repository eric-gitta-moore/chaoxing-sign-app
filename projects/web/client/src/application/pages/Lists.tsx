import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useGlobalStore } from "@/application/store/global";
import { TodoListItem } from "@/application/mock/test";

const ListEntry = ({ list }: { list: TodoListItem }) => {
  return (
    <IonItem routerLink={`/lists/${list.id}`} className="list-entry">
      <IonLabel>{list.name}</IonLabel>
    </IonItem>
  );
};

const AllLists = () => {
  const { lists } = useGlobalStore();

  return (
    <>
      {lists.map((list, i) => (
        <ListEntry list={list} key={i} />
      ))}
    </>
  );
};

const Lists = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <AllLists />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Lists;
