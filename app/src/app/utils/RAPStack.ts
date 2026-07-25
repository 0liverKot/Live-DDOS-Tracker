interface Stack<T> {
    push(item: T): void; 
    pop(): T | undefined;
    peek(): T | undefined
    size(): number;
}

class RAPStack<T> implements Stack<T> {
    private storage: T[] = [];
    private capacity;

    constructor(capacity: number) {
        this.capacity = capacity
    } 

    push(item: T): void {
        if(this.size() === this.capacity) {
            this.storage.shift()
        }
        this.storage.push(item)
    }

    pop(): T | undefined {
    return this.storage.pop()
    }

    peek(): T | undefined {
        return this.storage.at(this.storage.length - 1)
    }

    size(): number {
        return this.storage.length;
    }
} 

export default RAPStack;