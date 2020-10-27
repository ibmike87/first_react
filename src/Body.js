import React, {useRef} from "react";
import Counter from "./Counter";
import InputSample from "./InputSample";
import InputUserState from "./InputUserState";
import UserList from './UserList';
import CreateUser from './CreateUser';

function Body () {

    const users = [
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
    ];

    const nextId = useRef(4);

    const onCreate = () => {
        // 나중에 구현 할 배열에 항목 추가하는 로직
        // ...

        nextId.current += 1;
    };

    return (
        <>
            <Counter/>

            <InputSample />

            <InputUserState name="abc" nickName="cdef" />

            <CreateUser />

            <h3>이하는 List render </h3>
            <UserList users={users} />

            <h2> 바디영역입니다.</h2>
            <hr className="body-inline" />
        </>
    )
}

export default Body;