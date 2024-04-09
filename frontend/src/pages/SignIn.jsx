import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
          dispatch(signInStart());
          const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(signInFailure(data?.message));
          } else {
            dispatch(signInSuccess(data));
            navigate("/");
          }
        } catch (err) {
          dispatch(signInFailure(err?.message));
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
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
              {loading ? "loading..." : "sign in"}
            </button>
            <OAuth />
          </Form>
          <div className="flex gap-2 mt-5">
            <p>Does not have an account?</p>
            <Link to="/signup">
              <span className="text-blue-700">Sign up</span>
            </Link>
          </div>
          {error && error}
        </div>
      )}
    </Formik>
  );
}
