import { IonRow, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import "./ExploreContainer.css";
import React, { useState } from "react";

interface ContainerProps {}

const Exercise: React.FC<{ timer: number | string }> = (props) => {
  const [number1, setState1] = useState(`${props.timer}`);
  return (
    <IonRow>
      <IonItem>
        <IonLabel>Walk</IonLabel>
        <IonInput
          value={number1}
          onIonChange={(event) => {
            if (parseInt(event.detail.value!) < 0) {
              console.log("Less than 0");
              event.detail.value! = "0";
            }
            setState1(event.detail.value!);
          }}
        ></IonInput>
        <IonButton
          size="default"
          onClick={() => {
            var temp = parseInt(number1) + 1;
            setState1(temp.toString());
          }}
        >
          +
        </IonButton>
        <IonButton
          size="default"
          onClick={() => {
            if (parseInt(number1) <= 0) {
              console.log("Less than 0, button");
            } else {
              var temp = parseInt(number1) - 1;
              setState1(temp.toString());
            }
          }}
        >
          -
        </IonButton>
      </IonItem>
    </IonRow>
  );
};

export default Exercise;
