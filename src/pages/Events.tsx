import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonTextarea, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import { Storage } from '@ionic/storage';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

// Interface for event data
interface IData {
  fecha: string;
  titulo: string;
  description: string;
  foto: string | null; // Change type to string for photo URI
  audio: string | null; // Change type to string for audio URI
  allowNotifications: boolean;
}

const Events: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null); // Change type to string for photo URI
  const [audio, setAudio] = useState<string | null>(null); // Change type to string for audio URI
  const [allowNotifications, setAllowNotifications] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState<IData[]>([]); // Add state for data

  const storage = new Storage();
  storage.create();

  useEffect(() => {
    // Load existing data from storage on component mount
    const loadData = async () => {
      const savedData = await storage.get('data');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    };

    loadData();
  }, []);

  const handlePhotoCapture = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // Get photo as a file URI
      });

      if (photo && photo.webPath) {
        setPhoto(photo.webPath);
        await storage.set('photo', photo.webPath); // Save photo URI to local storage
      }
    } catch (error: any) {
      setErrorMessage('Error capturing photo: ' + error.message);
      setShowAlert(true);
      console.error('Error capturing photo:', error);
    }
  };

  const handleAudioRecording = async () => {
    try {
      const audioPath = 'audio-recording.wav'; // File path for the audio recording
      const audioFile = await Filesystem.writeFile({
        path: audioPath,
        data: '', // Empty data for now, as this will be filled during recording
        directory: Directory.Data, // Save in app's private data directory
      });

      // Start audio recording
      // You can use a library like react-mic or implement your own logic using the device's audio recording API
      // Update audio state with the audio file path
      setAudio(audioFile.uri);
    } catch (error: any) {
      setErrorMessage('Error recording audio: ' + error.message);
      setShowAlert(true);
      console.error('Error recording audio:', error);
    }
  };

  const clearData = () => {
    setTitle('');
    setDate('');
    setDescription('');
    setPhoto(null);
    setAudio(null);
    setAllowNotifications(false);
  };

  const saveData = async () => {
    // || !photo || !audio
    try {
      // if (!title || !date || !description) {
      //   setErrorMessage('Todos los campos son obligatorios');
      //   setShowAlert(true);
      //   return;
      // }

      const newData: IData = { fecha: date, titulo: title, description: description, foto: photo, audio: audio, allowNotifications };
      const updatedData: IData[] = [...data, newData];

      await storage.set('data', JSON.stringify(updatedData));
      setData(updatedData);
      clearData();

      // Show success alert
      setShowAlert(true);
      setErrorMessage('Evento guardado exitosamente');
    } catch (error: any) {
      setErrorMessage('Error saving data: ' + error.message);
      setShowAlert(true);
      console.error('Error saving data:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Events</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {/* Registration Form */}
        <IonList inset={true}>
          <IonItem>
            <IonLabel position="floating">Título</IonLabel>
            <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Fecha</IonLabel>
            <IonInput type="date" value={date} onIonChange={(e) => setDate(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value!)}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonButton onClick={handlePhotoCapture}>Tomar Foto</IonButton>
            <IonButton onClick={handleAudioRecording}>Grabar Audio</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Audio: {audio ? 'Audio grabado' : 'No se ha grabado audio'}</IonLabel>
          </IonItem>
          {photo && (
            <IonItem>
              <img src={photo} alt="Captured" style={{ width: '100%', maxWidth: '200px' }} />
            </IonItem>
          )}
        </IonList>

        <IonButton expand="block" onClick={saveData}>Guardar Evento</IonButton>

        <IonNote color="medium" class="ion-margin-horizontal">
          Tus datos serán guardados de forma anónima y solo se utilizarán para mejorar nuestros productos.
        </IonNote>
        {/* End of Registration Form */}
        
        {/* Alert */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Alerta'}
          message={errorMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Events;
