import { useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [state, setState] = useState({ message: "", loading: false });
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("username is required"),
        email: Yup.string()
          .email("Enter valid email")
          .required("email is required"),
        password: Yup.string().required("password is required"),
      })}
      onSubmit={async (values) => {
        try {
          setState({ ...state, loading: true });
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (data.success) {
            setState({ ...state, loading: false });
            setState({ ...state, message: data?.message });
            navigate("/signin");
          } else {
            setState({ ...state, loading: false });
            setState({ ...state, message: data?.message });
          }
        } catch (err) {
          setState({ ...state, loading: false });
          setState({ ...state, message: err?.message });
        }
      }}
    >
      {() => (
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
          <Form className="flex flex-col gap-4">
            <Field
              className="border p-3 rounded-lg"
              name="username"
              type="text"
              autoComplete="off"
            />
            <div className="text-red-500">
              <ErrorMessage name="username" />
            </div>
            <Field
              className="border p-3 rounded-lg"
              name="password"
              type="password"
              autoComplete="off"
            />
            <div className="text-red-500">
              <ErrorMessage name="password" />
            </div>
            <Field
              className="border p-3 rounded-lg"
              name="email"
              type="text"
              autoComplete="off"
            />
            <div className="text-red-500">
              <ErrorMessage name="email" />
            </div>
            <button
              type="submit"
              className="bg-slate-700 border p-3 rounded-lg text-white uppercase disabled:opacity-80 hover:opacity-95"
            >
              {state?.loading ? "loading..." : "sign up"}
            </button>
            <OAuth />
          </Form>
          <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to="/signin">
              <span className="text-blue-700">Sign in</span>
            </Link>
          </div>
          {state?.message && state?.message}
        </div>
      )}
    </Formik>
  );
}
