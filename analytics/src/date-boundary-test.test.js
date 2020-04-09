test("date year boundaries", () => {
  const testDate = new Date("1979-01-01T11:01:58.135Z");
  testDate.setDate(testDate.getDate() - 1);

  expect(testDate.getFullYear()).toBe(1978);
  expect(testDate.getDate()).toBe(31);
});
test("date month boundaries", () => {
  const testDate = new Date("1979-02-01T11:01:58.135Z");
  testDate.setDate(testDate.getDate() - 1);

  expect(testDate.getMonth()).toBe(0);
});

test("date leap year boundaries", () => {
  const testDate = new Date("2020-03-01T11:01:58.135Z");
  testDate.setDate(testDate.getDate() - 1);

  expect(testDate.getDate()).toBe(29);
});
