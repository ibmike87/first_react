import React from 'react';
import Header from './Header';
import Body_Origin from './Body_Origin';
import Body_New from './Body_New';
import Footer from './Footer';
import '../../../css/App.css';

function App() {
    return (
        <>
            <Header/>

            {/*<Body_Origin/>*/}

            <Body_New />

            <Footer/>
        </>
    );
}

export default App;
