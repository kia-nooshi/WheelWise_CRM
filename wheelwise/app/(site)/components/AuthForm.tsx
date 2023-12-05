'use client';


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
// WheelWise CRM 
// Authentication Form
// By Danin Namiranian
//
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


///////////////////////// Import Files //////////

// Import Form Elements
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub , BsGoogle } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

///////////////////////// React Form Functions //////////

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            toast.success('Authenticated!');
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {

        if (variant === 'LOGIN'){
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }

    },[variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues :{
            name:'',
            email:'',
            password:''
        }
    });

    // Function - submit the data

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true);

        if ( variant === 'REGISTER') 
        {
            axios.post('/api/register', data)
            .catch(() => toast.error('Somthing went wrong'))
            .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
              ...data,
              redirect: false
            })
            .then((callback) => {
              if (callback?.error) {
                toast.error('Invalid credentials!');
              }

              if (callback?.ok) {
                toast.success('login success');
              }

            })
            .finally(() => setIsLoading(false))
        }

    }

    const socialAction = (action: string) => {

        setIsLoading(true);
        toast.error('SocialAuth comming soon!');
        /*
        signIn(action, { redirect: false })
          .then((callback) => {
            if (callback?.error) {
              toast.error('Invalid credentials!');
            }
    
            if (callback?.ok) {
              router.push('/conversations')
            }
          })
          .finally(() => setIsLoading(false));
        */
    }

    
///////////////////////// Form HTML //////////

    return(

        // Login element here
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    {variant ==='REGISTER' && (<Input id="name" label="Name" register={register} errors={errors} />) }
                    <Input id="email" label="Email" register={register} errors={errors} />
                    <Input id="password" label="Password"  register={register} errors={errors} />

                    <Button disabled={isLoading} fullWidth type="submit">{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2 w-full">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
                    </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>{variant === 'LOGIN' ? "New to the WheelWise" : "Already have an account"}</div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">{variant === 'LOGIN' ? "Create an account" : "Login"}</div>
                    </div>
                    
                </form>

            </div>

        </div>
    );


}

export default AuthForm