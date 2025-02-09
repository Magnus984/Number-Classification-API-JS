import express from 'express';
import isArmstrong from './utils/isArmstrong.js';
import isPrime from './utils/isPrime.js';
import isPerfect from './utils/isPerfect.js';
import isEven from './utils/isEven.js';
import isOdd from './utils/isOdd.js';

const app = express();
const port = 3000;

app.get('/api/classify-number', (req, res) => {
  let number = req.query.number;
  if (!number) {
    res.status(400).end(JSON.stringify(
        {'number': null}));
    return;
  }
  number = parseInt(number);
  if (isNaN(number)) {
    res.status(400).end(JSON.stringify(
        {'number': number, "error": true}));
    return;
  }

  fetch(`http://numbersapi.com/${number}/math`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(fact => {
        const properties = [];
        if (isArmstrong(number)) {
            properties.push("armstrong");
        }
        if (isEven(number)) {
            properties.push("even");
        }
        if (isOdd(number)) {
            properties.push("odd");
        }
        return res.end(JSON.stringify({
            'number': number,
            'is_prime': isPrime(number),
            'is_perfect': isPerfect(number),
            'properties': properties,
            'digit_sum': Math.abs(number).toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0),
            "fun_fact": fact
        }));
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        res.status(500)
        return;
    });
});


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })