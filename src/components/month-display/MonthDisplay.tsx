import { FunctionComponent } from 'react';
import { skattetrekk, Tabell } from '../../skattetabell/2022';
import Input from '../input/Input';
import { MonthHeader } from '../month-header/MonthHeader';
import { MonthSummaryItem } from '../month-summary-item/MonthSummaryItem';

import './monthDisplay.css';

interface Props {
    nameOfMonth: string;
    hoursInMonth: number;
    timepris: number;
    tabell: Tabell;
    setHoursInMonth: (hours: number) => void;
}

const formatNumber = (n: number): string => {
    return n.toLocaleString();
};

export const MonthDisplay: FunctionComponent<Props> = ({
    nameOfMonth,
    hoursInMonth,
    timepris,
    tabell,
    setHoursInMonth,
}) => {
    const bruttolønn = timepris * hoursInMonth * 0.6;
    const feriepengeTrekk = bruttolønn * 0.12;
    const lønnFørSkatt = bruttolønn - feriepengeTrekk;
    const trekk = skattetrekk(lønnFørSkatt, tabell);
    const nettolønn = lønnFørSkatt - trekk;

    return (
        <div className="monthDisplay">
            <MonthHeader title={nameOfMonth} />
            <div className="wrapper">
                <Input
                    inputId="nameOfMonth"
                    label="Antall timer"
                    type="number"
                    value={hoursInMonth}
                    placeholder={String(hoursInMonth)}
                    onChange={(event) => setHoursInMonth(parseFloat(event.target.value))}
                />
                <MonthSummaryItem item="Brutto" value={formatNumber(bruttolønn)} />
                <MonthSummaryItem item="Feriepenger" value={`-${formatNumber(feriepengeTrekk)}`} />
                <MonthSummaryItem item="Skatt" value={`-${formatNumber(trekk)}`} />
                <MonthSummaryItem item="Netto" value={`${formatNumber(nettolønn)}`} />
            </div>
        </div>
    );
};
