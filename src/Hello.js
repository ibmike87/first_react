import React from 'react';
/*
function Hello(props) {
    return <div style={{color: props.color}}>안녕하세요 {props.name}</div>
}
*/

//기본 default props 값 설정할 때 사용한다.
Hello.defaultProps = {
    name: "no name"
}

function Hello({name, color}) {
    return <div style={{color}}>안녕하세요 {name}</div>

}

export default Hello;