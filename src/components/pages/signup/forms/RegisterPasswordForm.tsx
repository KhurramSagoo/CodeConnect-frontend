import TextAlert from "@/components/alert/text-alert";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../../../../assets/X_logo_white.png";
import { useSignUpFormState } from "../signupFormContext";
import {
  auth,
  createUserWithEmailAndPassword,
} from "../../../../firebaseConfig/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { error } from "console";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Inputs = {
  password(arg0: string, password: any): unknown;
  image: any;
  coverimage: any;
  name: string;
  phone: string;
  email: string;
};

export default function RegisterPasswordForm() {
  const [isEmailAuth, setIsEmailAuth] = React.useState(false);
  const { onHandleNext, setFormData, setFormStatus, formData } =
    useSignUpFormState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // try {
    //   createUserWithEmailAndPassword(auth, formData.email, data.password);
    //   toast.success("New user registered!");
    // } catch (error) {
    //   toast.error(errorCode);
    //   toast.error(errorMessage);
    // }

    // console.log(data);

    const details = new FormData();
    details.append("email", formData.email);
    details.append("phone", formData.phone);
    details.append("name", formData.name);

    // console.log(data.password, formData.email, formData.name);

    //sending details to backend
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        {
          username: "khurram",
          email: "uafkhurram@gmail.com",
          password: "user1234546",
          image: data.image,
          coverimage: data.coverimage,
        },
        // {
        //   name: data.name,
        //   email: data.email,
        //   password: data.password,
        // },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      alert(response.data);

      // Log the response data
    } catch (error) {
      toast.error(error);
      toast.error(error.message);
      // alert(error.message);
      // console.error(error); // Log any errors that occur during the request
    }

    //if response is 200 then send go to new pages
    setFormData((prev) => ({ ...prev, ...data }));
    setFormStatus(200); //if any error then 500 or 400...
    onHandleNext();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-black text-slate-200 rounded-lg flex items-center flex-col min-h-screen justify-between p-5 py-10 space-y-10"
      >
        <div className="space-y-5 w-96">
          <div className="Logo flex items-center justify-center w-full">
            <img className="w-10" src={logo} alt="Logo" />
          </div>
          <h4 className="text-2xl font-bold mb-2">Add your password</h4>
          <div>
            <div className="input-group group focus-within:p-[0.70rem] focus-within:border-2 focus-within:border-blue-600 ">
              <input
                type="password"
                id="Password"
                className="input peer"
                required={true}
                {...register("password", {
                  required: true,
                  maxLength: 30,
                  minLength: 5,
                })}
              />
              <label
                htmlFor="Password"
                className="input-label group-focus-within:text-xs group-focus-within:text-blue-500 peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-1 group-focus-within peer-valid:-translate-y-1 group-focus-within:pl-2 peer-valid:pl-2"
              >
                Password
              </label>
            </div>
            {errors.password?.type === "required" && (
              <TextAlert alert="Name is required" />
            )}
            {errors.password?.type === "maxLength" && (
              <TextAlert alert="Name is too long" />
            )}
            {errors.password?.type === "minLength" && (
              <TextAlert alert="Name is too short" />
            )}
            <br />
            <Label htmlFor="picture">image</Label>
            <Input id="image" type="file" {...register("image")} />
            <br />
            <Label htmlFor="picture">coverimage</Label>
            <Input id="coverimage" type="file" {...register("coverimage")} />
          </div>

          <button
            className="bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center rounded-full py-1 h-10 w-full px-4 mb-1 shadow-md text-md font-bold"
            type="submit"
            // onClick={() => createUserHandle()}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
}
