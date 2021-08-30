import {
  IonGrid,
  IonContent,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import "./ExploreContainer.css";
import React, { useState } from "react";
import Exercise from "./Exercise";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [exerciseArray, setExerciseArray] = useState([
    <Exercise key={0} timer={0} />,
  ]);
  const createExercise = () => {
    setExerciseArray((exerciseArray) => [
      ...exerciseArray,
      <Exercise key={exerciseArray.length} timer={0} />,
    ]);
    console.log(exerciseArray);
  };
  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard>
              <IonGrid>
                <IonCol>
                  <IonRow>
                    <IonCardHeader>
                      <IonCardTitle>Set 1</IonCardTitle>
                    </IonCardHeader>
                    {exerciseArray}
                  </IonRow>
                </IonCol>
                <IonButton color="primary" onClick={createExercise}>
                  Add new exercise
                </IonButton>
              </IonGrid>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default ExploreContainer;
