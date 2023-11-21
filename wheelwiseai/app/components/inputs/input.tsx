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
    error:FieldErrors,
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
                    <label>{lable}</label>
                </div>
        );
    }

export default Input;