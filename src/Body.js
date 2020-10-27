import React, {useRef, useState} from "react";
import Counter from "./Counter";
import InputSample from "./InputSample";
import InputUserState from "./InputUserState";
import UserList from './UserList';
import CreateUser from './CreateUser';

function Body () {

    /*==================================*/
    /* variable
    /*==================================*/
    const [inputs, setInputs] = useState({
        //input 객체의 구조
        username: "",
        email: ""
    });

    const { username, email } = inputs;

    const onChange = e => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    };
    
    //기존의 사용자들 정보
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'tglim',
            email: "abc@test.com"
        },
        {
            id: 2,
            username: "tester",
            email: "test@test.com"
        },
        {
            id: 3,
            username: "abc",
            email: "abc123@abc.com"
        }
    ]);

    const nextId = useRef(4);

    // 배열에 항목 추가하는 로직
    const onCreate = () => {
        const user = {
            id: nextId.current, //아래에서 추가되는 nextId로 매번 새로운 index 를 생성
            username : username,
            email : email
        };

        setUsers([...users, user]);
        // setUsers(users.concat(user));   //위 코드와 동일함.

        setInputs({
            username: '',
            email: ''
        });

        nextId.current += 1;
    };

    const onRemove = id => {
        // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = user.id 가 id 인 것을 제거함
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <>
            <Counter/> <br/>

            <InputSample /> <br/>

            <InputUserState /> <br/>

            <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>

            <h3>이하는 User List </h3>
            <UserList users={users} onRemove={onRemove}/>

            <h2> 바디영역입니다.</h2>
            <hr className="body-inline" />
        </>
    )
}

export default Body;