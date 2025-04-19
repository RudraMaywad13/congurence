'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <div className="max-w-2xl mx-auto p-6 space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-300 mt-4">🧠 Congruence Solver</h1>
          <p className="text-xl text-white mt-4">Solve congruences and divisibility rules easily!</p>
        </div>

        <div className="flex justify-center gap-6">
          <Link href="/solver">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition">
              Solve Congruences
            </button>
          </Link>

          <Link href="/rules">
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg transition">
              Divisibility Rules
            </button>
          </Link>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg text-white">Powered by Number Theory</p>
        </div>
      </div>
    </div>
  );
}
