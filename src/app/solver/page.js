'use client';
import { useState } from 'react';

// Util: GCD
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Util: Modular inverse using Extended Euclidean Algorithm
function modInverse(a, m) {
  let m0 = m, x0 = 0, x1 = 1;
  if (m === 1) return 0;

  while (a > 1) {
    let q = Math.floor(a / m);
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }

  return x1 < 0 ? x1 + m0 : x1;
}

// Util: Prime factorization
function primeFactors(n) {
  const factors = {};
  for (let i = 2; i * i <= n; i++) {
    while (n % i === 0) {
      factors[i] = (factors[i] || 0) + 1;
      n /= i;
    }
  }
  if (n > 1) factors[n] = (factors[n] || 0) + 1;
  return factors;
}

// Expand congruences with non-coprime moduli into prime power congruences
function expandCongruences(remainders, moduli) {
  const expanded = [];
  for (let i = 0; i < remainders.length; i++) {
    const rem = remainders[i];
    const factors = primeFactors(moduli[i]);
    for (const p in factors) {
      const primePower = Math.pow(p, factors[p]);
      expanded.push({ remainder: rem % primePower, modulus: primePower });
    }
  }
  return expanded;
}

// Check for conflicting congruences
function hasConflicts(congruences) {
  const map = new Map();
  for (const { remainder, modulus } of congruences) {
    if (!map.has(modulus)) {
      map.set(modulus, remainder);
    } else if (map.get(modulus) !== remainder) {
      return true; // conflict
    }
  }
  return false;
}

// Solve congruences using CRT (moduli should now be pairwise coprime)
function solveExpandedCongruences(congruences) {
  const moduli = congruences.map(c => c.modulus);
  const remainders = congruences.map(c => c.remainder);
  const N = moduli.reduce((acc, val) => acc * val, 1);
  let x = 0;

  for (let i = 0; i < moduli.length; i++) {
    const ni = moduli[i];
    const ai = remainders[i];
    const Ni = N / ni;
    const Mi = modInverse(Ni, ni);

    x += ai * Mi * Ni;
  }

  return { solution: x % N, modulo: N };
}

export default function SolverPage() {
  const [equations, setEquations] = useState([{ remainder: '', modulus: '' }]);
  const [result, setResult] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...equations];
    updated[index][field] = value;
    setEquations(updated);
  };

  const addEquation = () => {
    setEquations([...equations, { remainder: '', modulus: '' }]);
  };

  const handleSolve = () => {
    const remainders = equations.map(e => parseInt(e.remainder));
    const moduli = equations.map(e => parseInt(e.modulus));

    if (remainders.some(isNaN) || moduli.some(isNaN)) {
      setResult({ error: 'Please enter valid numbers for all fields.' });
      return;
    }

    const expanded = expandCongruences(remainders, moduli);

    if (hasConflicts(expanded)) {
      setResult({ error: 'Conflict in congruences. System has no solution.' });
      return;
    }

    const res = solveExpandedCongruences(expanded);
    setResult(res);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-indigo-300">🧠 Congruence Solver</h1>

        {equations.map((eq, i) => (
          <div key={i} className="flex space-x-4">
            <input
              type="number"
              placeholder="Remainder"
              className="w-full text-3xl text-center p-2 rounded bg-white/10 text-white placeholder-white border border-white/20"
              value={eq.remainder}
              onChange={e => handleChange(i, 'remainder', e.target.value)}
            />
            <input
              type="number"
              placeholder="Modulus"
              className="w-full text-3xl text-center p-2 rounded bg-white/10 text-white placeholder-white border border-white/20"
              value={eq.modulus}
              onChange={e => handleChange(i, 'modulus', e.target.value)}
            />
          </div>
        ))}

        <div className="flex gap-4">
          <button
            onClick={addEquation}
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
          >
            ➕ Add Congruence
          </button>

          <button
            onClick={handleSolve}
            className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg transition"
          >
            ✅ Solve
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
            {result.error ? (
              <p className="text-red-400">{result.error}</p>
            ) : (
              <p className="text-green-300 text-lg font-medium">
                ✅ Solution: <strong>x ≡ {result.solution} (mod {result.modulo})</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
