import React, { useEffect } from "react";

//컴포넌트1
const User = React.memo(function User({user, onRemove, onToggle}) {
// function User({user, onRemove, onToggle}) {

    //useEffect는 마운트(컴포넌트 생성), 언마운트 (컴포넌트 삭제) 시점의 생명주기 handelr 같은 역할인가?
    useEffect(() => {
        //화면에 컴포넌트가 생길때 실행

        console.log('user 값이 설정됨');
        console.log(user);
        return () => {  // => 이 익명함수가 cleanup  함수임.
            //화면에 컴포넌트가 사라질때 실행

            console.log('user 가 바뀌기 전..');
            console.log(user);
        };
    }, [user]); // => deps 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 useEffect 에 등록한 함수가 호출

    console.log("##리렌더링 되는지 확인용 :" + user.id);
    return (
        <div>
            <b style={{cursor: "pointer", color: user.active ? "green" : "black"}}      /* 중괄호 1개와 2개 차이는?? */
               onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>

            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
});

//컴포넌트2
function UserList ({users, onRemove, onToggle}) {
    return (
        <div>
            {users.map((user) => (
                <User
                    user={user}
                    key={user.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);