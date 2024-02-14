import React from "react";
import { useForm } from "react-hook-form";

export function InputField({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />;
}

export function EmailField({register, name, customClass , ...rest}) {
  const {   formState: { errors }, } = useForm();

  return (
    <>
      <input 
          {...register("email", {
          required: "required",
          pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email provided",
          },
          })}
          aria-invalid={errors.email ? "true" : "false"} 
          className={`${customClass}`}
          id="email"
          type="email"
          {...rest}
        />
      {/* {errors.email && <p>{errors.email.message}</p>} */}
    </>
  )
}

export function PassWordField({ register, name  , customClass, ...rest }) {
  return(
    <React.Fragment>
      <input 
        className={`${customClass}`}
        id="password"
        {...register("password", {
          required: "required",
          minLength: {
              value: 5,
              message: `Password must have minimum characters of 5`,
          },
        }
        )}
        type="password"
        {...rest}
      />
      {/* {errors.password && <span>{errors.password.message}</span>} */}
    </React.Fragment>
  ) 
}