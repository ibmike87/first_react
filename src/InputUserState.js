import React, {useState} from "react";


//어라 ?? 이게 안먹네???
InputUserState.defaultProps = {
    name: "unKnown",
    nickName: "unKnown"
};

function InputUserState ({name, nickName}) {
    /*==================================*/
    /* variable
    /*==================================*/
    // const {name, nickName} = inputs;    //비구조화 할당으로 값 추출

    const [inputs, setInputs] = useState({
        name: name,
        nickName: nickName,
    });

    /*==================================*/
    /* Event Handler */
    /*==================================*/
    const onChange = (e) => {
        const {value, name} = e.target; // e.target에서 value, name 을 비구조화로 추출

        setInputs({
            ...inputs,  //기존의 input 을 복사
            [name]: value   //name 키를 가진 값을 value 로 설정함.
        });
    };

    const onReset = () => {
        setInputs({
            name: "",
            nickName: ""
        });
    };


    return (
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name}/>
            <input name="nickName" placeholder="닉네임" onChange={onChange} value={nickName}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickName})
            </div>
        </div>
    )
}

export default InputUserState;