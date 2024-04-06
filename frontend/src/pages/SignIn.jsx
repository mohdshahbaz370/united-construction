import { useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [state, setState] = useState({ message: "", loading: false });
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Enter valid email")
          .required("email is required"),
        password: Yup.string().required("password is required"),
      })}
      onSubmit={async (values) => {
        try {
          setState({ ...state, loading: true });
          const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          console.log("...", data);
          if (data.success === false) {
            setState({ ...state, loading: false });
            setState({ ...state, message: data?.message });
          } else {
            setState({ ...state, loading: false });
            navigate("/");
          }
        } catch (err) {
          setState({ ...state, loading: false });
          setState({ ...state, message: err?.message });
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
          <Form className="flex flex-col gap-4">
            <Field
              className="border p-3 rounded-lg"
              name="email"
              type="text"
              autoComplete="off"
            />
            <div className="text-red-500">
              <ErrorMessage name="email" />
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-700 border p-3 rounded-lg text-white uppercase disabled:opacity-80 hover:opacity-95"
            >
              {state?.loading ? "loading..." : "sign in"}
            </button>
          </Form>
          <div className="flex gap-2 mt-5">
            <p>Does not have an account?</p>
            <Link to="/signup">
              <span className="text-blue-700">Sign up</span>
            </Link>
          </div>
          {state?.message && state?.message}
        </div>
      )}
    </Formik>
  );
}
