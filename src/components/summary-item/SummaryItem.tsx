import { FunctionComponent } from 'react';

import './SummaryItem.css';

interface Props {
    item: string;
    value: number;
}

const formatNumber = (n: number): string => {
    return Math.round(n).toLocaleString();
};

export const SummaryItem: FunctionComponent<Props> = ({ item, value }) => {
    return (
        <div className="summaryItem">
            <p>{item}:</p>
            <p>{formatNumber(value)}</p>
        </div>
    );
};
