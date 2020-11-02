import React, {
    useRef,         //DOM 을 선택하는 용도 + 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리
    useReducer,       //컴포넌트에서 바뀌는 값 관리하기
    useMemo,        //특정 결과값을 재사용할 때
    useCallback     //특정 함수를 재사용할 때
} from "react";
import UserList from '../functions/UserList';
import CreateUser from '../functions/CreateUser';

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
}

const initialState = {
    inputs: {
        username: "",
        email: ""
    },
    users: [
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
    ]
};

function reducer(state, action) {
    debugger;

    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            };
        case "CREATE_USER":
            return {
                inputs: initialState.inputs,
                users: state.users.concat(action.user)
            }
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, active: !user.active } : user
                )
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            };
        default :
            return state;
    }
}

function Body_New() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;
    const { username, email } = state.inputs;

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE_INPUT",
            name,
            value
        });
    }, [])

    const onCreate = useCallback(() => {
        dispatch({
            type: "CREATE_USER",
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        nextId.current += 1;
    }, [username, email]);

    const onToggle = useCallback(id => {
        dispatch({
            type: 'TOGGLE_USER',
            id
        });
    }, []);

    const onRemove = useCallback(id => {
        dispatch({
            type: 'REMOVE_USER',
            id
        });
    }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <>
            <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
            <h3>이하는 User List </h3>
            <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
            <div>활성사용자 수 : {count}</div>

            <h2> 바디영역입니다.</h2>
            <hr className="body-inline"/>
        </>
    )
}

export default Body_New;