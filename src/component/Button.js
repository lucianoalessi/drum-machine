import React from "react";
import '../style-sheets/Button.css'


function Button(props){
    return(
        <div className="button-container">
            {props.children}
        </div>
    );
}


export default Button;
