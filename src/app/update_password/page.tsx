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
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password minimum 8 character"),
      confirmPassword: Yup.string()
        .required("Confirm password is Required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      toast.success("Update Password Success");
    },
  });
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
            <h3 className="font-bold text-xl">Update Password</h3>
            <p className="text-sm text-gray-500">
              Please enter your new password
            </p>
          </CardHeader>
          <CardContent>
            <form
              className="flex mb-4 flex-col gap-3"
              onSubmit={formik.handleSubmit}
              action=""
            >
              <Label htmlFor="Password">Password</Label>
              <div className="relative">
                {showPassword ? (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    variant="ghost"
                    className="absolute p-0 px-2 h-fit hover:bg-white bg-white md:translate-x-[17.5rem] translate-x-[13.5rem] translate-y-2 text-slate-500"
                  >
                    <Eye size={25} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    variant="ghost"
                    className="absolute p-0 px-2 h-fit hover:bg-white bg-white md:translate-x-[17.5rem] translate-x-[13.5rem] translate-y-2 text-slate-500"
                  >
                    <EyeSlash size={25} />
                  </Button>
                )}
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your new password"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              ) : null}
              <Label htmlFor="Password">Confirm Password</Label>
              <div className="relative">
                {showConfirmPassword ? (
                  <Button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                    variant="ghost"
                    className="absolute p-0 px-2 h-fit hover:bg-white bg-white md:translate-x-[17.5rem] translate-x-[13.5rem] translate-y-2 text-slate-500"
                  >
                    <Eye size={25} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                    variant="ghost"
                    className="absolute p-0 px-2 h-fit hover:bg-white bg-white md:translate-x-[17.5rem] translate-x-[13.5rem] translate-y-2 text-slate-500"
                  >
                    <EyeSlash size={25} />
                  </Button>
                )}
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Enter confirmation password"
                />
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;
