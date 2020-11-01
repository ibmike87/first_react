import React, {useState} from 'react';

function Counter () {

    /*==================================*/
    /* variable
    /*==================================*/
    // 함수의 구조화 할당으로 변수 선언
    const [number, setNumber] = useState(0);
    
/*
    //기존 방식으로 변수 선언
    const numberState = useState(0),
        number = numberState(0),
        setNumber = numberState(0);
*/

    /* Event Handler */
    const onIncrease = () => {
        console.log("+1");
        // setNumber(number + 1);       // 새로운 값(number)를 증가시킨 값을 설정하는 방식
        setNumber(prevNumber => prevNumber + 1); //함수형으로 기존 값을 증가시키는 형태
    }

    const onDecrease = () => {
        console.log("-1");
        // setNumber(number - 1);
        setNumber(prevNumber => prevNumber - 1);
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;