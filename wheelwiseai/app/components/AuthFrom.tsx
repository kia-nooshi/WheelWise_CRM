'use client';

import Input from "@/app/components/inputs/input";
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

                <Input lable="Test1" id="Test1" />
                <Input lable="Test2" id="Test2" />

                </form>

            </div>

        </div>
    );


}

export default AuthForm