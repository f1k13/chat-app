"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import Loader from "../loader/loader";

const Button = ({
  children,
  type,
  fullWidth,
  onClick,
  secondary,
  danger,
  disabled,
}: {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible: outline-offset-2`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {!disabled ? children : <Loader />}
    </button>
  );
};

export default Button;
