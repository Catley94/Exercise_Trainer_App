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
} from "@ionic/react";
import "./ExploreContainer.css";
import React, { useState, Dispatch, SetStateAction } from "react";
import Exercise from "./Exercise";

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
  return (
    <IonCard>
      <IonGrid>
        <IonCol>
          <IonRow>
            <IonCardHeader>
              <IonCardTitle>Set {props.id + 1}</IonCardTitle>
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
