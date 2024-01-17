function max(numbers) {
    let maxValue = numbers[0];
    for (const value of numbers) {
        if (value > maxValue) {
            maxValue = value;
        }
    }
    return maxValue;
}
    console.log(max([1, 2, 4, 5])); // expected output: 5
    console.log(max([5, 2, 7, 1, 6])); // expected output: 7