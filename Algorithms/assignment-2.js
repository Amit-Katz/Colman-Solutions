const MAX_RANGE = 200;

function getStableTower(height, width, length) {
    const n = height.length;
    const boxes = [];
  
    // Create an array of boxes with their dimensions
    for (let i = 0; i < n; i++) {
      const box = { height: height[i], width: width[i], length: length[i] };
      boxes.push(box);
    }
  
    // Sort the boxes in non-increasing order of their base area (width * length)
    boxes.sort((a, b) => (b.width * b.length) - (a.width * a.length));
  
    // Initialize an array to store the maximum height of each box
    const maxHeight = new Array(n);
    maxHeight.fill(0);
  
    // Initialize an array to store the previous box in the highest tower sequence
    const prevBox = new Array(n);
    prevBox.fill(-1);
  
    // Compute the maximum height for each box
    for (let i = 0; i < n; i++) {
      maxHeight[i] = boxes[i].height; // Initialize with the box's own height
  
      for (let j = 0; j < i; j++) {
        // Check if the current box can be placed on top of the j-th box
        if (boxes[i].width < boxes[j].width && boxes[i].length < boxes[j].length) {
          // Update the maximum height and previous box if necessary
          const heightWithCurrentBox = maxHeight[j] + boxes[i].height;
          if (heightWithCurrentBox > maxHeight[i]) {
            maxHeight[i] = heightWithCurrentBox;
            prevBox[i] = j;
          }
        }
      }
    }
  
    // Find the index of the box with the maximum height
    let highestTowerIndex = 0;
    for (let i = 1; i < n; i++) {
      if (maxHeight[i] > maxHeight[highestTowerIndex]) {
        highestTowerIndex = i;
      }
    }
  
    // Construct the highest tower by traversing the previous box array
    const highestTower = [];
    let currentIndex = highestTowerIndex;
    while (currentIndex !== -1) {
      highestTower.unshift(boxes[currentIndex]);
      currentIndex = prevBox[currentIndex];
    }
  
    return highestTower;
}

function getRandomArray(length) {
    const randomArray = [];

    for (let i = 0; i < length; i++) {
        randomArray.push(Math.floor(Math.random() * (MAX_RANGE) + 1));
    }

    return randomArray;
}

function generateAndPrintTower(crateNum) {
    const height = getRandomArray(crateNum);
    const width = getRandomArray(crateNum);
    const length = getRandomArray(crateNum);
    console.log()
    const tower = getStableTower(height, width, length);

    let sum = 0;
    tower.forEach(({ height, width, length }) => {
        sum += height
        console.log(`width:${width}, length:${length}`)
    });

    console.log(`Got tower with height: ${sum}:`);
}

function main() {
    generateAndPrintTower(20);
    generateAndPrintTower(30);
}

main();