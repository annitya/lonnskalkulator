import Header from './components/header/Header';
import './App.css';
import { MonthDisplay } from './components/month-display/MonthDisplay';
import { Select } from './components/select/Select';
import { useState } from 'react';
import { getHoursInMonth } from './utils/dateUtils';
import { Month } from './types/Month';
import Input from './components/input/Input';
import { skattetrekk, Tabell, tableNames } from './skattetabell/2022';
import { YearDisplay } from './components/year-display/YearDisplay';

export interface MonthState {
    timer: number;
    grunnbeløp: number;
    feriepengeTrekk: number;
    brutto: number;
    netto: number;
    trekk: number;
}

export interface HoursState {
    [Month.Jan]: number;
    [Month.Feb]: number;
    [Month.Mar]: number;
    [Month.Apr]: number;
    [Month.May]: number;
    [Month.Jun]: number;
    [Month.Jul]: number;
    [Month.Aug]: number;
    [Month.Sep]: number;
    [Month.Oct]: number;
    [Month.Nov]: number;
    [Month.Dec]: number;
}

const monthStateBuilder =
    (timepris: number, andel: number, tabell: Tabell) =>
    (hoursInMonth: number, month: Month): MonthState => {
        const grunnbeløp = timepris * hoursInMonth * andel;
        const feriepengeTrekk = grunnbeløp * 0.12 * -1;
        const brutto = grunnbeløp + feriepengeTrekk;
        const trekk = month === Month.Nov ? skattetrekk(brutto, tabell) * 0.5 * -1 : skattetrekk(brutto, tabell) * -1;
        const netto = brutto + trekk;

        return {
            timer: hoursInMonth,
            grunnbeløp,
            feriepengeTrekk,
            brutto,
            netto,
            trekk,
        };
    };

const App = () => {
    const [timepris, setTimepris] = useState(1450);
    const [tabell, setTabell] = useState(Tabell.T7100);
    const [andel, setAndel] = useState(0.6);
    const getMonthState = monthStateBuilder(timepris, andel, tabell);

    const [hoursState, setHoursState] = useState<HoursState>(() => ({
        [Month.Jan]: getHoursInMonth(Month.Jan),
        [Month.Feb]: getHoursInMonth(Month.Feb),
        [Month.Mar]: getHoursInMonth(Month.Mar),
        [Month.Apr]: getHoursInMonth(Month.Apr),
        [Month.May]: getHoursInMonth(Month.May),
        [Month.Jun]: getHoursInMonth(Month.Jun),
        [Month.Jul]: getHoursInMonth(Month.Jul),
        [Month.Aug]: getHoursInMonth(Month.Aug),
        [Month.Sep]: getHoursInMonth(Month.Sep),
        [Month.Oct]: getHoursInMonth(Month.Oct),
        [Month.Nov]: getHoursInMonth(Month.Nov),
        [Month.Dec]: getHoursInMonth(Month.Dec),
    }));

    const handleHoursStateChange = (month: Month, timer: number) => {
        setHoursState((state) => ({
            ...state,
            [month]: timer,
        }));
    };

    return (
        <>
            <div className="App">
                <Header title="Lønnskalkulator" />
                <div>
                    <Select
                        label="Skattetabell"
                        value={tabell}
                        options={tableNames.map((table) => ({ name: table, value: table }))}
                        onChange={(event) => setTabell(event.currentTarget.value as Tabell)}
                    />
                    <Select
                        label="Andel konsulent"
                        value={andel}
                        options={[
                            { value: 0.55, name: '55%' },
                            { value: 0.6, name: '60%' },
                        ]}
                        onChange={(event) => setAndel(parseFloat(event.currentTarget.value))}
                    />
                    <Input
                        inputId="timepris"
                        label="Timepris"
                        placeholder="Eks. 1450"
                        value={timepris}
                        onChange={(event) => setTimepris(parseInt(event.target.value, 10))}
                    />
                </div>
                <YearDisplay hoursState={hoursState} getMonthState={getMonthState} />
            </div>
            <div className="monthWrapper">
                <MonthDisplay
                    timer={hoursState[Month.Jan]}
                    month={Month.Jan}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Feb]}
                    month={Month.Feb}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Mar]}
                    month={Month.Mar}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Apr]}
                    month={Month.Apr}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.May]}
                    month={Month.May}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Jun]}
                    month={Month.Jun}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
            </div>
            <div className="monthWrapper">
                <MonthDisplay
                    timer={hoursState[Month.Jul]}
                    month={Month.Jul}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Aug]}
                    month={Month.Aug}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Sep]}
                    month={Month.Sep}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Oct]}
                    month={Month.Oct}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Nov]}
                    month={Month.Nov}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    timer={hoursState[Month.Dec]}
                    month={Month.Dec}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
            </div>
        </>
    );
};

export default App;
