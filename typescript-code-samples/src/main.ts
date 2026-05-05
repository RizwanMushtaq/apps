import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class Rectangle {
    length: number;
    width: number;

    constructor(length: number, width: number) {
        this.length = length;
        this.width = width;
    }

    getArea = () => {
        return this.width * this.length;
    };
}

const main = async () => {
    const rl = readline.createInterface({ input, output });

    try {
        const width: string = await rl.question('Enter width: ');
        const length: string = await rl.question('Enter length: ');

        const rect = new Rectangle(Number(width), Number(length));
        console.log(rect.getArea());
        console.log('___________________________________');
    } catch (error) {
        console.error('Error reading input:', error);
    } finally {
        rl.close();
    }
};

void main();
