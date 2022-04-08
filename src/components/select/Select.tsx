import { FunctionComponent, useId } from 'react';
import { Tabell, tableNames } from '../../skattetabell/2022';

import './select.css';

interface Props {
    label: string;
    tabell: Tabell;
    setTabell: (tabell: Tabell) => void;
}

export const Select: FunctionComponent<Props> = ({ label, tabell, setTabell }) => {
    const id = useId();

    return (
        <div className="select">
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                value={tabell}
                className="dropdown"
                onChange={(event) => {
                    setTabell(event.target.value as Tabell);
                }}
            >
                {tableNames.map((name) => (
                    <option value={name} key={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};
