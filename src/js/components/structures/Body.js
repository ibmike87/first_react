import React, {
    useRef,
    useState,
    useMemo     //연산한 값 재사용하기
} from "react";
import Counter from "../functions/Counter";
import InputSample from "../functions/InputSample";
import InputUserState from "../functions/InputUserState";
import UserList from '../functions/UserList';
import CreateUser from '../functions/CreateUser';


function Body() {

    /*==================================*/
    /* variable
    /*==================================*/
    const [inputs, setInputs] = useState({
        //input 객체의 구조
        username: "",
        email: ""
    });

    const {username, email} = inputs;

    const onChange = e => {
        const {name, value} = e.target;

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
            email: "abc@test.com",
            active: true
        },
        {
            id: 2,
            username: "tester",
            email: "test@test.com",
            active: false
        },
        {
            id: 3,
            username: "abc",
            email: "abc123@abc.com",
            active: false
        }
    ]);

    const nextId = useRef(4);

    // 배열에 항목 추가하는 로직
    const onCreate = () => {
        const user = {
            id: nextId.current, //아래에서 추가되는 nextId로 매번 새로운 index 를 생성
            username: username,
            email: email
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

    const onToggle = id => {
        setUsers(
            users.map(user => user.id === id ? {...user, active: !user.active} : user)
        );
    };

    //const count = countActiveUsers(users);  //컴포넌트가 리 랜더링 할때마다 항상 호출하므로 리소스 낭비임.
    const count = useMemo(() => countActiveUsers(users), [users]);  //=> useMemo 특정 결과값을 재사용 할 때 사용

    return (
        <>
            <Counter/> <br/>

            <InputSample/> <br/>
            <InputUserState/> <br/>

            <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>

            <h3>이하는 User List </h3>
            <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
            <div>활성사용자 수 : {count}</div>

            <h2> 바디영역입니다.</h2>
            <hr className="body-inline"/>
        </>
    )
}

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
}

export default Body;