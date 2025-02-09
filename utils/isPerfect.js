export default function isPerfect(n) {
    if (n < 2) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            sum += i;
            if (i * i !== n) sum += n / i;
        }
    }
    return sum === n;
}