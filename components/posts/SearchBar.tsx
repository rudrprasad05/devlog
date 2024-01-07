"use client";

import { PageProps } from "@/app/(site)/posts/page";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineSearch } from "react-icons/md";

export const SearchSchema = z.object({
  search: z
    .string()
    .min(2, { message: "Type atleast 3 characters" })
    .max(50, { message: "Search must be less than 50 characters" }),
});

const SearchBar = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const router = useRouter();

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: search || "",
    },
  });

  function onSubmit(data: z.infer<typeof SearchSchema>) {
    router.push(`/posts?search=${data.search}`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input autoComplete="off" placeholder="Search..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"outline"} type="submit" className="p-2">
          <MdOutlineSearch className={"w-4 h-4"} />
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
