import React from 'react';
import Hello from './Hello';
import './App.css';

function App() {
    const name = 'react';
    /*const style = {
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: 24,
        padding: '1rem'
    }*/

    return (
        <>
            {/*<Hello/>*/}
            {/*<div className="header-title">{name}</div>*/}
            {/*<div className="gray-box"/>*/}

            <div className="header-title">
                <Hello name="react" color="purple"/>   {/* => 여기에 있는 name, color 값은 Hello 컴포넌트의 props 값으로 전달된다.*/}
            </div>
            <Hello color="green"/>

        </>
    );
}

export default App;
