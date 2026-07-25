import type { RadarAttackPair } from "~/server/api/schemas/radar";

type Listener = () => void;

interface Stack<T> {
    push(item: T): void; 
    pop(): T | undefined;
    peek(): T | undefined
    size(): number;
}

class RAPStack<T> implements Stack<T> {
    private storage: T[] = [];
    private capacity
    private static _instance = new RAPStack<RadarAttackPair>(10)
    private listeners = new Set<Listener>()
    private snapshotCache: T[] = []

    private constructor(capacity: number) {
        this.capacity = capacity
    }

    static get instance() {
        return this._instance
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }

    getSnapshot(): T[] {
        return this.snapshotCache
    }

    push(item: T): void {
        if(this.size() === this.capacity) {
            this.storage.shift()
        }
        this.storage.push(item)
        this.snapshotCache = [...this.storage]
        this.listeners.forEach(fn => fn())
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

export const rapStack = RAPStack.instance;