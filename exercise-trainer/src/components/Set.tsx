import {
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonGrid,
  IonCol,
  IonIcon,
  IonCardSubtitle,
} from "@ionic/react";
import "./ExploreContainer.css";
import React, { useState, Dispatch, SetStateAction } from "react";
import Exercise from "./Exercise";
import { closeCircleOutline } from "ionicons/icons";
interface ContainerProps {}

const Set = (props: {
  collection: {
    id: number;
    exercises: { id: number; activity: string; time: number }[];
  }[];
  setCollection: Dispatch<
    SetStateAction<
      {
        id: number;
        exercises: { id: number; activity: string; time: number }[];
      }[]
    >
  >;
  id: number;
  selectedUnit: string;
}) => {
  const id = props.collection.length;
  const createExercise = () => {
    let _cloneArr = props.collection.slice();
    _cloneArr.map((set, i) => {
      if (set.id == props.id) {
        set.exercises.push({
          id: set.exercises.length,
          activity: "Run",
          time: 0,
        });
      }
    });
    props.setCollection(_cloneArr);
  };

  const deleteClickHandler = () => {
    let _cloneArr = props.collection.slice();
    const currentSet = props.collection.filter((set) => set.id === set.id);
    _cloneArr.map((set, i) => {
      if (set.id == props.id) {
        // const clickedExercise = set.exercises.filter(
        //   (exercise1) => exercise1.id === props.id
        // );
        // console.log(clickedExercise);
        // set.exercises.splice(clickedExercise, 1);

        if (set.id > 0) {
          _cloneArr.splice(i, 1);
        }
      }
    });
    props.setCollection(_cloneArr);
  };
  return (
    <IonCard>
      <IonGrid>
        <IonCol>
          <IonRow>
            <IonCardHeader>
              <IonCardTitle>
                Set {props.id + 1}
                {/* <IonItem lines="none">
                  <IonIcon
                    className="ion-padding-start"
                    onClick={deleteClickHandler}
                    slot="end"
                    icon={closeCircleOutline}
                  />
                </IonItem> */}
              </IonCardTitle>
            </IonCardHeader>
            {props.collection[props.id].exercises.map((exercise, i) => {
              return (
                <Exercise
                  key={i}
                  collection={props.collection}
                  setCollection={props.setCollection}
                  setID={props.id}
                  id={exercise.id}
                  activity={exercise.activity}
                  time={exercise.time}
                  selectedUnit={props.selectedUnit}
                />
              );
            })}
          </IonRow>
          <IonRow>
            <IonButton color="primary" onClick={createExercise}>
              Add new exercise
            </IonButton>
          </IonRow>
        </IonCol>
      </IonGrid>
    </IonCard>
  );
};

export default Set;
