/*
*
* !!! create-react-app 으로 프로젝트를 구성했을 때 주의점!!!
* public/index.html 과 src/inex.js 파일의 위치나 이름이 변경되면 create-react-app 이 작동하지 않는다.
*
* */

import React from 'react';
import ReactDOM from 'react-dom';
// import './css/index.css';
import App from './js/components/structures/App';
import * as serviceWorker from './js/components/functions/serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
