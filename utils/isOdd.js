import isEven from './isEven.js';

export default function isOdd(n) {

    return !isEven(Math.abs(n));
}