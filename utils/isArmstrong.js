export default function isArmstrong(n) {
  const digits = Array.from(String(n), Number);
  const len = digits.length;
  return n === digits.reduce((acc, digit) => acc + digit ** len, 0);
}