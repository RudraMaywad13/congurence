'use client';

import { useState } from 'react';

export default function PrimeDivisibilityRule() {
  const [prime, setPrime] = useState('');
  const [result, setResult] = useState('');

  const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const generateRule = (a) => {
    if (!isPrime(a)) {
      return `${a} is not a prime number.`;
    }

    let x = 2;
    let num = 0;
    let y = 0;

    while (true) {
      if (x % a !== 0) {
        num = 10 * x;
        y = num % a;
        if (y === 1 || a - y === 1) break;
      }
      x += 1;
    }

    const num1 = x % a;
    let result = '';

    if (y === 1) {
      const num2 = num1 - a;
      result = `A number N = 10a + b is divisible by ${a} if a + ${num1} × b or a ${num2 >= 0 ? '+' : '-'} ${Math.abs(num2)} × b is divisible by ${a}.`;
    } else {
      const num2 = a - num1;
      result = `A number N = 10a + b is divisible by ${a} if a + ${num2} × b or a - ${num1} × b is divisible by ${a}.`;
    }

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const a = parseInt(prime, 10);
    const rule = generateRule(a);
    setResult(rule);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6">Prime Divisibility Rule Creator</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="prime" className="block text-xl mb-2">Enter a Prime Number</label>
          <input
            type="number"
            id="prime"
            value={prime}
            onChange={(e) => setPrime(e.target.value)}
            className="w-full text-2xl p-2 text-center border border-gray-600 rounded-md bg-gray-700 text-white"
            placeholder="Prime number"
            min="2"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 p-3 rounded-md text-white hover:bg-indigo-500 transition">
          Generate Rule
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-900 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Divisibility Rule</h2>
          <pre className="text-xl whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
