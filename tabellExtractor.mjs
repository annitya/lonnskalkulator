import fs from 'fs';

const file = fs.readFileSync('C:\\Users\\andre\\Downloads\\t\\t.txt', { encoding: 'UTF-8' });

const lines = file.split('\n');
const tables = [];
let table = null;

for (const line of lines) {
    if (line === '') {
        continue;
    }

    const tableName = line.substring(0, 4);
    const trekkperiode = line.substring(4, 5);
    const tabelltype = line.substring(5, 6);
    const salary = line.substring(6, 11).replace(/^0+/, '') || '0';
    const trekk = line.substring(11, 16).replace(/^0+/, '') || '0';

    if (table === null || table.name !== tableName) {
        if (table !== null && table.tabell.length === 0) {
            tables.splice(tables.length - 1, 1);
        }

        table = {
            name: tableName,
            tabell: [],
        };

        tables.push(table);
    }

    if (trekkperiode === '1' && tabelltype === '0') {
        table.tabell.push({ salary, trekk });
    }
}

const toJS = (table) => {
    const lines = [];
    lines.push(`function table_${table.name} (salary: number): number {`);
    lines.push(`  if (salary < ${table.tabell[0].salary}) return 0;`);

    for (let i = 1; i < table.tabell.length; i++) {
        lines.push(`  if (salary < ${table.tabell[i].salary}) return ${table.tabell[i - 1].trekk};`);
    }

    const lastRowIndex = table.tabell.length - 1;
    const lastRow = table.tabell[lastRowIndex];
    lines.push(`  return ${lastRow.trekk} + ((salary - ${lastRow.salary}) * 0.54);`);
    lines.push('};');

    return lines.join('\n');
};

console.log('export enum Tabell {');

for (const table of tables) {
    console.log(`  T${table.name} = '${table.name}',`);
}

console.log('}');

console.log('export const tableNames: readonly Tabell[] = [');

for (const table of tables) {
    console.log(`  Tabell.T${table.name},`);
}

console.log('];');

console.log('export function skattetrekk(salary: number, tabellEllerProsent: Tabell | number) {');
console.log(`  if (typeof tabellEllerProsent === 'number') return salary * tabellEllerProsent;`);

for (const table of tables) {
    console.log(`  if (tabellEllerProsent === Tabell.T${table.name}) return table_${table.name}(salary);`);
}

console.log(`  throw new Error('Du har brukt et ugyldig tabellnummer: ' + tabellEllerProsent);`);
console.log('}');

for (const table of tables) {
    console.log(toJS(table));
}
