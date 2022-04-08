import { FunctionComponent } from 'react';

import './monthHeader.css';

interface Props {
    title: string;
}

export const MonthHeader: FunctionComponent<Props> = ({ title }) => {
    return (
        <div className="monthHeader">
            <h2>{title}</h2>
        </div>
    );
};
