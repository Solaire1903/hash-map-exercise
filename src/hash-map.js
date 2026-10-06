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
   * Removes a key-value pair from the map
   * @param {*} key The key to remove the entry of
   * @returns True, if the entry got successfully removed,
   * false if the key entry does not exist in the map
   */
  remove(key) {
    const targetNode = this.#nodeAt(key);
    if (targetNode === null) return false;

    const list = this.buckets[this.#hash(key)];
    if (list.head === targetNode) {
      list.head = targetNode.nextNode;
      return true;
    }

    let currentNode = list.head;
    while (currentNode.nextNode !== targetNode) {
      currentNode = currentNode.nextNode;
    }

    if (targetNode.nextNode === null) {
      currentNode.nextNode = null;
      return true;
    }

    currentNode.nextNode = targetNode.nextNode;
    return true;
  }

  /**
   * Returns the number of entries in the map
   * @returns The number of entries in the map
   */
  length() {
    let length = 0;
    this.buckets.forEach((list) => {
      length += list.size();
    });

    return length;
  }

  /**
   * Removes all entries in the map
   */
  clear() {
    this.buckets.forEach((list) => {
      while (list.size() > 0) {
        list.pop();
      }
    });
  }

  /**
   * Gets all the keys in the map
   * @returns An array containing all the keys in the map
   */
  keys() {
    return this.#getSubEntries("keys");
  }

  /**
   * Gets all the values in the map
   * @returns An array containing all the values in the map
   */
  values() {
    return this.#getSubEntries("values");
  }

  /**
   * Gets all the entries in the map
   * @returns An array containing all the entries (in their own arrays) in the map
   */
  entries() {
    const entries = [];
    const keys = this.keys();
    const values = this.values();

    let valueIndex = 0;
    keys.forEach((key) => {
      const entry = [key].concat(values[valueIndex]);
      entries.push(entry);
      valueIndex++;
    });

    return entries;
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

  /**
   * Gets all the keys or all the values of the map
   * @param {string} entryToGet The type of entry to get ("keys" or "values")
   * @returns An array containing the sub-entries
   */
  #getSubEntries(entryToGet) {
    const subEntries = [];
    let entryTypeNumber;

    switch (entryToGet) {
      case "keys":
        entryTypeNumber = 0;
        break;
      case "values":
        entryTypeNumber = 1;
        break;
      default:
        return subEntries;
    }

    this.buckets.forEach((list) => {
      let currentNode = list.head;

      while (currentNode !== null) {
        subEntries.push(currentNode.value[entryTypeNumber]);
        currentNode = currentNode.nextNode;
      }
    });

    return subEntries;
  }
}

export default HashMap;
