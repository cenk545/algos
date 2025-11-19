/*
 Beginner-friendly explanation (step-by-step):

 1. Purpose: find the index of `target` inside a sorted array `arr`. If the
     value isn't present, return `-1`.

 2. Key variables:
     - `lo`: start index of the current search range (starts at 0).
     - `hi`: end index of the current search range (starts at `arr.length - 1`).

 3. Loop idea (keep narrowing the range):
     - While `lo <= hi`, pick the middle index `mid` of the range.
     - Compare `arr[mid]` to `target`:
        - If equal, we found the target; return `mid`.
        - If `arr[mid] < target`, the target must be to the right, so set
          `lo = mid + 1`.
        - If `arr[mid] > target`, the target must be to the left, so set
          `hi = mid - 1`.

 4. Why this works: each comparison cuts the search interval roughly in half,
     so the number of steps grows like the logarithm of the array size.

 5. Edge cases:
     - Empty array: `hi` starts as -1, the loop never runs, returns -1.
     - Single-element array: will either return 0 (match) or -1 (no match).
     - Duplicates: this implementation returns any index that contains the
        target (not guaranteed to be the first or last occurrence).

 6. Complexity: time O(log n), space O(1).

 Example (quick): arr = [1,3,5,7,9], target = 7
  - lo=0, hi=4 -> mid=2 (value 5) -> 5 < 7 -> lo=3
  - lo=3, hi=4 -> mid=3 (value 7) -> found -> return 3

*/


/**
 * Find the index of `target` in a sorted array `arr` using binary search.
 *
 * Step-by-step:
 * 1. Initialize `lo = 0` and `hi = arr.length - 1` to represent the current
 *    inclusive search range.
 * 2. While `lo <= hi`:
 *    a. Compute the middle index `mid = Math.floor((lo + hi) / 2)` (or
 *       use `lo + ((hi - lo) >>> 1)` to avoid potential overflow and for a
 *       micro-optimization in JavaScript).
 *    b. Cache `v = arr[mid]`.
 *    c. If `v === target`, return `mid`.
 *    d. If `v < target`, move the lower bound: `lo = mid + 1`.
 *    e. Otherwise (`v > target`), move the upper bound: `hi = mid - 1`.
 * 3. If the loop exits without a match, return `-1`.
 *
 * Notes:
 * - Input array must be sorted in ascending order.
 * - Time: O(log n). Space: O(1).
 *
 * @param {number[]} arr
 * @param {number} target
 * @returns {number}
 */
function binarySearch(arr, target) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
        // Compute the middle offset with a bit shift.
        // `(hi - lo) >>> 1` shifts the 32-bit unsigned representation of
        // `(hi - lo)` right by one bit, which is equivalent to
        // `Math.floor((hi - lo) / 2)` for non-negative integers. The
        // `>>>` operator forces a 32-bit unsigned conversion — it's fast
        // and concise, but note it can wrap for extremely large arrays
        // (length >= 2^31). For normal JS array sizes this is a safe and
        // efficient way to compute the midpoint.
        const middleIndex = lo + ((hi - lo) >>> 1); // unsigned shift is fast and safe for typical array sizes

        const testTarget = arr[middleIndex];

        if (testTarget === target) {
            return middleIndex;
        }

        if (testTarget < target) {
            lo = middleIndex + 1;
        } else {
            hi = middleIndex - 1;
        }
    }
    return -1;
}



function findBoolBoundary(arr) {
    let low = 0;
    let high = arr.length - 1;
    let firstTrueIndex = -1;

    while (low <= high) {
        const midIndex = low + ((high - low) >>> 1);

        if (arr[midIndex]) {
            firstTrueIndex = midIndex;
            high = midIndex - 1;
        } else {
            low = midIndex + 1;
        }
    }

    return firstTrueIndex;
}

function firstNotSmaller(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    let firstTrueIndex = -1;

    while (low <= high) {
        const middleIndex = low + ((high - low) >>> 1);

        if (arr[middleIndex] < target) {
            low = middleIndex + 1; // the element at the middle index is smaller than the target to we can discard it and everything before it
        } else if (arr[middleIndex] >= target) {
            firstTrueIndex = middleIndex;
            high = middleIndex - 1;
        }
    }

    return firstTrueIndex;
}

function findFirstOccurrence(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    let firstOccurrenceIndex = -1;

    while (low <= high) {
        const middleIndex = low + ((high - low) >>> 1);
        const middleValue = arr[middleIndex];

        if (middleValue === target) {
            firstOccurrenceIndex = middleIndex;
            high = middleIndex - 1;
        } else if (middleValue < target) {
            low = middleIndex + 1;
        } else if (middleValue > target) {
            high = middleIndex - 1;
        }
    }


    return firstOccurrenceIndex;
}

module.exports = { binarySearch, findBoolBoundary, firstNotSmaller, findFirstOccurrence };
