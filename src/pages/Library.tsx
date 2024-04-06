import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonNote, IonAlert } from '@ionic/react';
import { Storage } from '@ionic/storage';

interface IData {
  fecha: string;
  titulo: string;
  description: string;
  foto: string | null;
  audio: string | null;
  allowNotifications: boolean;
}

const Library: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const storage = new Storage();
  storage.create();

  useEffect(() => {
    const loadData = async () => {
      const savedData = await storage.get('data');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    };

    loadData();
  }, []);

  const handleDeleteAllData = async () => {
    try {
      await storage.remove('data');
      setData([]);
    } catch (error: any) {
      setErrorMessage('Error deleting data: ' + error.message);
      setShowAlert(true);
      console.error('Error deleting data:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Library</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Library</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem>
            <IonLabel>Fecha</IonLabel>
            <IonLabel>Título</IonLabel>
            <IonLabel>Descripción</IonLabel>
          </IonItem>
          {data.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>{item.fecha}</IonLabel>
              <IonLabel>{item.titulo}</IonLabel>
              <IonLabel>{item.description}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" onClick={handleDeleteAllData}>Eliminar Todos los Datos</IonButton>

        {/* Alert */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error'}
          message={errorMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Library;
