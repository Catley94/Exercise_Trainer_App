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
import React, { useState, useRef, useEffect } from "react";

import Set from "./Set";
import { timer } from "ionicons/icons";

interface ContainerProps {}

const fromTime = new Date(0, 0, 0, 0, 10, 0, 0);

const ExploreContainer: React.FC<ContainerProps> = () => {
  const secondsToTime = (secs: number) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    // console.group("Time");
    // console.log("Hours: ", hours);
    // console.log("Minutes: ", minutes);
    // console.log("Seconds: ", seconds);
    // console.groupEnd();

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };

    return `${obj.m} Minutes ${obj.s} Seconds remaining`;
  };
  const [isOn, setIsOn] = useState(false);
  const [collection, setCollection] = useState([
    { id: 0, exercises: [{ id: 0, activity: "walk", time: 0 }] },
  ]);
  const [totalTime, setTotalTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {}, 1000);
    if (timerStarted) {
      let _tmpTime = totalTime;
      timer = setTimeout(() => {
        _tmpTime -= 1;
        setTotalTime(_tmpTime);
        console.log(_tmpTime);
      }, 1000);
      if (_tmpTime === 0) {
        console.log("reached 0, stopping...");
        clearTimeout(timer);
        setTimerStarted(false);
      }
    } else {
      let tmpTime = 0;
      collection.map((set, i) => {
        set.exercises.map((exercise, index) => {
          tmpTime = tmpTime + exercise.time;
        });
      });
      setTotalTime(tmpTime);
    }
  });

  const startStopCountDown = () => {
    setTimerStarted((timerStarted) => (timerStarted = !timerStarted));
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
          <IonCol size="12" className="ion-text-center">
            <IonHeader>
              <IonTitle>{secondsToTime(totalTime)}</IonTitle>
            </IonHeader>
          </IonCol>
          <IonCol size="12" className="ion-text-center">
            <IonButton
              size="large"
              color="primary"
              onClick={startStopCountDown}
            >
              {timerStarted ? "Stop" : "Start Countdown"}
            </IonButton>
          </IonCol>
        </IonRow>
        {!isOn && (
          <IonRow>
            <IonCol>
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
        )}
      </IonGrid>
    </IonContent>
  );
};

export default ExploreContainer;
