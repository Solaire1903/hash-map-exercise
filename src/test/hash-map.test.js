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

describe("Function test: hash", () => {
  const hashMap = new HashMap();

  test("Function returns a number", () => {
    expect(typeof hashMap.hash("test")).toBe("number");
  });

  test("Number is within the bounds of the map capacity", () => {
    expect(hashMap.hash("test")).toBeGreaterThanOrEqual(0);
    expect(hashMap.hash("test")).toBeLessThan(hashMap.capacity);

    expect(hashMap.hash("another test")).toBeGreaterThanOrEqual(0);
    expect(hashMap.hash("another test")).toBeLessThan(hashMap.capacity);

    expect(hashMap.hash("blablabla")).toBeGreaterThanOrEqual(0);
    expect(hashMap.hash("blablabla")).toBeLessThan(hashMap.capacity);

    expect(hashMap.hash("fgtetfgwfkerlp")).toBeGreaterThanOrEqual(0);
    expect(hashMap.hash("fgtetfgwfkerlp")).toBeLessThan(hashMap.capacity);

    expect(hashMap.hash("LaLiLuLeLo")).toBeGreaterThanOrEqual(0);
    expect(hashMap.hash("LaLiLuLeLo")).toBeLessThan(hashMap.capacity);
  });

  test("The same input returns the same output", () => {
    expect(hashMap.hash("test")).toBe(hashMap.hash("test"));

    expect(hashMap.hash("another test")).toBe(hashMap.hash("another test"));

    expect(hashMap.hash("blablabla")).toBe(hashMap.hash("blablabla"));

    expect(hashMap.hash("fgtetfgwfkerlp")).toBe(hashMap.hash("fgtetfgwfkerlp"));

    expect(hashMap.hash("LaLiLuLeLo")).toBe(hashMap.hash("LaLiLuLeLo"));
  });
});

describe("Function test: set", () => {
  const hashMap = new HashMap();
  const firstKey = "blablabla";
  const firstHashCode = hashMap.hash(firstKey);

  test("New key gets set", () => {
    hashMap.set(firstKey, 21);
    const firstEntryValue = hashMap.buckets[firstHashCode].headNodeValue();
    expect(firstEntryValue).toEqual(["blablabla", 21]);
  });

  test("Existing key gets set to a new value", () => {
    hashMap.set(firstKey, 42);
    const firstEntryValue = hashMap.buckets[firstHashCode].headNodeValue();
    expect(firstEntryValue).toEqual(["blablabla", 42]);
  });

  const secondKey = "LaLiLuLeLo";
  const secondHashCode = hashMap.hash(secondKey);

  test("New key with the same hashcode gets set", () => {
    hashMap.set(secondKey, 50);
    const secondEntryValue =
      hashMap.buckets[secondHashCode].head.nextNode.value;
    expect(secondEntryValue).toEqual(["LaLiLuLeLo", 50]);
  });
});
