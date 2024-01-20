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
import { RegisterSchema } from '@/import/schemas'
import { Register } from '@/import/server'

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
         passwords: '',
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
                     name='passwords'
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
