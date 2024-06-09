import { Redirect, Route } from "react-router-dom";

import My from "@/application/pages/my";

export default function Index() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/feed" render={() => <Home />} exact={true} />
        <Route path="/lists" render={() => <Lists />} exact={true} />
        <Route path="/lists/:listId" render={() => <ListDetails />} exact={true} />
        <Route path="/settings" render={() => <Settings />} exact={true} />
        <Route path="/my" render={() => <My />} exact={true} />
        <Route path="" render={() => <Redirect to="/feed" />} exact={true} />
      </IonRouterOutlet>
    </IonTabs>
  );
}
