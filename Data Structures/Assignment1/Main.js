//#region LocalMaximomPoint
/**
 * @param A An array of distinct real numbers.
 * @return An index of a local maxima.
 */
function LocalMaximomPoint(A) {
    return maximom(A, 0, A.length);
}

function maximom(arr, start, end) {
    const mid = Math.floor((start + end) / 2);

    if (isMax(arr, mid))
        return mid;
    if (arr[mid] < arr[mid + 1])
        return maximom(arr, mid + 1, end)
    return maximom(arr, start, mid);
}
//#endregion

//#region NumberOfLocalMaximomPoints
/**
 * @param A An array of real numbers.
 * @return The number of local maximas in the array.
 */
function NumberOfLocalMaximomPoints(A) {
    return A.length > 1 ? _NumberOfLocalMaximomPoints(A) : 0;
}

function _NumberOfLocalMaximomPoints(A) {
    const mid = Math.floor((0 + A.length) / 2);

    if (A.length == 1) return 1;

    const leftSide = A.slice(undefined, mid);
    const rightSide = A.slice(mid, undefined);

    return _NumberOfLocalMaximomPoints(leftSide) +
        _NumberOfLocalMaximomPoints(rightSide) -
        falseMaxCount(leftSide, rightSide);
}

function falseMaxCount(leftSide, rightSide) {
    const isLeftMax = leftSide.length == 1 || isMax(leftSide, leftSide.length - 1);
    const isRightMax = rightSide.length == 1 || isMax(rightSide, 0);

    // Are both sides max and equal
    if (leftSide[leftSide.length - 1] == rightSide[0] &&
        isLeftMax && isRightMax)
        return 2;

    // Is one side max and smaller than the other
    if (isLeftMax && rightSide[0] >= leftSide[leftSide.length - 1] ||
        isRightMax && rightSide[0] <= leftSide[leftSide.length - 1])
        return 1;

    return 0;
}
//#endregion

function isMax(array, i) {
    if (i == 0)
        return array[i] > array[1];
    if (i == array.length - 1)
        return array[i] > array[i - 1];
    return array[i] > array[i - 1] && array[i] > array[i + 1];
}

function generateRandomArray() {
    const arr = [];
    for (let i = 0; i < 100; i++)
        arr.push(Math.floor(Math.random() * 100));
    return arr;
}

console.log(NumberOfLocalMaximomPoints(generateRandomArray()));
console.log(NumberOfLocalMaximomPoints(generateRandomArray()));
console.log(LocalMaximomPoint(generateRandomArray()));
console.log(LocalMaximomPoint(generateRandomArray()));