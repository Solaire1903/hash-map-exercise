import HashMap from "../hash-map.js";

describe("Hash Map exists", () => {
  const hashMap = new HashMap();

  test("Properties have correct default values", () => {
    expect(hashMap.loadFactor).toBe(0.75);
    expect(hashMap.capacity).toBe(16);
  });
});
