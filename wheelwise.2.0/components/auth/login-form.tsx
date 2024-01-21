'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { CardWrapper } from '@/components/auth/card-wrapper'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoginSchema } from '@/lib/schemas'
import { Login } from '@/lib/server/auth'

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
