const {
  binarySearch,
  findBoolBoundary,
  firstNotSmaller,
  findFirstOccurrence,
} = require("./binary-search.js");

describe("binarySearch (iterative)", () => {
  test("finds a middle element", () => {
    expect(binarySearch([1, 3, 5, 7, 9], 7)).toBe(3);
  });

  test("returns -1 when target is missing", () => {
    expect(binarySearch([1, 2, 3, 4], 10)).toBe(-1);
  });

  test("finds first and last elements", () => {
    expect(binarySearch([10, 20, 30], 10)).toBe(0);
    expect(binarySearch([10, 20, 30], 30)).toBe(2);
  });

  test("single-element array", () => {
    expect(binarySearch([5], 5)).toBe(0);
    expect(binarySearch([5], 1)).toBe(-1);
  });

  test("empty array returns -1", () => {
    expect(binarySearch([], 123)).toBe(-1);
  });

  test("handles duplicate values (returns any valid index)", () => {
    const arr = [1, 2, 2, 2, 3];
    const res = binarySearch(arr, 2);
    expect(res).toBeGreaterThanOrEqual(1);
    expect(res).toBeLessThanOrEqual(3);
    expect(arr[res]).toBe(2);
  });

  test("works with negative numbers", () => {
    expect(binarySearch([-10, -5, -2, 0, 4], -5)).toBe(1);
  });

  test("large array checks", () => {
    const n = 10000;
    const arr = Array.from({ length: n }, (_, i) => i * 2); // even numbers
    expect(binarySearch(arr, 0)).toBe(0);
    expect(binarySearch(arr, (n - 1) * 2)).toBe(n - 1);
    expect(binarySearch(arr, -1)).toBe(-1);
    expect(binarySearch(arr, 1234567)).toBe(-1);
  });

  test("randomized property tests (50 iterations)", () => {
    for (let t = 0; t < 50; t++) {
      const len = Math.floor(Math.random() * 100);
      const base = Math.floor(Math.random() * 5);
      const arr = Array.from(
        { length: len },
        (_, i) => base + Math.floor(i / 3)
      );
      // ensure sorted
      arr.sort((a, b) => a - b);

      // pick an element that may or may not be present
      const pick =
        Math.random() < 0.7 && arr.length
          ? arr[Math.floor(Math.random() * arr.length)]
          : Math.floor(Math.random() * 10) + 1000;
      const expectedIndex = arr.indexOf(pick);
      const res = binarySearch(arr, pick);
      if (expectedIndex === -1) {
        expect(res).toBe(-1);
      } else {
        expect(arr[res]).toBe(pick);
      }
    }
  });

  test("should work for many example cases", () => {
    const examples = [
      { arr: [2, 8, 89, 120, 1000], target: 120, expected: 3 },
      { arr: [1, 2, 3, 4, 5], target: 1, expected: 0 },
      { arr: [1, 2, 3, 4, 5], target: 5, expected: 4 },
      { arr: [], target: 7, expected: -1 },
      { arr: [7], target: 7, expected: 0 },
      { arr: [7], target: 8, expected: -1 },
      { arr: [-10, -3, 0, 4, 9], target: -10, expected: 0 },
      { arr: [-10, -3, 0, 4, 9], target: 9, expected: 4 },
      {
        arr: Array.from({ length: 100 }, (_, i) => i),
        target: 57,
        expected: 57,
      },
      { arr: [1, 3, 5, 7], target: 2, expected: -1 },
      { arr: [1, 2], target: 2, expected: 1 },
      { arr: [1, 2], target: 3, expected: -1 },
    ];

    examples.forEach(({ arr, target, expected }) => {
      const res = binarySearch(arr, target);
      if (expected === "any") {
        // In cases where any matching index is acceptable
        expect(arr[res]).toBe(target);
      } else {
        expect(res).toBe(expected);
      }
    });
  });
});

