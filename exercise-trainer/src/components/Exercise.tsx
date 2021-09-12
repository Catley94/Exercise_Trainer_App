import {
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import "./ExploreContainer.css";
import React, { ReactElement, useState, Dispatch, SetStateAction } from "react";
import { InputChangeEventDetail } from "@ionic/core";
import { setConstantValue } from "typescript";

interface ContainerProps {}

const Exercise = (props: {
  key: number;
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
  setID: number;
  id: number;
  activity: string;
  time: number;
}) => {
  const currentSet = props.collection.filter(
    (exercise) => exercise.id === props.id
  );
  const plusClickHandler = () => {
    let _cloneArr = props.collection.slice();
    _cloneArr.map((set, i) => {
      if (set.id == props.setID) {
        set.exercises.map((exercise, index) => {
          if (exercise.id == props.id) {
            exercise.time += 1;
            // exercise.time += 60;
          }
        });
      }
    });
    props.setCollection(_cloneArr);
  };
  const minusClickHandler = () => {
    let _cloneArr = props.collection.slice();
    _cloneArr.map((set, i) => {
      if (set.id == props.setID) {
        set.exercises.map((exercise, index) => {
          if (exercise.id == props.id) {
            if (exercise.time !== 0) {
              exercise.time -= 1;
              // exercise.time -= 60;
            }
          }
        });
      }
    });
    props.setCollection(_cloneArr);
  };
  const numberInputOnChange = (e: CustomEvent<InputChangeEventDetail>) => {
    let _cloneArr = props.collection.slice();
    _cloneArr.map((set, i) => {
      if (set.id == props.setID) {
        set.exercises.map((exercise, index) => {
          if (exercise.id == props.id) {
            exercise.time = e.detail.value ? parseInt(e.detail.value) : 0;
          }
        });
      }
    });
    props.setCollection(_cloneArr);
  };
  const activityInputOnChange = (e: CustomEvent<InputChangeEventDetail>) => {
    let _cloneArr = props.collection.slice();
    _cloneArr.map((set, i) => {
      if (set.id == props.setID) {
        set.exercises.map((exercise, index) => {
          if (exercise.id == props.id) {
            exercise.activity = `${e.detail.value}`;
          }
        });
      }
    });
    props.setCollection(_cloneArr);
  };
  const deleteClickHandler = () => {
    let _cloneArr = props.collection.slice();
    const currentExercise = props.collection.filter(
      (exercise) => exercise.id === props.id
    );
    _cloneArr.map((set, i) => {
      if (set.id == props.setID) {
        set.exercises.map((exercise, index) => {
          // const clickedExercise = set.exercises.filter(
          //   (exercise1) => exercise1.id === props.id
          // );
          // console.log(clickedExercise);
          // set.exercises.splice(clickedExercise, 1);
          if (exercise.id == props.id) {
            if (exercise.id > 0) {
              set.exercises.splice(index, 1);
            }
          }
        });
      }
    });
    props.setCollection(_cloneArr);
  };
  return (
    <IonRow>
      <IonItem>
        <IonIcon
          onClick={deleteClickHandler}
          slot="start"
          icon={closeCircleOutline}
        />
        <IonInput
          placeholder="Activity"
          type="text"
          value={props.activity}
          onIonChange={activityInputOnChange}
        ></IonInput>
        <IonInput
          onIonChange={numberInputOnChange}
          value={props.time}
        ></IonInput>
        <IonButton size="default" onClick={plusClickHandler}>
          +
        </IonButton>
        <IonButton size="default" onClick={minusClickHandler}>
          -
        </IonButton>
      </IonItem>
    </IonRow>
  );
};

export default Exercise;
