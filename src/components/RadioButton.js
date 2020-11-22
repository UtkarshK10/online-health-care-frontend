import React from 'react'

export default function RadioButton({ name, val1, val2, handleChange, curr }) {

    return (
        <div className='input-field' onChange={handleChange}>
            <div className='first'>
                <label>
                    <input
                        className='with-gap'
                        name={name}
                        type='radio'
                        value={val1}
                        defaultChecked={curr === val1}
                    />
                    <span>{val1}</span>
                </label>
            </div>
            <div className='second'>
                <label>
                    <input
                        className='with-gap'
                        name={name}
                        type='radio'
                        defaultChecked={curr === val2 || curr === "on"}
                    />
                    <span>{val2}</span>
                </label>
            </div>
        </div>
    )
}
