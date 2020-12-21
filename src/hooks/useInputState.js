import { useState } from 'react';

const useInputState = initialVal => {
    const [val, setVal] = useState(initialVal);

    const handleChange = e => {
        setVal(e.target.value);
    }
    return [val, handleChange];
}

export default useInputState;