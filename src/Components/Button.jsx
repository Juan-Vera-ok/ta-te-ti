import React from "react";
import "../App.css";

export default function Button(props) {

    return (
        <button
            className={`button ${props.simbol}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
