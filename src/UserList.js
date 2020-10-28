import React, { useEffect } from "react";

//컴포넌트1
function User({user, onRemove, onToggle}) {
    useEffect(() => {
        console.log("컴포넌트가 나타남");
        return () => {
            console.log("컴포넌트가 사라짐");
        };
    }, []);

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
}

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

export default UserList;