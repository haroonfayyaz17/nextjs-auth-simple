"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import Eye and EyeOff icons from react-icons

import Link from "next/link";
import startCase from "lodash/startCase";
import omit from "lodash/omit";
import { RenderIf } from "./RenderIf";
import { setToken, sleep } from "@/utils";

const SignInSignUpForm = ({ type }) => {
  const router = useRouter();

  const initalState = { name: "", email: "", password: "" };
  const isSignUpForm = type === "signup";
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [formData, setFormData] = useState(initalState);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetStates = () => {
    setSuccess("");
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let url, body;
    switch (true) {
      case isSignUpForm:
        url = "/auth";
        body = formData;
        break;
      case !isSignUpForm:
        url = "/auth/login";
        body = omit(formData, "name");
        break;
      default:
        break;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    resetStates();

    fetch(BASE_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json", mode: "no-cors" },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const res = await response.json();
        if (response.ok) {
          resetStates();
          if (isSignUpForm) await sleep(1);
          setFormData(initalState);
          if (isSignUpForm) {
            setSuccess("Account created successfully");
            await sleep(2);
          }
          if (!isSignUpForm) setToken(res.access_token)
          router.push(isSignUpForm ? "/" : "/home");
        } else {
          
          setError(res.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6">
          {isSignUpForm ? "Sign Up" : "Sign In"}
        </h2>
        {error && (
          <div className="auto-hide">
            <div className="mb-4 p-4 border border-red-500 bg-red-100 text-red-700">
              {error}
            </div>
          </div>
        )}
        {success && (
          <div className="auto-hide mb-4 p-4 border border-green-500 bg-green-100 text-green-700">
            {success}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <RenderIf isTrue={isSignUpForm}>
            <InputField
              field="name"
              type="text"
              placeholder="Enter your name"
              formData={formData}
              onChange={handleInputChange}
            />
          </RenderIf>
          <InputField
            field="email"
            type="email"
            placeholder="Enter your email address"
            formData={formData}
            onChange={handleInputChange}
          />
          <InputField
            field="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$"
            formData={formData}
            onChange={handleInputChange}
            inputChildren={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 pr-3 text-black-500 focus:outline-none"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            }
          >
            <RenderIf isTrue={isSignUpForm}>
              <span className="text-xs text-gray-500 mb-2">
                Password should contain at least one uppercase letter, one
                lowercase letter, one special character, and one number
              </span>
            </RenderIf>
          </InputField>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center py-2">
          <Link
            href={isSignUpForm ? "/" : "/signup"}
            className="text-blue-500 hover:underline"
          >
            {isSignUpForm
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpForm;

const InputField = ({ field, formData, children, inputChildren, ...props }) => (
  <div className="mb-6 relative">
    <label
      htmlFor={field}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {startCase(field)}
    </label>
    <div className="flex items-center">
      <input
        {...props}
        id={field}
        name={field}
        value={formData[field]}
        className="w-full py-2 px-4 border rounded-md"
        required
      />
      {inputChildren}
    </div>
    {children}
  </div>
);
