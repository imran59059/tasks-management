import React, { useRef, useState } from 'react'

const ControlUncontrol = () => {

    const nameRef = useRef(null);
    const emailRef = useRef(null);

    // "use strict";

    const obj = {
        value: 100,
        arrowFunc: () => {
            console.log(obj.value);  // ✅ window object (in browser)
        }
    };

    obj.arrowFunc();


    const handleSubmit = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        console.log({ name, email });
        // console.log(this);
    }

    return (
        <div>
            <h1>Uncontrol Form</h1>
            <form>
                <input ref={nameRef} type="text" style={{ border: "1px solid black" }} />
                <br />
                <input ref={emailRef} type="email" style={{ border: "1px solid black" }} />
                <br />
                <button type='button' onClick={() => handleSubmit()} style={{ border: "1px solid black" }}>Submit</button>
            </form>

        </div>
    )
}

export default ControlUncontrol