"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { NewCategoryForm, NewCategoryType } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MdLabelImportantOutline,
  MdOutlineAddLocationAlt,
  MdOutlineCheck,
} from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const NewCategoryButton = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<NewCategoryType>({
    resolver: zodResolver(NewCategoryForm),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const handleImageUpload = async () => {
    setloadingImage(true);

    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          toast.success("Image Uploaded to Cloud");
          setloadingImage(false);
          setFormReadyToUpload(true);
        })
        .catch((e) => {
          toast.error("Error. Contact Site Admin");
        });
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  function onSubmit(data: NewCategoryType) {
    data.imageUrl = `https://mctechfiji.s3.amazonaws.com/devlog/${file?.name}`;
    axios
      .post(`/api/category`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Tag Created Successfully");
          setOpen(false);
          router.refresh();
        }
      })
      .catch((error) => {
        toast.error("An Error Occured");
        console.log("TAG NEW - NewTagButton.tsx", error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative bg-card p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Category</div>
          <div className="absolute bottom-5 right-5">
            <MdLabelImportantOutline className="group-hover:h-28 group-hover:w-28 group-hover:fill-muted-foreground/20 duration-200  w-16 h-16 stroke fill-muted-foreground" />
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>Create New Category</DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter tag name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-10">
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
                <Button
                  className="flex items-center"
                  type="button"
                  onClick={() => handleImageUpload()}
                >
                  {loadingImage && (
                    <FaSpinner className={"animate-spin mr-3"} />
                  )}
                  {!formReadyToUpload && "Upload"}
                  {formReadyToUpload && (
                    <>
                      <MdOutlineCheck className={"mr-3"} />
                      Uploaded
                    </>
                  )}
                </Button>
              </div>

              <Button disabled={!formReadyToUpload} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryButton;
