import { Month } from '../types/Month';

export const getNameOfMonth = (month: Month) => {
    switch (month) {
        case Month.Jan:
            return 'Januar';
        case Month.Feb:
            return 'Februar';
        case Month.Mar:
            return 'Mars';
        case Month.Apr:
            return 'April';
        case Month.May:
            return 'Mai';
        case Month.Jun:
            return 'Juni';
        case Month.Jul:
            return 'Juli';
        case Month.Aug:
            return 'August';
        case Month.Sep:
            return 'September';
        case Month.Oct:
            return 'Oktober';
        case Month.Nov:
            return 'November';
        case Month.Dec:
            return 'Desember';
    }
};
