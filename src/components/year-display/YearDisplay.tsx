import { FunctionComponent, useEffect, useState } from 'react';
import { HoursState } from '../../types/HoursState';
import { DisplayHeader } from '../display-header/DisplayHeader';
import { SummaryItem } from '../summary-item/SummaryItem';

import './YearDisplay.css';
import { emptyMonthState } from '../../utils/monthUtils';
import { GetMonthState } from '../month-display/MonthDisplay';
import { MonthState } from '../../types/MonthState';
import { TaxTable } from '../../taxes/taxTables';

interface Props {
    hoursState: HoursState;
    getMonthState: GetMonthState;
    taxTable: TaxTable;
}

const useTotals = (hoursState: HoursState, getMonthState: GetMonthState, taxTable: TaxTable) => {
    const [totals, setTotals] = useState<MonthState>(emptyMonthState);

    useEffect(() => {
        const promises = Object.entries(hoursState).map(([month, hours]) => {
            // @ts-ignore
            return getMonthState(hours, month);
        });

        Promise.all(promises).then(function (monthStates: MonthState[]) {
            const newTotals = { ...emptyMonthState };

            monthStates.forEach(monthState => {

                newTotals.hoursInMonth += monthState.hoursInMonth;
                newTotals.baseSalary += monthState.baseSalary;
                newTotals.holidayPay += monthState.holidayPay;
                newTotals.grossSalary += monthState.grossSalary;
                newTotals.netSalary += monthState.netSalary;
                newTotals.taxAmount += monthState.taxAmount;
            });

            setTotals(newTotals);
        });
    }, [hoursState, taxTable, getMonthState])

    return totals;
};

export const YearDisplay: FunctionComponent<Props> = ({ hoursState, getMonthState, taxTable }) => {
    const { hoursInMonth, baseSalary, holidayPay, grossSalary, taxAmount, netSalary } = useTotals(hoursState, getMonthState, taxTable);
    const skatteprosent = Math.round(Math.abs(taxAmount / grossSalary) * 100);

    return (
        <div className="yearDisplay">
            <DisplayHeader title={String(new Date().getFullYear())} />
            <div className="wrapper">
                <SummaryItem item="Timer" value={hoursInMonth} />
                <SummaryItem item="Grunnbeløp" value={baseSalary} />
                <SummaryItem item="Feriepenger" value={holidayPay} />
                <SummaryItem item="Brutto" value={grossSalary} />
                <SummaryItem item={`Skatt (${skatteprosent}%)`} value={taxAmount} />
                <SummaryItem item="Netto" value={netSalary} />
            </div>
        </div>
    );
};
