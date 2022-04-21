import { FunctionComponent } from 'react';
import { HoursState } from '../../types/HoursState';
import { Month } from '../../types/Month';
import { MonthState } from '../../types/MonthState';
import { DisplayHeader } from '../display-header/DisplayHeader';
import { SummaryItem } from '../summary-item/SummaryItem';

import './YearDisplay.css';

interface Props {
    hoursState: HoursState;
    getMonthState: (hoursInMonth: number, month: Month) => MonthState;
}

const getTotals = (hoursState: HoursState, getMonthState: (hoursInMonth: number, month: Month) => MonthState) => {
    const totals = {
        timer: 0,
        grunnbeløp: 0,
        feriepengeTrekk: 0,
        brutto: 0,
        netto: 0,
        trekk: 0,
    };

    Object.keys(hoursState).forEach((key: any) => {
        const month: Month = key;

        const monthState = getMonthState(hoursState[month], month);

        totals.timer += monthState.timer;
        totals.grunnbeløp += monthState.grunnbeløp;
        totals.feriepengeTrekk += monthState.feriepengeTrekk;
        totals.brutto += monthState.brutto;
        totals.netto += monthState.netto;
        totals.trekk += monthState.trekk;
    });

    return totals;
};

export const YearDisplay: FunctionComponent<Props> = ({ hoursState, getMonthState }) => {
    const totals = getTotals(hoursState, getMonthState);

    return (
        <div className="yearDisplay">
            <DisplayHeader title={String(new Date().getFullYear())} />
            <div className="wrapper">
                <SummaryItem item="Grunnbeløp" value={totals.grunnbeløp} />
                <SummaryItem item="Feriepenger" value={totals.feriepengeTrekk} />
                <SummaryItem item="Brutto" value={totals.brutto} />
                <SummaryItem item="Skatt" value={totals.trekk} />
                <SummaryItem item="Netto" value={totals.netto} />
            </div>
        </div>
    );
};
