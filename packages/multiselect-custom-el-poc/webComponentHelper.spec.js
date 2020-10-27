import { parseProp } from "./webComponentHelper";

const items = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" }
];

it("parses object passed as string", () => {
  const prop = parseProp(JSON.stringify(items));
  expect(prop).toMatchObject(items);
});

it("prop parser returns default object", () => {
  const prop = parseProp("{", "default");
  expect(prop).toBe("default");
});
