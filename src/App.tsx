import Header from './components/header/Header';
import Input from './components/input/Input';
import { useState } from 'react';
import './App.css';

const beregnInntekt = (timepris: string, andel: string, estimerteTimer: string): number => {
    const timeprisNumber = parseInt(timepris, 10);
    const estimerteTimerNumber = parseInt(estimerteTimer, 10);
    const andelNumber = parseInt(andel) / 100;
    const bruttoInntekt = Math.round(timeprisNumber * estimerteTimerNumber * andelNumber);

    return bruttoInntekt;
};

const formatNumber = (n: number): string => {
    return n.toLocaleString();
};

const App = () => {
    const [timepris, setTimepris] = useState('1500');
    const [estimerteTimer, setEstimerteTimer] = useState('1700');
    const [feriepengerProsent, setFeriepengerProsent] = useState('12');
    const [andel, setAndel] = useState('60');
    const [skatt, setSkatt] = useState('38');

    const bruttoInntektTotal = beregnInntekt(timepris, andel, estimerteTimer);
    const feriepenger = Math.round((bruttoInntektTotal * parseInt(feriepengerProsent)) / 100);
    const bruttoUtenFeriepenger = bruttoInntektTotal - feriepenger;

    const nettoInntekt = Math.round(bruttoUtenFeriepenger * (1 - parseInt(skatt) / 100));

    return (
        <div className="App">
            <Header title="Lønnskalkulator" />
            <Input
                inputId="timepris"
                label="Timepris"
                placeholder="Timepris"
                type="number"
                value={timepris}
                onChange={(event) => setTimepris(event.target.value)}
            />
            <Input
                inputId="estimerte-timer"
                label="Estimerte timer"
                placeholder="Estimerte timer"
                type="number"
                value={estimerteTimer}
                onChange={(event) => setEstimerteTimer(event.target.value)}
            />
            <Input
                inputId="feriepenger"
                label="Feriepengetrekk"
                placeholder="Feriepengetrekk"
                type="number"
                value={feriepengerProsent}
                onChange={(event) => setFeriepengerProsent(event.target.value)}
            />
            <Input
                inputId="andel"
                label="Din andel i prosent"
                placeholder="Din andel i prosent"
                type="number"
                value={andel}
                onChange={(event) => setAndel(event.target.value)}
            />
            <Input
                inputId="skatt"
                label="Din skatt i prosent"
                placeholder="Din skatt i prosent"
                type="number"
                value={skatt}
                onChange={(event) => setSkatt(event.target.value)}
            />
            <div>
                <div style={{ color: 'white', paddingBottom: '1rem', fontSize: '18px' }}>
                    Din beregnede årslønn inklusive feriepenger (brutto): {formatNumber(bruttoInntektTotal)}
                </div>
                <div style={{ color: 'white', paddingBottom: '1rem', fontSize: '18px' }}>
                    Hvorav feriepenger: {formatNumber(feriepenger)}
                </div>
                <div style={{ color: 'white', paddingBottom: '1rem', fontSize: '18px' }}>
                    Din beregnede årslønn ekslusive feriepenger (brutto): {formatNumber(bruttoUtenFeriepenger)}
                </div>
                <div style={{ color: 'white', paddingBottom: '1rem', fontSize: '18px' }}>
                    Din beregnede månedslønn (brutto): {formatNumber(Math.round(bruttoUtenFeriepenger / 12))}
                </div>
                <div style={{ color: 'white', paddingBottom: '1rem', fontSize: '18px' }}>
                    Din beregnede årslønn (netto): {formatNumber(nettoInntekt)}
                </div>
                <div style={{ color: 'white', paddingBottom: '1rem', fontSize: '18px' }}>
                    Din beregnede månedslønn (netto): {formatNumber(Math.round(nettoInntekt / 12))}
                </div>
            </div>
        </div>
    );
};

export default App;
