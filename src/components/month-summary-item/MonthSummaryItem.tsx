import { FunctionComponent } from 'react';

import './monthSummaryItem.css';

interface Props {
    item: string;
    value: string;
}

export const MonthSummaryItem: FunctionComponent<Props> = ({ item, value }) => {
    return (
        <div className="monthSummaryItem">
            <p>{item}:</p>
            <p>{value}</p>
        </div>
    );
};
