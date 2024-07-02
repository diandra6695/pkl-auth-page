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
import { ChangeEventHandler } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

type Login = {
  email: string;
  password: string;
};

export default function Home() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password minimum 8 character"),
      confirmPassword: Yup.string()
        .required("Confirm password is Required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    }),
    onSubmit: (values) => {
      toast.success("Register Success", {
        description: "name : " + values.name + ", " + "email : " + values.email,
      });
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
    <div className="container mx-auto overflow-x-hidden">
      <div className="w-full text-xl h-screen flex flex-col justify-center items-center">
        <div className="bg-violet-600 overflow-hidden blur-3xl rounded-full opacity-10 -z-30 md:w-[35rem] md:h-[35rem] w-[25rem] h-[25rem] absolute"></div>
        <Card className="md:w-[26rem] w-[20rem] md:p-5 p-1">
          <CardHeader className="">
            <Image
              className="mb-3"
              src={"/vercel.svg"}
              alt="logo"
              width={60}
              height={60}
            />
            <h3 className="font-bold text-xl">Lets get started!</h3>
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
              <Label htmlFor="name">Nama</Label>
              <Input
                type="text"
                name="name"
                placeholder="masukkan nama anda"
                onChange={handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-xs">{formik.errors.name}</p>
              ) : null}
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="masukkan email anda"
                onChange={handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              ) : null}
              <Label htmlFor="Password">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="masukkan password anda"
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              ) : null}
              <Label htmlFor="Password">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="masukkan konfirmasi password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
            <div className="w-full ">
              <p className="text-sm mb-2 text-center text-gray-500">
                atau register dengan
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
          </CardContent>
        </Card>
        <div className="text-sm mt-2 text-center text-gray-500">
          Alredy have an account?{" "}
          <Link href="/" className="text-violet-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
