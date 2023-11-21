'use client';


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
// WheelWise CRM 
// Authentication Form - Button
// By Danin Namiranian
//
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


///////////////////////// Import Files //////////

import React from 'react';
import clsx from 'clsx';

///////////////////////// Interface //////////

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean,
    children?: React.ReactNode,
    onClick?: () => void,
    secondry?: boolean,
    danger?: boolean,
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondry,
    danger,
    disabled
}) => {
    return(
        <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(`
        flex 
        justify-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        `, 
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondry ? "text-gray-900" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondry && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
        )}
        >
        {children}
        </button>
    );
}

export default Button