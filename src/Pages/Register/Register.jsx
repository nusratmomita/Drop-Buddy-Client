import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Authentication/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import UseCommonAxiosAPI from "../../CustomHooks/UseCommonAxiosAPI";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {handleRegister , handleGoogleAuth , handleUpdateProfile } = useContext(AuthContext);

  const axiosApi = UseCommonAxiosAPI();

  const navigate = useNavigate();

  const [profileImage , setProfileImage] = useState('');


  const handleRegisterForm = (data) => {
    // console.log(data);
    const email = data.email;
    const password = data.password;
    
    handleRegister(email,password)
      .then(async()=>{
        // const user = result.user;

        // getting user info
        const userInfo = {
          email : data.email,
          role : 'user',// default role
          created_at : new Date().toISOString(),
          last_logged_in : new Date().toISOString()
        }

        const res = await axiosApi.post("/users" , userInfo);
        console.log(res.data);

        const updateProfile = {
          displayName:data.name,
          photoURL: profileImage
        }
        // console.log(updateProfile)

        handleUpdateProfile(updateProfile)
        .then(()=>{
          // console.log("Profile updated done")
          navigate('/')
        })
        .catch(()=>{
          // console.log(error)
        })
      })
    }

    const handleGoogle = () => {
      handleGoogleAuth()
      .then(async (result)=>{
        const user = result.user;
        console.log(user);

        const userInfo = {
          email : user.email,
          role : 'user',
          created_at : new Date().toISOString(),
          last_logged_in : new Date().toISOString()
        }
        const res = await axiosApi.post("/users" , userInfo);
        console.log(res.data);

        toast.success("You've successfully created an account!");
        setTimeout(()=>{
          navigate('/');
        },1500)
      })
      .catch((error)=>{
        console.log(error)
        toast.error("Google sign-in failed. Please try again.")
      })
    }
    
    const handlePhotoUpload = async(e) => {
      const image = e.target.files[0];
      // console.log(image);

      const formData = new FormData();
      formData.append("image" , image);
      
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      // console.log(imageUploadUrl)

      const res = await axios.post(imageUploadUrl,formData);
      setProfileImage(res.data.data.url);
    }


  return (
    <div className="hero min-h-screen">
      <div className="hero-content w-full rounded-3xl mt-20 p-25  flex-col justify-evenly lg:flex-row">
        <div className="p-2 rounded-2xl w-full max-w-lg shrink-0 shadow-2xl">
          <div className="p-6 flex flex-col max-w-lg rounded-2xl sm:p-10 bg-gray-50 text-gray-800">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold underline">Register</h1>
              <p className="text-lg dark:text-gray-600">
                Create an Account to Continue
              </p>
              <div className="divider"></div>
            </div>
            <form
              className="space-y-12 "
              onSubmit={handleSubmit(handleRegisterForm)}
            >
              <div className="space-y-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                <div>
                  <label htmlFor="name" className="block mb-2 text-3xl">
                    Name
                  </label>
                  <input
                    {...register("name", {
                      required: true,
                    })}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 text-3xl"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-700">Password is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-3xl">
                    Enter Email
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                    })}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 text-3xl"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-700">Password is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="photoURL" className="block mb-2 text-3xl">
                    Photo URL
                  </label>
                  <input
                    onChange={handlePhotoUpload}
                    type="file"
                    name="photoURL"
                    id="photoURL"
                    placeholder="photo URL"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 text-3xl"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-3xl">
                      Enter Password
                    </label>
                  </div>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 text-3xl"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-700">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-700">
                      Password must be 6 characters long!
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full px-8 py-3 text-3xl font-semibold rounded-md bg-[#CAEB66] text-black"
                  >
                    Register
                  </button>
                </div>
                <h1 className="text-center text-2xl font-bold">Or</h1>
                <button
                  type="button"
                  onClick={handleGoogle}
                  className="btn whitespace-nowrap w-full bg-white text-black text-xl border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="25"
                    height="25"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Register with Google
                </button>
                <div className="divider"></div>
                <p className="whitespace-nowrap px-6 text-xl text-center dark:text-gray-600">
                  Already Have An Account?
                  <NavLink className="underline text-purple-700" to="/login">
                    {" "}
                    Login here
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
