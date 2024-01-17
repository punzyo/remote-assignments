/*function twoSum(nums, target) {
    let firstIndex = 0;
    let secondIndex = 1;
    while(nums[firstIndex] + nums[secondIndex] !== target){
        if(secondIndex < nums.lemgth) {
            secondIndex += 1;
        }
        else {
            firstIndex += 1;
            secondIndex = firstIndex + 1;
        }
    }
    return([firstIndex,secondIndex])
}
console.log(twoSum([2, 7, 11, 15], 9))*/
function twoSum(nums, target) {
    let hashtable = {};
    let firstIndex = 0;
    let secondIndex = 1;
    for (let i = 0; i < nums.length; i++) {
            hashtable[nums[i]] = i;
    }
    while (hashtable[target - nums[firstIndex]] === undefined || hashtable[target - nums[firstIndex]] === firstIndex) {
        firstIndex++;
    }
    secondIndex = hashtable[(target-nums[firstIndex])];
    return([firstIndex, secondIndex])
}

console.log(twoSum([2, 7, 11, 15], 9))
console.log(twoSum([3, 2, 4], 6))