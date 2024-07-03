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
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
const PasswordResets = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      router.push("/update_password");
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
            <h3 className="font-bold text-xl">Forgot Password?</h3>
            <p className="text-sm text-gray-500">
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
            <p className="text-sm text-gray-500">
              For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email.
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
              {isLoading ? (
                <Button type="submit" disabled className="w-full">
                  Loading...
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Send Reset Instructions
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default PasswordResets;
