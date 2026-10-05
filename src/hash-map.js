import LinkedList from "./linked-list.js";

/**
 * Represents a Hash Map data structure
 */
class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = [];

    for (let i = 0; i < capacity; i++) {
      this.buckets.push(new LinkedList());
    }
  }

  /**
   * Takes in a string key and hashes it into a number code
   * @param {string} key The key to hash
   * @returns The hashed code
   */
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode;
  }
}

export default HashMap;
