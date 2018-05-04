import React, { Component } from "react";
import "antd/dist/antd.css";
import { observer } from "mobx-react";
import { Button, Form, Input, Card } from "antd";
import { types } from "mobx-state-tree";
import { Form as MstForm, Field } from "mstform";

const M = types.model("M", {
  foo: types.string
});

const form = new MstForm(M, {
  foo: new Field({
    validators: [value => value !== "correct" && "Wrong"],
    getRaw: ev => ev.target.value
  })
});

const formItemLayout = {
  labelCol: {
    xs: { span: 10 },
    sm: { span: 1 }
  },
  wrapperCol: {
    xs: { span: 10 },
    sm: { span: 10 }
  }
};

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.node = M.create({ foo: "FOO" });
    this.state = form.create(this.node);
  }

  render() {
    const field = this.state.field("foo");

    return (
      <Card>
        <Form>
          <Form.Item label="Foo" {...field.validationProps} {...formItemLayout}>
            <Input {...field.inputProps} />
          </Form.Item>
        </Form>
        <Button>press</Button>
      </Card>
    );
  }
}

export default App;