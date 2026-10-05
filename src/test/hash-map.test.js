import HashMap from "../hash-map.js";

describe("Hash Map exists", () => {
  const hashMap = new HashMap();

  test("Properties have correct default values", () => {
    expect(hashMap.loadFactor).toBe(0.75);
    expect(hashMap.capacity).toBe(16);
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