describe("findBoolBoundary (first true index)", () => {
  test("empty array returns -1", () => {
    expect(findBoolBoundary([])).toBe(-1);
  });

  test("all false returns -1", () => {
    expect(findBoolBoundary([false, false, false])).toBe(-1);
  });

  test("all true returns 0", () => {
    expect(findBoolBoundary([true, true, true])).toBe(0);
  });

  test("single-element arrays", () => {
    expect(findBoolBoundary([true])).toBe(0);
    expect(findBoolBoundary([false])).toBe(-1);
  });

  test("first true in the middle", () => {
    expect(findBoolBoundary([false, false, true, true])).toBe(2);
    expect(findBoolBoundary([false, true, true, true])).toBe(1);
  });

  test("first true at last index", () => {
    expect(findBoolBoundary([false, false, false, true])).toBe(3);
  });

  test("randomized boundaries", () => {
    for (let n = 0; n < 100; n++) {
      const len = Math.floor(Math.random() * 50);
      const firstTrue = Math.floor(Math.random() * (len + 1));
      const arr = Array.from({ length: len }, (_, i) => i >= firstTrue);
      const expected = firstTrue < len ? firstTrue : -1;
      expect(findBoolBoundary(arr)).toBe(expected);
    }
  });

  test("exhaustive small lengths", () => {
    for (let len = 0; len <= 20; len++) {
      for (let k = 0; k <= len; k++) {
        const arr = Array.from({ length: len }, (_, i) => i >= k);
        const expected = k < len ? k : -1;
        expect(findBoolBoundary(arr)).toBe(expected);
      }
    }
  });
});

describe("firstNotSmaller (first element >= target)", () => {
  test("basic examples", () => {
    expect(
      firstNotSmaller([1, 3, 3, 5, 8, 8, 10], 2)
    ).toBe(1); // first >= 2 is 3 at index 1

    expect(
      firstNotSmaller([2, 3, 5, 7, 11, 13, 17, 19], 6)
    ).toBe(3); // first >= 6 is 7 at index 3
  });

  test("target equals existing element", () => {
    expect(firstNotSmaller([1, 2, 3, 4], 3)).toBe(2);
    expect(firstNotSmaller([5, 5, 5, 6], 5)).toBe(0);
  });

  test("first element is the answer", () => {
    expect(firstNotSmaller([10, 20, 30], 5)).toBe(0);
  });

  test("last element is the answer", () => {
    expect(firstNotSmaller([1, 2, 3, 4, 9], 9)).toBe(4);
  });

  test("duplicates and repeated values", () => {
    expect(firstNotSmaller([1, 2, 2, 2, 3], 2)).toBe(1);
    expect(firstNotSmaller([1, 1, 1, 1], 1)).toBe(0);
  });

  test("randomized checks against linear scan", () => {
    for (let t = 0; t < 200; t++) {
      const len = Math.floor(Math.random() * 100) + 1; // ensure non-empty since guaranteed
      const arr = Array.from({ length: len }, (_, i) => i * Math.floor(Math.random() * 3 + 1));
      arr.sort((a, b) => a - b);
      const target = Math.floor(Math.random() * (arr[arr.length - 1] + 3));
      const expected = arr.findIndex((x) => x >= target);
      // Problem statement guarantees existence; if not found, skip this iteration
      if (expected === -1) continue;
      expect(firstNotSmaller(arr, target)).toBe(expected);
    }
  });
});

describe("findFirstOccurrence (first index of target)", () => {
  test("basic examples", () => {
    expect(
      findFirstOccurrence([1, 3, 3, 3, 3, 6, 10, 10, 10, 100], 3)
    ).toBe(1);

    expect(findFirstOccurrence([2, 3, 5, 7, 11, 13, 17, 19], 6)).toBe(-1);
  });

  test("empty and single-element arrays", () => {
    expect(findFirstOccurrence([], 5)).toBe(-1);
    expect(findFirstOccurrence([5], 5)).toBe(0);
    expect(findFirstOccurrence([5], 1)).toBe(-1);
  });

  test("first and last positions", () => {
    expect(findFirstOccurrence([1, 2, 3, 4], 1)).toBe(0);
    expect(findFirstOccurrence([1, 2, 3, 4], 4)).toBe(3);
  });

  test("duplicates return first index", () => {
    expect(findFirstOccurrence([3, 3, 3, 3], 3)).toBe(0);
    expect(findFirstOccurrence([1, 3, 3, 3, 4], 3)).toBe(1);
  });

  test("not found returns -1", () => {
    expect(findFirstOccurrence([1, 2, 4, 5], 3)).toBe(-1);
  });

  test("randomized checks against indexOf", () => {
    for (let t = 0; t < 200; t++) {
      const len = Math.floor(Math.random() * 100);
      const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 20));
      arr.sort((a, b) => a - b);
      const target = Math.floor(Math.random() * 20);
      const expected = arr.indexOf(target);
      expect(findFirstOccurrence(arr, target)).toBe(expected);
    }
  });
});
