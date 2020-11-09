import React, { useState } from 'react';

function InputSample () {

    /*==================================*/
    /* variable
    /*==================================*/
    const [text, setText] = useState("");

    /* Event Handler */
    const onChange = (e) => {
        setText(e.target.value);
    };

    const onReset = () => {
        setText("");
    };

    /* JSX */
    return (
        <div>
            <input onChange={onChange} value={text} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: {text}</b>
            </div>
        </div>
    );
}

export default InputSample;
