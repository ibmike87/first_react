import React, {
    useRef,         //DOM 을 선택하는 용도 + 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리
    useReducer,       //컴포넌트에서 바뀌는 값 관리하기
    useMemo,        //특정 결과값을 재사용할 때
    useCallback     //특정 함수를 재사용할 때
} from "react";
import UserList from '../functions/UserList';
import CreateUser from '../functions/CreateUser';
import useInputs from '../../hooks/useInputs';
import produce from 'immer';

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
}

const initialState = {
    // inputs: { username: "",  email: "" },

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
    switch (action.type) {
/*
        case "CHANGE_INPUT":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            };
*/

        case "CREATE_USER":
/*            return {
                // inputs: initialState.inputs,
                users: state.users.concat(action.user)
            };
*/
            // 23. immer를 사용했을 때
            return produce(state, draft => {
                draft.users.push(action.user);
            });

        case 'TOGGLE_USER':
/*
            return {
                // ...state,
                users: state.users.map(user =>
                    user.id === action.id ? { ...user, active: !user.active } : user
                )
            };
*/
            // 23. immer를 사용했을 때
            return produce(state, draft => {
                const user = draft.users.find(user => user.id === action.id);
                user.active = !user.active;
            });

        case 'REMOVE_USER':
/*
            return {
                // ...state,
                users: state.users.filter(user => user.id !== action.id)
            };
*/
        // 23. immer를 사용했을 때
        return produce(state, draft => {
            const index = draft.users.findIndex(user => user.id === action.id);
            draft.users.splice(index, 1);
        });

        default :
            return state;
    }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);
// 이렇게 내보내주면 나중에 사용하고 싶을 때 다음과 같이 불러와서 사용 할 수 있습니다.
// import { UserDispatch } from './App';


function Body_New() {
    const [{ username, email }/* <- 이게 form */, onChange, onReset] = useInputs({
        username: "",
        email: ""
    })

    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { users } = state;
    // const { username, email } = state.inputs;
/*

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE_INPUT",
            name,
            value
        });
    }, [])
*/

    const onCreate = useCallback(() => {
        dispatch({
            type: "CREATE_USER",
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        onReset();

        nextId.current += 1;
    }, [username, email, onReset]);

    // const onToggle = useCallback(id => {
    //     dispatch({
    //         type: 'TOGGLE_USER',
    //         id
    //     });
    // }, []);

    // const onRemove = useCallback(id => {
    //     dispatch({
    //         type: 'REMOVE_USER',
    //         id
    //     });
    // }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        /* 이렇게 설정해주고 나면 Provider 에 의하여 감싸진 컴포넌트 중 어디서든지 우리가 Context 의 값을 다른 곳에서 바로 조회해서 사용 할 수 있음 */
        <UserDispatch.Provider value={dispatch}>
            <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
            <h3>이하는 User List </h3>
            {/*<UserList users={users} onToggle={onToggle} onRemove={onRemove} />*/}
            <div>활성사용자 수 : {count}</div>

            <h2> 바디영역입니다.</h2>
            <hr className="body-inline"/>
        </UserDispatch.Provider>
    )
}

export default Body_New;