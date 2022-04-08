import Header from './components/header/Header';
import './App.css';
import { MonthDisplay } from './components/month-display/MonthDisplay';
import { Select } from './components/select/Select';
import { useState } from 'react';
import { getHoursInMonth } from './utils/dateUtils';
import { Month } from './types/Month';
import Input from './components/input/Input';
import { Tabell } from './skattetabell/2022';

const App = () => {
    const [timerJanuar, setTimerJanuar] = useState(() => getHoursInMonth(Month.Jan));
    const [timerFebruar, setTimerFebruar] = useState(() => getHoursInMonth(Month.Feb));
    const [timerMars, setTimerMars] = useState(() => getHoursInMonth(Month.Mar));
    const [timerApril, setTimerApril] = useState(() => getHoursInMonth(Month.Apr));
    const [timerMai, setTimerMai] = useState(() => getHoursInMonth(Month.May));
    const [timerJuni, setTimerJuni] = useState(() => getHoursInMonth(Month.Jun));
    const [timerJuli, setTimerJuli] = useState(() => getHoursInMonth(Month.Jul));
    const [timerAugust, setTimerAugust] = useState(() => getHoursInMonth(Month.Aug));
    const [timerSeptember, setTimerSeptember] = useState(() => getHoursInMonth(Month.Sep));
    const [timerOktober, setTimerOktober] = useState(() => getHoursInMonth(Month.Oct));
    const [timerNovember, setTimerNovember] = useState(() => getHoursInMonth(Month.Nov));
    const [timerDesember, setTimerDesember] = useState(() => getHoursInMonth(Month.Dec));
    const [timepris, setTimepris] = useState(1450);
    const [tabell, setTabell] = useState(Tabell.T7100);

    return (
        <>
            <div className="App">
                <Header title="Lønnskalkulator" />
                <div>
                    <Select label="Skattetabell" tabell={tabell} setTabell={setTabell} />
                    <Input
                        inputId="timepris"
                        label="Timepris"
                        placeholder="Eks. 1450"
                        value={timepris}
                        onChange={(event) => setTimepris(parseInt(event.target.value, 10))}
                    />
                </div>
            </div>
            <div className="monthWrapper">
                <MonthDisplay
                    nameOfMonth="Januar"
                    hoursInMonth={timerJanuar}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerJanuar}
                />
                <MonthDisplay
                    nameOfMonth="Februar"
                    hoursInMonth={timerFebruar}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerFebruar}
                />
                <MonthDisplay
                    nameOfMonth="Mars"
                    hoursInMonth={timerMars}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerMars}
                />
                <MonthDisplay
                    nameOfMonth="April"
                    hoursInMonth={timerApril}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerApril}
                />
                <MonthDisplay
                    nameOfMonth="Mai"
                    hoursInMonth={timerMai}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerMai}
                />
                <MonthDisplay
                    nameOfMonth="Juni"
                    hoursInMonth={timerJuni}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerJuni}
                />
            </div>
            <div className="monthWrapper">
                <MonthDisplay
                    nameOfMonth="Juli"
                    hoursInMonth={timerJuli}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerJuli}
                />
                <MonthDisplay
                    nameOfMonth="August"
                    hoursInMonth={timerAugust}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerAugust}
                />
                <MonthDisplay
                    nameOfMonth="September"
                    hoursInMonth={timerSeptember}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerSeptember}
                />
                <MonthDisplay
                    nameOfMonth="Oktober"
                    hoursInMonth={timerOktober}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerOktober}
                />
                <MonthDisplay
                    nameOfMonth="November"
                    hoursInMonth={timerNovember}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerNovember}
                />
                <MonthDisplay
                    nameOfMonth="Desember"
                    hoursInMonth={timerDesember}
                    timepris={timepris}
                    tabell={tabell}
                    setHoursInMonth={setTimerDesember}
                />
            </div>
        </>
    );
};

export default App;
