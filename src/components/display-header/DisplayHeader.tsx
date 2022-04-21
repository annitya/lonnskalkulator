import { FunctionComponent } from 'react';

import './DisplayHeader.css';

interface Props {
    title: string;
}

export const DisplayHeader: FunctionComponent<Props> = ({ title }) => {
    return (
        <div className="displayHeader">
            <h2>{title}</h2>
        </div>
    );
};
