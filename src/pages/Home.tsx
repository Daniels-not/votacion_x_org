import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="flex justify-center items-center h-full">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Div to Center Content */}
        <div className="flex justify-center items-center w-full h-full">
          <img src="/present.svg" alt="Centered Image" className="w-64 h-64" />
        </div>
        {/* End of Div */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
