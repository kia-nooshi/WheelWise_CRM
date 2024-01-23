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
import { RegisterSchema } from '@/lib/schemas'
import Register from '@/lib/server/auth/register'

//
// IMPORT END
// -------------------------------------------------------------

export const RegisterForm = () => {
   const [error, setError] = useState<string | undefined>('')
   const [success, setSuccess] = useState<string | undefined>('')
   const [isPending, startTransion] = useTransition()

   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         email: '',
         password: '',
         name: '',
      },
   })

   const onSubmit = (valeus: z.infer<typeof RegisterSchema>) => {
      setError('')
      setSuccess('')

      startTransion(() => {
         Register(valeus).then((data) => {
            setError(data.error)
            setSuccess(data.success)
         })
      })
   }

   return (
      <CardWrapper
         headerLable='Create an account'
         backButtonLable='Already have an Account ?'
         backButtonHref='/sign-in'
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
               <div className='space-y-4'>
                  <FormField
                     control={form.control}
                     name='name'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder='John Doe'
                              />
                           </FormControl>
                           <FormMessage></FormMessage>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='email'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
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
                     name='password'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
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
                  Register
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}
