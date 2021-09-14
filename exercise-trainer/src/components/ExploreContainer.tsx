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
  IonItem,
  IonNote,
} from "@ionic/react";
import "./ExploreContainer.css";
import React, { useState, useRef, useEffect } from "react";

import Set from "./Set";
import {
  calculatorOutline,
  constructOutline,
  logoSoundcloud,
  timer,
  walk,
} from "ionicons/icons";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [collection, setCollection] = useState([
    { id: 0, exercises: [{ id: 0, activity: "Walk", time: 0 }] },
  ]);
  const [totalTime, setTotalTime] = useState(0);
  const [_totalTime, _setTotalTime] = useState(totalTime);
  const [_totalTimeClone, _setTotalTimeClone] = useState(totalTime);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("minutes");
  const [currentTime, setCurrentTime] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [soundPlayed, setSoundPlayed] = useState(false);

  let clone = collection.slice();
  let editableClone = collection.slice();

  const voice = {
    walk: "<path/to/walk>",
    run: "<path/to/run>",
    jog: "<path/to/jog>",
    beep: "<path/to/beep",
  };

  useEffect(() => {
    let timer = setTimeout(() => {}, 1000);
    if (timerStarted) {
      let _tmpTime = totalTime;
      timer = setTimeout(() => {
        _tmpTime -= 1;
        setTotalTime(_tmpTime);
        _setTotalTime(totalTime);
      }, 1000);

      if (_tmpTime === 0) {
        console.log("reached 0, stopping...");
        clearTimeout(timer);
        setTimerStarted(false);
        setExerciseIndex(0);
        setSetIndex(0);
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

  useEffect(() => {
    _setTotalTime(totalTime);
    _setTotalTimeClone(totalTime);
  }, [timerStarted]);

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
    setExerciseIndex(0);
    setSetIndex(0);
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
            activity: "Walk",
            time: 0,
          },
        ],
      },
    ]);
  };

  const mapTimes = () => {
    // For each Set
    return collection.map((set, i) => {
      // For each Exercise
      return collection[i].exercises.map((exercise, index) => {
        // Looping through exercises in a controlled way
        console.log(setIndex, exerciseIndex);
        if (exerciseIndex === index && setIndex === i) {
          // for example
          // tt 240 === tt clone 300 - exercise.time 60 = 240
          if (_totalTime === _totalTimeClone - exercise.time) {
            _setTotalTimeClone(_totalTime);
            if (exerciseIndex >= set.exercises.length - 1) {
              setSetIndex((setIndex) => (setIndex += 1));
              setExerciseIndex(0);
            } else {
              setExerciseIndex((exerciseIndex) => (exerciseIndex += 1));
            }
            setSoundPlayed(false);
          }
          if (!soundPlayed) {
            // sound.play();
            switch (exercise.activity) {
              case "Walk":
              case "walk":
                // voice.walk.play()
                break;
              case "Run":
              case "run":
                // voice.run.play()
                break;
              case "Jog":
              case "jog":
                // voice.jog.play()
                break;
              default:
                console.log("Unknown activity: ", exercise.activity);
                // voice.beep.play();
                break;
            }
            console.log(exercise.activity);
            setSoundPlayed(true);
          }
          return (
            <IonRow key={index} className="ion-text-center">
              <IonCol size="12">
                <IonCard>
                  <IonCardSubtitle className="ion-padding">
                    Set {set.id + 1}
                  </IonCardSubtitle>
                  <IonCardSubtitle color="success" className="ion-padding">
                    {Math.abs(_totalTimeClone - totalTime - exercise.time)}{" "}
                    seconds
                  </IonCardSubtitle>
                  <IonCardTitle className="ion-padding large-font">
                    {exercise.activity}
                  </IonCardTitle>
                </IonCard>
              </IonCol>
            </IonRow>
          );
        }
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
        {timerStarted && mapTimes()}
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
