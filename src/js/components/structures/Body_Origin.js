import React, {
    useRef,         //DOM 을 선택하는 용도 + 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리
    useState,       //컴포넌트에서 바뀌는 값 관리하기
    useMemo,        //특정 결과값을 재사용할 때
    useCallback     //특정 함수를 재사용할 때
} from "react";
import Counter from "../functions/Counter";
import InputSample from "../functions/InputSample";
import InputUserState from "../functions/InputUserState";
import UserList from '../functions/UserList';
import CreateUser from '../functions/CreateUser';

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
}

function Body_Origin() {

    /*==================================*/
    /* variable
    /*==================================*/
    /* 7. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기 */
    const [inputs, setInputs] = useState({
        //input 객체의 구조
        username: "",
        email: ""
    });

    const {username, email} = inputs;


    /* 7. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기 */
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

    /* 12. useRef 로 컴포넌트 안의 변수 만들기 */
    const nextId = useRef(4);

    /* 17. useMemo 를 사용하여 연산한 값 재사용하기 */
    // const count = countActiveUsers(users);  //컴포넌트가 리 랜더링 할때마다 항상 호출하므로 리소스 낭비임.
    const count = useMemo(() => countActiveUsers(users), [users]);  //=> useMemo 특정 결과값을 재사용 할 때 사용


    /*==================================*/
    /* Event Handler */
    /*==================================*/
    const onChange = useCallback(
        e => {
            const {name, value} = e.target;
            
            //19. 함수형으로 전환
            setInputs(inputs => ({
                ...inputs,
                [name]: value
            }));
        },
        []  //위에서 함수형으로 전환하고 기존 deps에서 users를 삭제
    );

    // 배열에 항목 추가하는 로직
    const onCreate = useCallback(
        () => {
            const user = {
                id: nextId.current, //아래에서 추가되는 nextId로 매번 새로운 index 를 생성
                username: username,
                email: email
            };

            //19. 함수형으로 전환
            setUsers(users => ([...users, user]));
            // setUsers(users.concat(user));   //위 코드와 동일함.

            setInputs({
                username: '',
                email: ''
            });

            nextId.current += 1;
        },
        [username, email] //위에서 함수형으로 전환하고 기존 deps에서 users 를 삭제
    );

    const onRemove = useCallback(
            id => {
            // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
            // = user.id 가 id 인 것을 제거함
            //19. 함수형으로 전환
            setUsers(users => users.filter(user => user.id !== id));
        },
        [] //위에서 함수형으로 전환하고 기존 deps에서 users 를 삭제
    );

    const onToggle = useCallback(
            id => {

            //19. 함수형으로 전환
            setUsers(users =>
                users.map(user => user.id === id ? {...user, active: !user.active} : user)
            );
        },
        []  //위에서 함수형으로 전환하고 기존 deps에서 users 를 삭제
    );

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

export default Body_Origin;