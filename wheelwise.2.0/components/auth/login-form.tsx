'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { CardWrapper } from '@/import/comps-auth'
import {
   Button,
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Input,
} from '@/import/comps-ui'
import { LoginSchema } from '@/import/schemas'
import { Login } from '@/import/server'

//
// IMPORT END
// -------------------------------------------------------------

export const LoginForm = () => {
   const [error, setError] = useState<string | undefined>('')
   const [success, setSuccess] = useState<string | undefined>('')
   const [isPending, startTransion] = useTransition()

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: '',
         passwords: '',
      },
   })

   const onSubmit = (valeus: z.infer<typeof LoginSchema>) => {
      setError('')
      setSuccess('')

      startTransion(() => {
         Login(valeus).then((data) => {
            setError(data.error)
            setSuccess(data.success)
         })
      })
   }

   return (
      <CardWrapper
         headerLable='Welcome back'
         backButtonLable="Don't have an account ?"
         backButtonHref='sign-up'
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
               <div className='space-y-4'>
                  <FormField
                     control={form.control}
                     name='email'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>email</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder='John.doe@example.com'
                                 type='email'
                              />
                           </FormControl>
                           <FormMessage></FormMessage>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='passwords'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>password</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder='********'
                                 type='password'
                              />
                           </FormControl>
                           <FormMessage></FormMessage>
                        </FormItem>
                     )}
                  />
               </div>
               <Button disabled={isPending} typeof='submit' className='w-full'>
                  Login
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}
