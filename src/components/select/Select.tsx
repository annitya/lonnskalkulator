import React, { FunctionComponent, useId } from 'react';

import './Select.css';

interface Props {
    label: string;
    value: any;
    options: any[];
    onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}

export const Select: FunctionComponent<Props> = ({ label, value, options, onChange }) => {
    const id = useId();

    return (
        <div className="select">
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} className="dropdown" onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value} key={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
