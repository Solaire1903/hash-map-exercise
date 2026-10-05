import HashMap from "../hash-map.js";
import LinkedList from "../linked-list.js";

describe("Hash Map exists", () => {
  const hashMap = new HashMap();

  test("Properties have correct default values", () => {
    expect(hashMap.loadFactor).toBe(0.75);
    expect(hashMap.capacity).toBe(16);
  });

  test("Bucket Array has the correct length", () => {
    expect(hashMap.buckets.length).toBe(hashMap.capacity);
  });

  test("Bucket Array is filled with empty Linked Lists", () => {
    hashMap.buckets.forEach((bucket) => {
      expect(bucket instanceof LinkedList).toBeTruthy();
      expect(bucket.size()).toBe(0);
    });
  });
});

describe("Function test: set", () => {
  const hashMap = new HashMap();
  const firstKey = "blablabla";

  test("New key gets set", () => {
    hashMap.set(firstKey, 21);
    const firstEntryValue = hashMap.buckets[7].headNodeValue();
    expect(firstEntryValue).toEqual(["blablabla", 21]);
  });

  test("Existing key gets set to a new value", () => {
    hashMap.set(firstKey, 42);
    const firstEntryValue = hashMap.buckets[7].headNodeValue();
    expect(firstEntryValue).toEqual(["blablabla", 42]);
  });

  const secondKey = "LaLiLuLeLo";

  test("New key with the same hashcode gets set", () => {
    hashMap.set(secondKey, 50);
    const secondEntryValue = hashMap.buckets[7].head.nextNode.value;
    expect(secondEntryValue).toEqual(["LaLiLuLeLo", 50]);
  });
});

describe("Function test: get", () => {
  const hashMap = new HashMap();
  const key = "test";

  hashMap.set(key, 67);

  test("Get existing key's value", () => {
    expect(hashMap.get(key)).toBe(67);
  });

  test("Key does not exist", () => {
    expect(hashMap.get("invalid")).toBeUndefined();
  });
});
