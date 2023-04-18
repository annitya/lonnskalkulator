import Header from './components/header/Header';
import { MonthDisplay } from './components/month-display/MonthDisplay';
import { Select } from './components/select/Select';
import { getHoursInMonth } from './utils/dateUtils';
import { Months } from './types/Months';
import Input from './components/input/Input';
import { TaxTable, tableNames } from './taxes/taxTables';
import { YearDisplay } from './components/year-display/YearDisplay';
import { monthStateBuilder } from './utils/monthUtils';
import { useURLState } from './hooks/useURLState';
import { useCallback } from 'react';

import './App.css';

type State = {
    hourlyPrice: number;
    taxTable: TaxTable;
    employeeShare: number;
    hours: {
        [T in Months]: number;
    };
};

const initialState = (): State => ({
    hourlyPrice: 1450,
    taxTable: TaxTable.T7100,
    employeeShare: 0.6,
    hours: {
        [Months.Jan]: getHoursInMonth(Months.Jan),
        [Months.Feb]: getHoursInMonth(Months.Feb),
        [Months.Mar]: getHoursInMonth(Months.Mar),
        [Months.Apr]: getHoursInMonth(Months.Apr),
        [Months.May]: getHoursInMonth(Months.May),
        [Months.Jun]: getHoursInMonth(Months.Jun),
        [Months.Jul]: getHoursInMonth(Months.Jul),
        [Months.Aug]: getHoursInMonth(Months.Aug),
        [Months.Sep]: getHoursInMonth(Months.Sep),
        [Months.Oct]: getHoursInMonth(Months.Oct),
        [Months.Nov]: getHoursInMonth(Months.Nov),
        [Months.Dec]: getHoursInMonth(Months.Dec),
    },
});

const App = () => {
    const [state, updateState] = useURLState<State>('state', initialState);
    const { hours, hourlyPrice, taxTable, employeeShare } = state;

    const getMonthState = monthStateBuilder(hourlyPrice, employeeShare, taxTable);

    const setTabell = useCallback(
        (tabell: TaxTable) => {
            updateState((draft) => {
                draft.taxTable = tabell;
            });
        },
        [updateState]
    );

    const setAndel = useCallback(
        (andel: number) => {
            updateState((draft) => {
                draft.employeeShare = andel;
            });
        },
        [updateState]
    );

    const setTimepris = useCallback(
        (timepris: number) => {
            updateState((draft) => {
                draft.hourlyPrice = timepris;
            });
        },
        [updateState]
    );

    const handleHoursStateChange = useCallback(
        (month: Months, timer: number) => {
            updateState((draft) => {
                draft.hours[month] = timer;
            });
        },
        [updateState]
    );

    return (
        <>
            <div className="App">
                <Header title="Lønnskalkulator" />
                <div>
                    <Select
                        label="Skattetabell"
                        value={taxTable}
                        options={tableNames.map((table) => ({ name: table, value: table }))}
                        onChange={(event) => setTabell(event.currentTarget.value as TaxTable)}
                    />
                    <Select
                        label="Andel konsulent"
                        value={employeeShare}
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
                        value={hourlyPrice}
                        onChange={(event) => setTimepris(parseInt(event.target.value, 10))}
                    />
                </div>
                <YearDisplay hoursState={hours} getMonthState={getMonthState} taxTable={taxTable} />
            </div>
            <div className="monthWrapper">
                <MonthDisplay
                    hours={hours[Months.Jan]}
                    month={Months.Jan}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Feb]}
                    month={Months.Feb}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Mar]}
                    month={Months.Mar}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Apr]}
                    month={Months.Apr}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.May]}
                    month={Months.May}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Jun]}
                    month={Months.Jun}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
            </div>
            <div className="monthWrapper">
                <MonthDisplay
                    hours={hours[Months.Jul]}
                    month={Months.Jul}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Aug]}
                    month={Months.Aug}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Sep]}
                    month={Months.Sep}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Oct]}
                    month={Months.Oct}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Nov]}
                    month={Months.Nov}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
                <MonthDisplay
                    hours={hours[Months.Dec]}
                    month={Months.Dec}
                    handleHoursStateChange={handleHoursStateChange}
                    getMonthState={getMonthState}
                />
            </div>
        </>
    );
};

export default App;
