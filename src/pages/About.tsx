import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonLabel } from '@ionic/react';

const About: React.FC = () => {
  // Assuming you have access to delegate information
  const delegateInfo = {
    photo: 'url_to_photo',
    firstName: 'Ramy',
    lastName: 'Campusano',
    registrationNumber: '202010153'
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About Creator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="p-4">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About Creator</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* Delegate Information Section */}
        <div className="flex flex-col items-center">
          <IonImg src={delegateInfo.photo} alt="Delegate Photo" className="w-32 h-32 rounded-full mb-4" />
          <IonLabel className="text-lg">{delegateInfo.firstName} {delegateInfo.lastName}</IonLabel>
          <IonLabel className="text-sm text-gray-500">{delegateInfo.registrationNumber}</IonLabel>
        </div>
        {/* End of Delegate Information Section */}
      </IonContent>
    </IonPage>
  );
};

export default About;
