/**
 * Represents a single Node in the Linked List
 */
class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

/**
 * Represents a Linked List structure
 */
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  /**
   * Appends a new Node with a given value to the end of the list
   * @param {*} value The value of the Node to append
   */
  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return;
    }

    let currentNode = this.head;

    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = new Node(value);
  }

  /**
   * Adds a new Node with the given value to the head of the list
   * @param {*} value
   */
  prepend(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return;
    }

    const newHead = new Node(value);

    newHead.nextNode = this.head;
    this.head = newHead;
  }

  /**
   * Gets the size of the list
   * @returns The list size
   */
  size() {
    let currentNode = this.head;
    let size = 0;

    while (currentNode !== null) {
      size++;
      currentNode = currentNode.nextNode;
    }

    return size;
  }

  /**
   * Gets the list's first node's (head node) value
   * @returns The head node's value
   */
  headNodeValue() {
    if (this.head === null) {
      return undefined;
    }

    return this.head.value;
  }

  /**
   * Gets the list's last node's (tail node) value
   * @returns The tail node's value
   */
  tailNodeValue() {
    if (this.head === null) {
      return undefined;
    }

    let currentNode = this.head;

    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }

    return currentNode.value;
  }

  /**
   * Returns the value of the node at a given index
   * @param {number} searchIndex The index of the node to find the value of
   * @returns The value of the node at the given index
   */
  at(searchIndex) {
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null) {
      if (currentIndex === searchIndex) return currentNode.value;

      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    return undefined;
  }

  /**
   * Removes the head node from the list and returns its value
   * @returns The value of the head node
   */
  pop() {
    if (this.head === null) {
      return undefined;
    }

    let headValue = this.head.value;

    this.head = this.head.nextNode;

    return headValue;
  }

  /**
   * Checks, if a given value is in the list
   * @param {*} value The value to search for
   * @returns True, if the value is in the list, false otherwise
   */
  contains(value) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value === value) return true;

      currentNode = currentNode.nextNode;
    }

    return false;
  }

  /**
   * Finds the index of the first node with the given value
   * @param {*} value The value to search the index for
   * @returns The index of the node with the given value, or -1 if there is no such node
   */
  findIndex(value) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode !== null) {
      if (currentNode.value === value) return index;

      currentNode = currentNode.nextNode;
      index++;
    }

    return -1;
  }

  /**
   * Represents the list as a string
   * @returns A string representing the list
   */
  toString() {
    if (this.head === null) {
      return "";
    }

    let listString = `( ${this.head.value} ) ->`;
    let currentNode = this.head.nextNode;

    while (currentNode !== null) {
      listString = listString.concat(" ", `( ${currentNode.value} ) ->`);
      currentNode = currentNode.nextNode;
    }

    listString = listString.concat(" ", "null");

    return listString;
  }

  /**
   * Inserts the given values into the Linked List at the given index
   * @param {number} insertIndex The index to insert the values at
   * @param  {...any} values The values to insert
   */
  insertAt(insertIndex, ...values) {
    //Check for invalid index
    if (insertIndex < 0 || insertIndex > this.size())
      throw new RangeError("Invalid Index");

    //Create sub-list with values from the given value array
    const subList = new LinkedList();

    values.forEach((value) => {
      subList.append(value);
    });

    let currentSubListNode = subList.head;

    //Find last Node of the sub-list
    while (currentSubListNode.nextNode !== null) {
      currentSubListNode = currentSubListNode.nextNode;
    }

    const lastSubListNode = currentSubListNode;

    //Prepend sub-list at the beginning of the current list
    if (insertIndex === 0) {
      lastSubListNode.nextNode = this.head;
      this.head = subList.head;
      return;
    }

    let currentNode = this.head;
    let index = 1;

    //Find Node, after which the sub-list will be inserted
    while (index < insertIndex) {
      currentNode = currentNode.nextNode;
      index++;
    }

    //Insert sub-list into the current list
    lastSubListNode.nextNode = currentNode.nextNode;
    currentNode.nextNode = subList.head;
  }

  /**
   * Removes the Node at a given index
   * @param {number} removeIndex The index of the Node to remove
   */
  removeAt(removeIndex) {
    if (removeIndex < 0 || removeIndex >= this.size())
      throw new RangeError("Invalid Index");

    if (removeIndex === 0) {
      this.head = this.head.nextNode;
      return;
    }

    let currentNode = this.head;
    let index = 1;

    //Find the Node that comes before the Node to be removed
    while (index < removeIndex) {
      currentNode = currentNode.nextNode;
      index++;
    }

    //If Node to be removed is the last Node of the list
    if (currentNode.nextNode.nextNode === null) {
      currentNode.nextNode = null;
      return;
    }

    currentNode.nextNode = currentNode.nextNode.nextNode;
  }
}

export default LinkedList;
