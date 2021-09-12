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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import "./ExploreContainer.css";
import React, { useState, useRef, useEffect } from "react";

import Set from "./Set";
import { calculatorOutline, constructOutline, timer } from "ionicons/icons";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [collection, setCollection] = useState([
    { id: 0, exercises: [{ id: 0, activity: "walk", time: 0 }] },
  ]);
  const [totalTime, setTotalTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("minutes");
  const [currentTime, setCurrentTime] = useState(0);

  let clone = collection.slice();
  let editableClone = collection.slice();
  let setIndex = 0;
  let exerciseIndex = 0;

  // useEffect(() => {
  //   setCurrentTime(totalTime);
  //   let timer = setTimeout(() => {}, 1000);
  //   timer = setTimeout(() => {
  //     if (timerStarted) {
  //       console.log("triggered1");
  //       editableClone.map((set, i) => {
  //         if (i === setIndex) {
  //           // console.log(setIndex, exerciseIndex);
  //           set.exercises.map((exercise, index) => {
  //             // console.log("test");
  //             if (index === exerciseIndex) {
  //               setCurrentTime(exercise.time);
  //               console.log("test");
  //               exercise.time -= 1;
  //             }
  //             if (exercise.time === 0) {
  //               console.log("exercise time == 0, increasing");
  //               exerciseIndex += 1;
  //               if (exerciseIndex > set.exercises.length) {
  //                 console.log("exerciseIndex > length");
  //                 exerciseIndex = 0;
  //                 setIndex += 1;
  //               }
  //             }
  //           });
  //         }
  //       });
  //     }
  //     setCollection(editableClone);
  //   }, 1000);
  // }, [currentTime]);

  useEffect(() => {
    let timer = setTimeout(() => {}, 1000);
    if (timerStarted) {
      let _tmpTime = totalTime;
      timer = setTimeout(() => {
        _tmpTime -= 1;
        setTotalTime(_tmpTime);
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
  let each = () => {
    collection.map((set, index) => {
      set.exercises.map((exercise, i) => {
        console.log(exercise.time);
        return (
          <IonCardTitle key={i}>
            {index} {i}: {exercise.time}
          </IonCardTitle>
        );
      });
    });
  };
  return (
    <IonContent>
      <IonGrid>
        {!timerStarted && (
          <IonRow>
            <IonSegment
              value={selectedUnit}
              onIonChange={(e) => setSelectedUnit(`${e.detail.value}`)}
            >
              <IonSegmentButton value="minutes">
                <IonLabel>Minutes</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="seconds">
                <IonLabel>Seconds</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonRow>
        )}
        <IonRow>
          <IonCol size="12" className="ion-text-center">
            <IonRow>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{secondsToTime(totalTime)}</IonCardTitle>
                  {timerStarted ? (
                    collection.map((set, i) => {
                      return collection[i].exercises.map((exercise, index) => {
                        return (
                          <IonCardTitle key={index}>
                            {exercise.activity}: {exercise.time}
                          </IonCardTitle>
                        );
                      });
                      // set.exercises.map((exercise, index) => {
                      // });
                    })
                  ) : (
                    <IonCardTitle>
                      {collection[0].exercises[0].time}
                    </IonCardTitle>
                  )}
                </IonCardHeader>
              </IonCard>
            </IonRow>
          </IonCol>
          <IonCol size="12" className="ion-text-center">
            <IonButton
              size="large"
              color="primary"
              onClick={startStopCountDown}
            >
              {timerStarted ? "Stop and Reset" : "Start Countdown"}
            </IonButton>
          </IonCol>
        </IonRow>
        {!timerStarted && (
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
                      selectedUnit={selectedUnit}
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
