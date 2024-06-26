"use client";

import { AuthTypeVariant } from "@/app/types/auth-variant";
import axios from "axios";
import Button from "@/app/(client)/components/ui/button/button";
import TextField from "@/app/(client)/components/ui/text-field/text-field";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const AuthForm = () => {
  const [variant, setVariant] = useState<AuthTypeVariant>("LOGIN");
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = () => {
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    if (variant === "REGISTER") {
      try {
        await axios.post("/api/register", data);
        await signIn("credentials", data);
        toast.success("Success");
      } catch (error: any) {
        toast.error(error?.response.data);
      } finally {
        setIsLoading(false);
      }
    }

    if (variant === "LOGIN") {
      try {
        const callback = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok) {
          toast.success("Success");
          router.push("/users");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);
  return (
    <div className="mt-8 sm:mx-auto sm:-w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <TextField
              label="Name"
              register={register}
              id="name"
              errors={errors}
            />
          )}
          <TextField
            label="Email"
            register={register}
            id="email"
            type="email"
            errors={errors}
          />
          <TextField
            label="password"
            register={register}
            type="password"
            id="password"
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sing in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN" ? "New to chat?" : "Already create account"}
            </div>
            <div className="underline cursor-pointer" onClick={toggleVariant}>
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
