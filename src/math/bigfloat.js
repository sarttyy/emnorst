
export {Num2FracStr as NumToStr} from "../lib/Num2DecStr";

export const Num = number=>{
    if(typeof number === "number");
    const [integer, decimal] = String(number).split(".");
    return {integer, decimal, negative};
};
export class BigFloat {
    constructor(number){
        const [integer, decimal] = Num2FracStr(number).split(".");
        this.integer = integer || "";
        this.decimal = decimal || "";
        this.negative = false;
    }
    toString(){
        const number = this.integer + (this.decimal && "." + this.decimal);
        return (this.negative ? "-" : "+").concat(number);
    }
    _typeCheck(valuue){
        return Number.isNaN(valuue)
            || (
                typeof valuue !== "string"
                && !Number.isFinite(valuue)
            )
    }
    add(number){
        if(this._typeCheck(number))return this;
        const bigfloat = number instanceof BigFloat
            ? number : new BigFloat(number);
        let carry = false;
        const integerLength = Math.max(bigfloat.integer.length, this.integer.length);
        const decimalLength = Math.max(bigfloat.decimal.length, this.decimal.length);
        const number1 = [
            ...this.integer.padStart(integerLength, "0"),
            ...[...this.decimal.padEnd(decimalLength, "0")].reverse()
        ];
        const number2 = [
            ...bigfloat.integer.padStart(integerLength, "0"),
            ...[...bigfloat.decimal.padEnd(decimalLength, "0")].reverse()
        ];
        console.log({number1, number2, integerLength, decimalLength})
        const num = [...rei.utility.zip(number1, number2)].reduceRight((total, [dec1, dec2])=>{
            let subtotal = Number(dec1) + Number(dec2) + carry;
            carry = subtotal >= 10;
            if(carry)subtotal = Number(subtotal) - 10;
            return String(subtotal).concat(total);
        }, "");
        console.log(carry)
        this.integer = (carry ? "1" : "") + (decimalLength ? num.slice(0, -decimalLength) : num);
        this.decimal = decimalLength ? num.slice(-decimalLength) : "";
        return this;
    }
    sub(number){
        if(this._typeCheck(number))return this;
        const bigfloat = new BigFloat(number);
        let carry = false;
        return this;
    }
    mul(...numbers){
        for(const number of numbers){
            if(this._typeCheck(number))continue;
        }
        return this;
    }
    div(...numbers){
        for(const number of numbers){
            if(this._typeCheck(number))continue;
        }
        return this;
    }
    sur(number){
        return this;
    }
    static eval(formula){
        for(const character of formula){
            if(character === "\s")
                continue;
        }
    }
}
