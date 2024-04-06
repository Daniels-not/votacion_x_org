import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { playCircle, radio, library, person } from 'ionicons/icons';

import Home from '../pages/Home';
import About from '../pages/About';
import Events from '../pages/Events';
import Library from '../pages/Library';

function Tabs() {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/" render={() => <Home />} exact={true} />
          <Route path="/about-creator" render={() => <About />} exact={true} />
          <Route path="/event-manager" render={() => <Events />} exact={true} />
          <Route path="/library" render={() => <Library />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="bg-darkyellow text-darkyellow">
          <IonTabButton tab="home" href="/">
            <IonIcon icon={playCircle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="radio" href="/event-manager">
            <IonIcon icon={radio} />
            <IonLabel>Event Manager</IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/library">
            <IonIcon icon={library} />
            <IonLabel>Library</IonLabel>
          </IonTabButton>

          <IonTabButton tab="about-creator" href="/about-creator">
            <IonIcon icon={person} />
            <IonLabel>About</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default Tabs;
