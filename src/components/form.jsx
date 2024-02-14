import React from "react";
import { useForm } from "react-hook-form";

const FormCmp = (props) => {
  const { defaultValues, children, onSubmit, customClass } = props;
  const { handleSubmit, register, formState:{ errors } } = useForm({ defaultValues });


  return (
    <form className={`${customClass}`} onSubmit={handleSubmit(onSubmit)}>
    {Array.isArray(children)
      ? children.map((child) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register,
                  key: child.props.name
                }
              })
            : child;
        })
      : children}
  </form>
  );
}

export default FormCmp;

