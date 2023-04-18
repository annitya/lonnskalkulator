import { TaxTable } from './taxTables';

const BASE_URL = `https://api-tabellkort.app.skatteetaten.no/?`;

export const getUrl = (taxTable: TaxTable, year: number, salary: number) => {
    const url = new URL(BASE_URL);
    url.searchParams.append('valgtTabell', taxTable);
    url.searchParams.append('valgtInntektType', 'Lonn');
    url.searchParams.append('valgtPeriode', 'PERIODE_1_MAANED');
    url.searchParams.append('valgtLonn', Math.round(salary).toString());
    url.searchParams.append('valgtAar', year.toString());

    return url.toString();
};

export const fetchMonthlyTax = async (taxTable: TaxTable, salary: number, year: number) => {
    const url = getUrl(taxTable, year, salary);
    return fetch(url).then(response => response.json());
}
