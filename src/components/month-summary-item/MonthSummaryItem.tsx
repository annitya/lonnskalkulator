import { FunctionComponent } from 'react';

import './monthSummaryItem.css';

interface Props {
    item: string;
    value: number;
}

const formatNumber = (n: number): string => {
    return n.toLocaleString();
};

export const MonthSummaryItem: FunctionComponent<Props> = ({ item, value }) => {
    return (
        <div className="monthSummaryItem">
            <p>{item}:</p>
            <p>{formatNumber(value)}</p>
        </div>
    );
};
