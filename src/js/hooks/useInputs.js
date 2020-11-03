import { useState, useCallback } from "react";

function useInputs (initialForm) {
    /*==================================*/
    /* variable
    /*==================================*/
    const [form, setForm] = useState(initialForm);

    const reset = useCallback(() => { setForm(initialForm) }, [initialForm]);

    /*==================================*/
    /* Event Handler */
    /*==================================*/
    const onChange = useCallback(
        e => {
            const {name, value} = e.target;

            setForm(form => ({...form, [name]: value }));
        }, []);

    return [form, onChange, reset];
}

export default useInputs;