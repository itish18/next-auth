"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { newPasswordSchema } from "@/schema";
import { AuthCard } from "../_components/auth-card";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, reset } from "@/actions";

import { loginFormSchema } from "@/schema";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { useSearchParams } from "next/navigation";

const NewPasswordPage = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = searchParams.get("token");

  const form = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    // startTransition(() => {
    //   reset(values)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setError(data.error);
    //       }

    //       if (data?.success) {
    //         form.reset();
    //         setSuccess(data.success);
    //       }
    //     })
    //     .catch(() => setError("Something went wrong"));
    // });
  };
  return (
    <div className="mx-auto max-w-md pt-40">
      <AuthCard
        callBackUrl="/login"
        callBackUrlText="Back to login"
        description="Enter a new password"
        isPending={isPending}
        showSocial={false}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}

            <Button type="submit" className="w-full" disabled={isPending}>
              Change password
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};

export default NewPasswordPage;
