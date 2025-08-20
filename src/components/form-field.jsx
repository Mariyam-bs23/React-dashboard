import React from "react";
import { useForm } from "react-hook-form";

export function InputField({ register, name, customClass, ...rest }) {
  return <input {...register(name)} {...rest} className={`${customClass}  bg-gray-200/50`} />;
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
          className={`${customClass} bg-gray-200/50`}
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
        className={`${customClass}  bg-gray-200/50`}
        id="password"
        {...register("password", {
          required: "required",
          minLength: {
              value: 4,
              message: `Password must have minimum characters of 4`,
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