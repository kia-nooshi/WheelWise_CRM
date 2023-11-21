'use client'

import clsx from 'clsx';
import React from 'react';
import { 
    FieldErrors, 
    FieldValues, 
    UseFormRegister 
} from 'react-hook-form';

interface InputProps {
    lable: string,
    id: string,
    type?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    error?:FieldErrors,
    disabled?:boolean;
}

const Input: React.FC<InputProps> = ({
    lable,
    id,
    type,
    required,
    register,
    error,
    disabled
}) => {
        return ( 
                <div>
                    <label 
                    className="
                        block
                        text-sm
                        leading-6
                        font-medium
                        text-gray-500
                    "
                    
                    htmlFor={id}

                    >
                        {lable}
                    </label>
                    <div className="mt-2">
                        <input 
                        id={id}
                        type={type}
                        autoComplete={id}
                        disabled={disabled}
                        { ... register(id, {required}) }
                        className="form-input"/>
                    </div>
                </div>
        );
    }

export default Input;