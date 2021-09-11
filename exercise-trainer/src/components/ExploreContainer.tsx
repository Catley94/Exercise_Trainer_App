import {
  IonGrid,
  IonContent,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonHeader,
  IonTitle,
} from "@ionic/react";
import "./ExploreContainer.css";
import React, { useState, useRef } from "react";
import Exercise from "./Exercise";

import Set from "./Set";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [collection, setCollection] = useState([
    { id: 0, exercises: [{ id: 0, activity: "walk", time: 0 }] },
  ]);
  const [set1Time, setSet1Time] = useState(180);
  const [timerStarted, setTimerStarted] = useState(false);
  const [set2Time, setSet2Time] = useState(0);
  const [set3Time, setSet3Time] = useState(0);
  const [set4Time, setSet4Time] = useState(0);
  const [set5Time, setSet5Time] = useState(0);
  // const [contArray, setContArray] = useState([
  //   <Set
  //     key={collection.length}
  //     collection={collection}
  //     setCollection={setCollection}
  //   />,
  // ]);
  const startCountDown = () => {
    const secondsMode = true;
    setTimerStarted(true);
    let interval = setTimeout(() => {}, 1000);
    //Depends on set1Time contents
    if (secondsMode && set1Time >= 0) {
      interval = setInterval(() => {
        console.log("Interval");
        // let _tmpTime = set1Time - 1;
        setSet1Time((set1Time) => set1Time - 1);
      }, 1000);
    } else if (set1Time <= 0) {
      console.log("Cleared timer");
      setTimerStarted(true);
      clearInterval(interval);
    }
  };
  const createSet = () => {
    setCollection((collection) => [
      ...collection,
      {
        id: collection.length,
        exercises: [
          {
            id: 0,
            activity: "walk",
            time: 0,
          },
        ],
      },
    ]);
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonHeader>
              <IonTitle>{set1Time}</IonTitle>
            </IonHeader>
          </IonCol>
          <IonCol size="6">
            <IonButton color="primary" onClick={startCountDown}>
              {timerStarted ? "Stop" : "Start"}
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {/* {collection} */}
            {collection &&
              collection.map((set, index) => {
                return (
                  <Set
                    key={index}
                    collection={collection}
                    setCollection={setCollection}
                    id={collection[index].id}
                  />
                );
              })}
            <IonRow>
              <IonButton color="primary" onClick={createSet}>
                Add new Set
              </IonButton>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default ExploreContainer;
