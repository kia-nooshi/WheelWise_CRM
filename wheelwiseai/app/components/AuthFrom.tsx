'use client';

// Import Form Elements
import Input from "@/app/components/Forms/Input";
import Button from "@/app/components/Forms/Button";
import AuthSocialButton from "@/app/components/Forms/AuthSocialButton";

// Import React Icons


// Import React Forms
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = "LOGIN" | "REGISTER";


const AuthForm = () => {
    
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
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
            // Ill add the register later here
        }

        if (variant === 'LOGIN')
        {
            // Ill add the login here later
        }
    }

    return(

        // Login element here
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    {variant ==='REGISTER' && (<Input id="name" lable="Name" register={register} errors={errors} />) }
                    <Input id="email" lable="Email" register={register} errors={errors} />
                    <Input id="password" lable="Password" register={register} errors={errors} />

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

                    <AuthSocialButton/>
                </form>

            </div>

        </div>
    );


}

export default AuthForm