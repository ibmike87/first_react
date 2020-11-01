import React from "react";
import Hello from '../functions/Hello';
import Wrapper from "./Wrapper";

function Header () {
    // const name = 'react';
    /*
    * 컴포넌트 내부에서 종결되는 style 테그 입력 방법
    const style = {
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: 24,
        padding: '1rem'
    }*/

    return (
        <>
            {/*<Hello/>*/}
            {/*<div cl  ssName="header-title">{name}</div>*/}
            {/*<div className="gray-box"/>*/}

            <div className="header-title">
                <Hello name="react" color="purple"/>   {/* => 여기에 있는 name, color 값은 Hello 컴포넌트의 props 값으로 전달된다.*/}
            </div>
            <Hello color="green"/>


            <Wrapper>
                {/*이 아래 부분은 Wrapper 의 props.children 에 포함됨.*/}
                <Hello name="react" color="red" isSpecial={true}/>  {/* => isSpecial={true} 이 부분이 조건부*/}
                <Hello name="react" color="red" isSpecial/>  {/* => isSpecial 만 써도 위에 코드와 완전히 동일함*/}
                <Hello name="두번째" color="pink" />
            </Wrapper>

            <h2>헤더영역입니다.</h2>
            <hr className="header-inline"/>

        </>
    )
}

export default Header;