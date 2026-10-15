// seed.js
// Deterministic "random" numbers based on the current UTC date, so every
// player gets the same daily city. Uses cyrb53 (string -> 53-bit hash) to
// turn a date string into a seed, then mulberry32 (a small, fast seeded
// PRNG) to turn that seed into a repeatable stream of numbers in [0, 1).

// cyrb53: turns any string into a well-distributed 53-bit integer.
// (Public-domain hash by bryc; used here just to spread date strings
// evenly across the seed space, not for any cryptographic purpose.)
function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

// mulberry32: given a numeric seed, returns a function that yields a
// new pseudo-random float in [0, 1) every time it's called, in a fixed,
// repeatable sequence.
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Returns today's UTC date as "YYYY-MM-DD". Using UTC (not local time)
// means the daily city flips over at the same moment worldwide, rather
// than at midnight in each player's own timezone.
function getTodayDateString() {
  return new Date().toISOString().slice(0, 10); // e.g. "2026-07-01"
}

// Builds a seeded RNG for today.
function getDailyRng() {
  const seed = cyrb53(getTodayDateString());
  return mulberry32(seed);
}

// Convenience helper: seeded integer in [0, max).
function seededRandomInt(max, rng) {
  return Math.floor(rng() * max);
}