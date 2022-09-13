import testToPass from "./testToPass";

test("function will console log hello world", () => {
  expect(testToPass()).toBe("hello world");
});
