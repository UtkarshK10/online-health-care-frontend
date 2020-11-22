import React from 'react'

export default function Checkbox({ title, data, handleChange, curr }) {
    return (
        <div>
            <p>{title}</p>
            {data.map((d, idx) => (
                <p key={d.value}>
                    <label>
                        <input defaultChecked={d.value === curr[idx]} onChange={handleChange} name={d.name} value={d.value} type="checkbox" className="filled-in" />
                        <span>{d.label}</span>
                    </label>
                </p>
            ))}

        </div>
    )
}
