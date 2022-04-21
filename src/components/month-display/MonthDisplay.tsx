import { FunctionComponent } from 'react';
import Input from '../input/Input';
import { DisplayHeader } from '../display-header/DisplayHeader';
import { SummaryItem } from '../summary-item/SummaryItem';
import { Month } from '../../types/Month';
import { getNameOfMonth } from '../../utils/monthUtils';

import './MonthDisplay.css';
import { MonthState } from '../../App';

interface Props {
    month: Month;
    timer: number;
    handleHoursStateChange: (month: Month, timer: number) => void;
    getMonthState: (hoursInMonth: number, month: Month) => MonthState;
}

export const MonthDisplay: FunctionComponent<Props> = ({ month, timer, handleHoursStateChange, getMonthState }) => {
    const monthState = getMonthState(timer, month);

    return (
        <div className="monthDisplay">
            <DisplayHeader title={getNameOfMonth(month)} />
            <div className="wrapper">
                <Input
                    inputId="nameOfMonth"
                    label="Antall timer"
                    type="number"
                    value={timer}
                    placeholder={String(timer)}
                    onChange={(event) => handleHoursStateChange(month, parseFloat(event.target.value))}
                />
                <SummaryItem item="Grunnbeløp" value={monthState.grunnbeløp} />
                <SummaryItem item="Feriepenger" value={monthState.feriepengeTrekk} />
                <SummaryItem item="Brutto" value={monthState.brutto} />
                <SummaryItem item="Skatt" value={monthState.trekk} />
                <SummaryItem item="Netto" value={monthState.netto} />
            </div>
        </div>
    );
};
