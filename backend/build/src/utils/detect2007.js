"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detect2007 = void 0;
const detect2007 = (text) => {
    const makeLesenka = (text) => {
        let lesenka = '';
        text.split('').reduce((count, char) => {
            let newCount = count;
            if (/\p{General_Category=Letter}/gu.test(char)) {
                newCount = count + 1;
                if (newCount % 2 === 0)
                    lesenka = lesenka + char.toLowerCase();
                else
                    lesenka = lesenka + char.toUpperCase();
                return newCount;
            }
            else {
                lesenka = lesenka + char;
                return newCount;
            }
        }, 0);
        return lesenka;
    };
    const is2007 = text.split('2007').length % 2 !== 0;
    if (is2007) {
        return text
            .split('2007')
            .map((text, index) => {
            if (index % 2 !== 0)
                return makeLesenka(text);
            else
                return text;
        })
            .join('');
    }
    else
        return text;
};
exports.detect2007 = detect2007;
//# sourceMappingURL=detect2007.js.map