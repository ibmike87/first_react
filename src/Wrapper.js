import React from 'react';

function Wrapper ({children}) {

    /* style */
    const style = {
        border: '2px solid black',
        padding: '16px'
    };

    return (
        <div style={style}>
            {children}  {/*Wrapper 의 children tag 부분들이 표시되는 부분*/}
        </div>
    )
}

export default Wrapper;