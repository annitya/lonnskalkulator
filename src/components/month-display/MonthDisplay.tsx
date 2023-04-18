import { FunctionComponent, useEffect, useState } from 'react';
import Input from '../input/Input';
import { DisplayHeader } from '../display-header/DisplayHeader';
import { SummaryItem } from '../summary-item/SummaryItem';
import { Months } from '../../types/Months';
import { emptyMonthState, getNameOfMonth, monthStateBuilder } from '../../utils/monthUtils';

import './MonthDisplay.css';
import { MonthState } from '../../types/MonthState';

export type GetMonthState = ReturnType<typeof monthStateBuilder>;

interface Props {
    month: Months;
    hours: number;
    handleHoursStateChange: (month: Months, timer: number) => void;
    getMonthState: GetMonthState;
}

export const MonthDisplay: FunctionComponent<Props> = ({ month, hours, handleHoursStateChange, getMonthState }) => {
    const [monthState, setMonthState] = useState<MonthState>(emptyMonthState);

    useEffect(() => {
        getMonthState(hours, month).then(setMonthState);
    }, [hours, month, getMonthState]);

    const { baseSalary, holidayPay, grossSalary, taxAmount, netSalary } = monthState;

    return (
        <div className="monthDisplay">
            <DisplayHeader title={getNameOfMonth(month)} />
            <div className="wrapper">
                <Input
                    inputId="nameOfMonth"
                    label="Antall timer"
                    type="number"
                    value={hours}
                    placeholder={String(hours)}
                    onChange={(event) => handleHoursStateChange(month, parseFloat(event.target.value))}
                />
                <SummaryItem item="Grunnbeløp" value={baseSalary} />
                <SummaryItem item="Feriepenger" value={holidayPay} />
                <SummaryItem item="Brutto" value={grossSalary} />
                <SummaryItem item="Skatt" value={taxAmount} />
                <SummaryItem item="Netto" value={netSalary} />
            </div>
        </div>
    );
};
