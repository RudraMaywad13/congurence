'use client';
import { useState } from 'react';

// GCD function
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Extended Euclidean algorithm
function extendedGCD(a, b) {
  if (b === 0) return { x: 1, y: 0, gcd: a };
  const { x: x1, y: y1, gcd } = extendedGCD(b, a % b);
  return { x: y1, y: x1 - Math.floor(a / b) * y1, gcd };
}

// Combine two congruences into one
function combineCongruences(a1, m1, a2, m2) {
  const { x, y, gcd } = extendedGCD(m1, m2);

  // Check for contradiction
  if ((a2 - a1) % gcd !== 0) {
    return null; // Contradiction
  }

  const lcm = (m1 * m2) / gcd;
  const multiplier = ((a2 - a1) / gcd) * x;
  const combined = (a1 + multiplier * m1) % lcm;

  return { remainder: (combined + lcm) % lcm, modulus: lcm };
}

// Solve system of congruences
function solveGeneralCongruences(congruences) {
  let current = congruences[0];

  for (let i = 1; i < congruences.length; i++) {
    const combined = combineCongruences(
      current.remainder,
      current.modulus,
      congruences[i].remainder,
      congruences[i].modulus
    );

    if (!combined) {
      return { error: '❌ The system has no solution due to conflicting congruences.' };
    }

    current = combined;
  }

  return { solution: current.remainder, modulo: current.modulus };
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

    const congruences = remainders.map((remainder, i) => ({
      remainder,
      modulus: moduli[i]
    }));

    const res = solveGeneralCongruences(congruences);
    setResult(res);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-indigo-300">🧠 General CRT Solver</h1>

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
