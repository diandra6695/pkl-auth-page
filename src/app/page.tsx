"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import user from "@/utils/user";

type Login = {
  email: string;
  password: string;
};

export default function Home() {
  const data = user;
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      if (data.email === values.email && data.password === values.password) {
        toast.success("Login Success", {
          description: "email : " + values.email,
        });
        return;
      }
      toast.error("Wrong email or password");
      return;
    },
  });
  const handleClickGoogle = () => {
    alert("login dengan google");
  };
  const handleClickApple = () => {
    alert("login dengan apple");
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };
  return (
    <div className="md:container md:mx-auto overflow-x-hidden">
      <div className="w-full text-xl h-screen flex flex-col justify-center items-center">
        <div className="bg-violet-600 overflow-hidden blur-3xl rounded-full opacity-10 -z-30 md:w-[35rem] md:h-[35rem] w-[25rem] h-[25rem] absolute"></div>
        <Card className="md:w-[26rem] md:h-auto h-screen flex flex-col justify-center w-full md:p-5 p-1">
          <CardHeader className="">
            <Image
              className="mb-3"
              src={"/vercel.svg"}
              alt="logo"
              width={60}
              height={60}
            />
            <h3 className="font-bold text-xl">Welcome Back!</h3>
            <p className="text-sm text-gray-500">
              Enter your details to get started
            </p>
          </CardHeader>
          <CardContent>
            <form
              className="flex mb-4 flex-col gap-3"
              onSubmit={formik.handleSubmit}
              action=""
            >
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              ) : null}
              <div className="flex  justify-between items-center">
                <Label htmlFor="Password">Password</Label>
                <Link
                  className="text-xs underline text-violet-500"
                  href="/password_resets"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                {showPassword ? (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    variant="ghost"
                    className="absolute p-0 px-2 h-fit hover:bg-white bg-white md:translate-x-[17.5rem] sm:translate-x-[33.5rem] sm:ml-0 ml-[18rem] translate-y-2 text-slate-500"
                  >
                    <Eye size={25} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    variant="ghost"
                    className="absolute p-0 px-2 h-fit hover:bg-white bg-white md:translate-x-[17.5rem] sm:translate-x-[33.5rem] sm:ml-0 ml-[18rem] translate-y-2 text-slate-500"
                  >
                    <EyeSlash size={25} />
                  </Button>
                )}
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              ) : null}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="w-full ">
              <p className="text-sm mb-2 text-center text-gray-500">
                Or login with
              </p>
              <div className="flex w-full gap-4">
                <Button
                  onClick={handleClickApple}
                  className="w-full flex gap-2 items-center justify-center"
                  variant="outline"
                >
                  <Image
                    src={"/assets/icon/apple.svg"}
                    width={16}
                    height={16}
                    alt="apple"
                  />
                  Apple
                </Button>
                <Button
                  onClick={handleClickGoogle}
                  className="w-full flex gap-2 items-center justify-center"
                  variant="outline"
                >
                  <Image
                    src="/assets/icon/google.svg"
                    width={16}
                    height={16}
                    alt="google"
                  />
                  Google
                </Button>
              </div>
            </div>
            <div className="text-sm md:hidden mt-2 text-center text-gray-500">
              {"Don't"} have an account?{" "}
              <Link href="/register" className="text-violet-600">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="text-sm hidden md:block mt-2 text-center text-gray-500">
          {"Don't"} have an account?{" "}
          <Link href="/register" className="text-violet-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
