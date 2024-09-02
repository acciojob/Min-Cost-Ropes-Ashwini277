function mincost(arr) {
    const minHeap = new MinHeap();
    
    // Insert all rope lengths into the min-heap
    arr.forEach(length => minHeap.insert(length));
    
    let totalCost = 0;

    // While there is more than one rope
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes
        const rope1 = minHeap.extractMin();
        const rope2 = minHeap.extractMin();

        // Cost to connect these two ropes
        const cost = rope1 + rope2;
        totalCost += cost;

        // Insert the new combined rope back into the heap
        minHeap.insert(cost);
    }

    return totalCost;
}

// Min-Heap implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this._heapifyUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty");
        }
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this._heapifyDown(0);
        }
        return min;
    }

    size() {
        return this.heap.length;
    }

    _heapifyUp(index) {
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element >= parent) break;
            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }

    _heapifyDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swap = null;
            if (leftChildIndex < length) {
                const leftChild = this.heap[leftChildIndex];
                if (leftChild < element) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                const rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild < element) || (swap !== null && rightChild < this.heap[swap])) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    }
}

// Example usage
console.log(mincost([4, 3, 2, 6])); // Output: 29
console.log(mincost([1, 2, 3, 4, 5])); // Output: 33
