import { types } from "mobx-state-tree";
import { Form, Field } from "../src";

test("a simple form", async () => {
  const M = types.model("M", {
    foo: types.string
  });

  const form = new Form(M, {
    foo: new Field<string, string>({
      validators: [value => value !== "correct" && "Wrong"]
    })
  });

  const o = M.create({ foo: "FOO" });

  const state = form.create(o);

  const field = state.field("foo");

  expect(field.raw).toEqual("FOO");
  await field.handleChange("BAR");
  expect(field.raw).toEqual("BAR");
  expect(field.error).toEqual("Wrong");
  expect(field.value).toEqual("FOO");
  await field.handleChange("correct");
  expect(field.error).toBeUndefined();
  expect(field.value).toEqual("correct");
});

test("mstType drives validation", async () => {
  const M = types.model("M", {
    foo: types.number
  });

  const form = new Form(M, {
    foo: new Field<string, number>()
  });

  const o = M.create({ foo: 3 });

  const state = form.create(o);

  const field = state.field("foo");

  expect(field.raw).toEqual("3");
  await field.handleChange("4");
  expect(field.raw).toEqual("4");
  expect(field.value).toEqual(4);
  expect(field.error).toBeUndefined();
  await field.handleChange("not a number");
  expect(field.value).toEqual(4);
  expect(field.error).toEqual("conversion error");
});
