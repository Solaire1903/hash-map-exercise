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

describe("Function test: has", () => {
  const hashMap = new HashMap();
  const key = "test";

  hashMap.set(key, 67);

  test("Key is in the map", () => {
    expect(hashMap.has(key)).toBeTruthy();
  });

  test("Key is not in the map", () => {
    expect(hashMap.has("invalid")).toBeFalsy();
  });
});

describe("Function test: remove", () => {
  const hashMap = new HashMap();
  const firstKey = "test";
  const secondKey = "blablabla";
  const thirdKey = "LaLiLuLeLo";

  hashMap.set(firstKey, 67);
  hashMap.set(secondKey, 78);
  hashMap.set(thirdKey, 61);

  test("Remove existing keys", () => {
    expect(hashMap.remove(firstKey)).toBeTruthy();
    expect(hashMap.get(firstKey)).toBeUndefined();

    expect(hashMap.remove(thirdKey)).toBeTruthy();
    expect(hashMap.get(thirdKey)).toBeUndefined();

    expect(hashMap.remove(secondKey)).toBeTruthy();
    expect(hashMap.get(secondKey)).toBeUndefined();
  });

  test("Try to remove key that does not exist", () => {
    expect(hashMap.remove("invalid")).toBeFalsy();
  });
});

describe("Function test: length", () => {
  const hashMap = new HashMap();
  const firstKey = "test";
  const secondKey = "blablabla";
  const thirdKey = "LaLiLuLeLo";

  test("Empty map", () => {
    expect(hashMap.length()).toBe(0);
  });

  test("Map with three entries", () => {
    hashMap.set(firstKey, 67);
    hashMap.set(secondKey, 78);
    hashMap.set(thirdKey, 61);

    expect(hashMap.length()).toBe(3);
  });
});

describe("Function test: keys", () => {
  const hashMap = new HashMap();
  const firstKey = "test";
  const secondKey = "blablabla";
  const thirdKey = "LaLiLuLeLo";

  test("Empty map", () => {
    expect(hashMap.keys()).toEqual([]);
  });

  test("Map with three entries", () => {
    hashMap.set(firstKey, 67);
    hashMap.set(secondKey, 78);
    hashMap.set(thirdKey, 61);

    expect(hashMap.keys()).toEqual(["test", "blablabla", "LaLiLuLeLo"]);
  });
});

describe("Function test: values", () => {
  const hashMap = new HashMap();
  const firstKey = "test";
  const secondKey = "blablabla";
  const thirdKey = "LaLiLuLeLo";

  test("Empty map", () => {
    expect(hashMap.values()).toEqual([]);
  });

  test("Map with three entries", () => {
    hashMap.set(firstKey, 67);
    hashMap.set(secondKey, 78);
    hashMap.set(thirdKey, 61);

    expect(hashMap.values()).toEqual([67, 78, 61]);
  });
});

describe("Function test: entries", () => {
  const hashMap = new HashMap();
  const firstKey = "test";
  const secondKey = "blablabla";
  const thirdKey = "LaLiLuLeLo";

  test("Empty map", () => {
    expect(hashMap.entries()).toEqual([]);
  });

  test("Map with three entries", () => {
    hashMap.set(firstKey, 67);
    hashMap.set(secondKey, 78);
    hashMap.set(thirdKey, 61);

    expect(hashMap.entries()).toEqual([
      ["test", 67],
      ["blablabla", 78],
      ["LaLiLuLeLo", 61],
    ]);
  });
});
