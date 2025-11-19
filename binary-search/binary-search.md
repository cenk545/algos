# Binary Search

Binary search is an efficient algorithm for finding an element's index in a _sorted_ array. At each step it compares the target value to the middle element of the current search range and discards half of the remaining elements, giving a logarithmic runtime.

## Problem

Given a sorted array of integers and an integer `target`, return the index of `target` in the array. If the element is not found, return `-1`.

## Intuition

- Because the array is sorted, comparing the target to the middle element tells us which half (left or right) can still contain the target.
- If `arr[mid] == target` → return `mid`.
- If `arr[mid] < target` → the target must be in the right half (discard left half).
- If `arr[mid] > target` → the target must be in the left half (discard right half).
- Repeat until the range is empty.

Real-world analogy: looking up a word in a dictionary — you open near the middle and decide whether to go left or right.

## Complexity

- Time: `O(log N)` where `N` is the number of elements.
- Space: iterative `O(1)`, recursive `O(log N)` due to call stack.

## Implementations

### Iterative (JavaScript)

```javascript
function binarySearch(arr, target) {
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

### Recursive (JavaScript)

```javascript
function binarySearchRecursive(arr, target, lo = 0, hi = arr.length - 1) {
  if (lo > hi) return -1;
  const mid = Math.floor((lo + hi) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, hi);
  return binarySearchRecursive(arr, target, lo, mid - 1);
}
```

## Notes & Tips

- Input must be sorted for binary search to work correctly.
- In languages with fixed-width integers, prefer `lo + (hi - lo) // 2` to avoid potential overflow.
- For insertion points (e.g., lower_bound / upper_bound), adjust comparisons and return values accordingly.

## Example

```javascript
const arr = [1, 3, 5, 7, 9];
const target = 7;
binarySearch(arr, target); // -> 3
```

## Calculating mid

When the current search range has an even number of elements there are two middle indices; the common convention is to pick the lower middle (floor). A safe, clear way to compute the midpoint is:

```
mid = lo + Math.floor((hi - lo) / 2)
```

In JavaScript a common micro-optimization is `lo + ((hi - lo) >>> 1)`, which uses a bit shift to divide by two. That is fine for typical arrays, but note the `>>>` operator performs a 32-bit conversion and can wrap for extremely large values — `Math.floor` is the clearer, portable choice.

## Practical guidance

Here are the important implementation details to get correct and avoid common pitfalls:

- Loop termination: use `while (lo <= hi)` so single-element ranges are tested.
- Updating bounds: if `arr[mid] < target` set `lo = mid + 1`; if `arr[mid] > target` set `hi = mid - 1`.
- Duplicates: this simple binary search returns any matching index. If you need the first or last occurrence, implement a lower/upper bound variant.
- Insertion points: to find where a missing value should be inserted, return `lo` after the loop ends (the usual lower-bound position).

## When to use binary search

Use binary search whenever you can reduce the problem by making a yes/no decision that splits the search space in two (not just sorted arrays). Examples include numeric root finding, searching in virtual/indexed ranges, and finding boundary conditions in monotonic functions.
