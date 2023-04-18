import { TaxTable } from '../taxes/taxTables';
import { Months } from '../types/Months';
import { MonthState } from '../types/MonthState';
import { fetchMonthlyTax } from '../taxes/taxService';

export const emptyMonthState: MonthState = {
    hoursInMonth: 0,
    baseSalary: 0,
    holidayPay: 0,
    grossSalary: 0,
    netSalary: 0,
    taxAmount: 0,
};

export const getNameOfMonth = (month: Months) => {
    switch (month) {
        case Months.Jan:
            return 'Januar';
        case Months.Feb:
            return 'Februar';
        case Months.Mar:
            return 'Mars';
        case Months.Apr:
            return 'April';
        case Months.May:
            return 'Mai';
        case Months.Jun:
            return 'Juni';
        case Months.Jul:
            return 'Juli';
        case Months.Aug:
            return 'August';
        case Months.Sep:
            return 'September';
        case Months.Oct:
            return 'Oktober';
        case Months.Nov:
            return 'November';
        case Months.Dec:
            return 'Desember';
    }
};

export const monthStateBuilder = (timepris: number, employeeShare: number, taxTable: TaxTable) => async (hoursInMonth: number, month: Months): Promise<MonthState> => {
    const baseSalary = timepris * hoursInMonth * employeeShare;
    const holidayPay = baseSalary * 0.12 * -1;
    const grossSalary = baseSalary + holidayPay;
    const taxResult = await fetchMonthlyTax(taxTable, grossSalary, new Date().getFullYear());
    const taxAmount = taxResult * (month === Months.Nov ? -0.5 : -1);
    const netSalary = grossSalary + taxAmount;

    return {
        hoursInMonth,
        baseSalary,
        holidayPay,
        grossSalary,
        netSalary,
        taxAmount
    };
};
