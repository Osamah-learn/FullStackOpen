import React from "react";
import "../styles/Notifications.css";

export default function Notification(props) {
  const successMessage = () => {
    if (props.sucsessMessage === null) {
      return null;
    }

    return <div className="sucsess"> {props.sucsessMessage} </div>;
  };

  return (
    <div>
      <h1>{successMessage()}</h1>
    </div>
  );
}
