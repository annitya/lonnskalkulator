import Header from './components/header/Header';
import { MonthDisplay } from './components/month-display/MonthDisplay';
import { Select } from './components/select/Select';
import { useState } from 'react';
import { getHoursInMonth } from './utils/dateUtils';
import { Month } from './types/Month';
import Input from './components/input/Input';
import { Tabell, tableNames } from './skattetabell/2022';
import { YearDisplay } from './components/year-display/YearDisplay';
import { HoursState } from './types/HoursState';
import { monthStateBuilder } from './utils/monthUtils';

import './App.css';

const App = () => {
    const [timepris, setTimepris] = useState(1450);
    const [tabell, setTabell] = useState(Tabell.T7100);
    const [andel, setAndel] = useState(0.6);
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

    const getMonthState = monthStateBuilder(timepris, andel, tabell);

    const handleHoursStateChange = (month: Month, timer: number) => {
        setHoursState({
            ...hoursState,
            [month]: timer,
        });
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
