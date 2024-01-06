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

import { NewPostForm, NewPostType } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MdHeadset,
  MdLabelImportantOutline,
  MdOutlineAddLocationAlt,
  MdOutlineCheck,
} from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { CategoryType } from "@/types";
import { useSession } from "next-auth/react";

interface props {
  category: CategoryType[];
}

// TODO make sure the image name is unique by appending date to the end if not previous image will be deleted

const NewPostButton: React.FC<props> = ({ category }) => {
  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);

  const form = useForm<NewPostType>({
    resolver: zodResolver(NewPostForm),
    defaultValues: {
      name: "",
      authorId: session.data?.user.id,
    },
  });

  const tag = form.watch("category");

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
          setloadingImage(false);
          setFormReadyToUpload(true);
          toast.success("Image Uploaded to Cloud");
        })
        .catch((e) => {
          toast.error("Error. Contact Site Admin");
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  function onSubmit(data: NewPostType) {
    data.imageUrl = `https://mctechfiji.s3.amazonaws.com/devlog/${file?.name}`;
    data.authorId = session.data?.user.id;
    console.log(data);
    axios
      .post(`/api/post`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Product Created Successfully");
          setOpen(false);
          router.refresh();
        }
      })
      .catch((error) => {
        toast.error("An Error Occured");
        console.log("PRODUCT NEW - NewTagButton.tsx", error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative bg-card p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Post</div>
          <div className="absolute bottom-5 right-5">
            <MdHeadset className="group-hover:h-28 group-hover:w-28 group-hover:fill-muted-foreground/20 duration-200  w-16 h-16 stroke fill-muted-foreground" />
            {/* <IoPersonAddOutline className="group-hover:stroke-primary w-16 h-16 stroke stroke-muted-foreground" /> */}
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
          <DialogDescription>Create New Product</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Product Name</FormLabel>
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
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {category?.map((i) => (
                          <SelectItem key={i.id} value={i?.id}>
                            {i.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
                {loadingImage && <FaSpinner className={"animate-spin mr-3"} />}
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
      </DialogContent>
    </Dialog>
  );
};

export default NewPostButton;
