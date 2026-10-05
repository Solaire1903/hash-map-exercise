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
   * Adds a key-value pair to the Map. If the key already exists,
   * the old value gets overwritten with the new value.
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const hashCode = this.#hash(key);
    this.#checkBounds(hashCode);
    const list = this.buckets[hashCode];
    const node = this.#nodeAt(key);

    //Check, if key already exists in a node
    if (node !== null) {
      node.value[1] = value;
      return;
    }

    list.append([key, value]);
  }

  /**
   * Gets the value of the given key
   * @param {string} key The key to find the value of
   * @returns The value associated with the key, undefined if key does not exist
   */
  get(key) {
    const keyNode = this.#nodeAt(key);

    return keyNode !== null ? keyNode.value[1] : undefined;
  }

  /**
   * Checks, if a given key is in the map
   * @param {string} key The key to search for
   * @returns True, if key is in the map, false otherwise
   */
  has(key) {
    const keyNode = this.#nodeAt(key);

    return keyNode !== null ? true : false;
  }

  /**
   * Takes in a string key and hashes it into a number code
   * @param {string} key The key to hash
   * @returns The hashed code
   */
  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode;
  }

  /**
   * Checks, if the given index is out of bounds of
   * the bucket array and throws an error if so
   * @param {number} index
   */
  #checkBounds(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  /**
   * Gets the Node where the given key is stored. If the key
   * does not exist in the map, return null.
   * @param {string} key The key to search the Node for
   * @returns The Node where the key is stored, null if it does not exist
   */
  #nodeAt(key) {
    const hashCode = this.#hash(key);
    this.#checkBounds(hashCode);
    const list = this.buckets[hashCode];
    let currentNode = list.head;

    while (currentNode !== null && currentNode !== undefined) {
      if (currentNode.value[0] === key) return currentNode;

      currentNode = currentNode.nextNode;
    }

    return null;
  }
}

export default HashMap;
