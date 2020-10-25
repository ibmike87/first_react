import React from "react";
import Counter from "./Counter";
import InputSample from "./InputSample";
import InputUserState from "./InputUserState";

function Body () {
    return (
        <>
            <Counter/>

            <InputSample />

            <InputUserState name="abc" nickName="cdef" />

            <h2> 바디영역입니다.</h2>
            <hr className="body-inline" />
        </>
    )
}

export default Body;