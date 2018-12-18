import "../node_modules/semantic-ui-css/components/button.min.css";
import "../node_modules/semantic-ui-css/components/form.min.css";
import "../node_modules/semantic-ui-css/components/message.min.css";
import "../node_modules/semantic-ui-css/components/input.min.css";
import "../node_modules/semantic-ui-css/components/label.min.css";
import { Button, Form, Message, Input } from "semantic-ui-react";
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
    handleSubmit,
    setFieldTouched,
    setFieldValue
  } = props;
  return (
    <Form
      error={
        !isValid &&
        touched.fromName &&
        touched.email &&
        touched.fromEmail &&
        touched.campus
      }
      onSubmit={handleSubmit}
    >
      <Form.Field error={errors.fromName && touched.fromName ? true : false}>
        <label>Your Name</label>
        <Input
          id={"fromName"}
          className={"formField"}
          type={"text"}
          value={values.fromName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your name"
        />
      </Form.Field>
      <Form.Field error={errors.fromEmail && touched.fromEmail ? true : false}>
        <label>Your Email</label>
        <Input
          className={"formField"}
          id={"fromEmail"}
          type={"text"}
          value={values.fromEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email address"
        />
      </Form.Field>
      <Form.Field error={errors.email && touched.email ? true : false}>
        <label>Recipient Email</label>
        <Input
          id={"email"}
          className={"formField"}
          type={"text"}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter To email address"
        />
      </Form.Field>
      <Form.Field error={errors.campus && touched.campus ? true : false}>
        <label>Campus</label>
        <select
          className={"campusSelect"}
          value={values.campus}
          onChange={e => setFieldValue("campus", e.target.value)}
          onBlur={() => setFieldTouched("campus", true)}
        >
          <option value="">Select a Campus</option>
          <option value="Niceville">Niceville</option>
          <option value="Bluewater Bay">Bluewater Bay</option>
          <option value="North Crestview">North Crestview</option>
          <option value="South Crestview">South Crestview</option>
        </select>
      </Form.Field>
      <Message
        error
        header="Fields Required"
        content="Please complete all fields."
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
  mapPropsToValues: () => ({
    fromName: "",
    fromEmail: "",
    email: "",
    campus: ""
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("To Email is required!"),
    fromName: yup.string().required("From name is required"),
    fromEmail: yup
      .string()
      .email("Invalid email address")
      .required("From Email is required!"),
    campus: yup.string().required("Campus selection is required")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    submitForm({
      input_1: values.fromName,
      input_6: values.fromEmail,
      input_3: values.email,
      input_5: values.campus
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
