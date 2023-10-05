import react, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const LoginForm = ({ onLogin }) => {
  const [users, setUsers] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      });
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    email: yup.string().required("Use Email address as username").email("Invalid username"),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values, null, 2),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => onLogin(user));
        } else {
          resp.json().then((err) => setErrors(err.errors));
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Username</label>
        <br />
        <input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
        <p style={{ color: "red" }}>{formik.errors.email}</p>
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
        <p style={{ color: "red" }}>{formik.errors.password}</p>
        <br />
        <button type="submit">Login</button>
        <div>
          {errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
