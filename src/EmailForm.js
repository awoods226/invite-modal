import "../node_modules/semantic-ui-css/components/button.min.css";
import "../node_modules/semantic-ui-css/components/form.min.css";
import "../node_modules/semantic-ui-css/components/message.min.css";
import { Button, Form, Message } from "semantic-ui-react";
import React from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import { submitForm } from "./Gfapi";

const EmailForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  return (
    <Form
      error={!isValid && touched.from && touched.email}
      onSubmit={handleSubmit}
    >
      <Form.Field error={errors.from && touched.from ? true : false}>
        <label>From</label>
        <input
          id={"from"}
          type={"text"}
          value={values.from}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your name"
        />
      </Form.Field>
      <Form.Field error={errors.email ? true : false}>
        <label>To</label>
        <input
          id={"email"}
          type={"text"}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter To email address"
        />
      </Form.Field>
      <Form.Field>
        <label>Message</label>
        <textarea
          id={"message"}
          value={values.message}
          onChange={handleChange}
          rows={3}
          onBlur={handleBlur}
        />
      </Form.Field>
      <Message
        error
        header="Fields Required"
        content="Please enter a valid From Name and To Email address."
      />
      <Button type="submit" disabled={!dirty || isSubmitting}>
        Send
      </Button>
      <Button type="button" onClick={() => props.onCancelClick()}>
        Cancel
      </Button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues: () => ({ from: "", email: "", message: "" }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required!"),
    from: yup.string().required("From name is required")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    submitForm({
      input_1: values.from,
      input_3: values.email,
      input_4: values.message
    })
      .then(r => {
        props.onSubmit();
      })
      .catch(e => {
        console.log(e);
        props.onSubmit();
      });
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  },
  displayName: "EmailForm" // helps with React DevTools
})(EmailForm);
