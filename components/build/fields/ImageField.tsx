"use client";

import { Label } from "@/components/ui/label";
import useDesigner from "@/hooks/useDesigner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

const type: ElementsType = "ImageField";

const extraAttributes = {
  text: "https://mctechfiji.s3.amazonaws.com/devlog/NoimageSelected",
};

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

export const ImageFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsImage,
    label: "Image Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;
  return (
    <div className="flex gap-2 w-full">
      <Label className="text-muted-foreground">Image field</Label>
      <Image width={100} height={100} alt={text} src={`${text}`} />
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;
  return (
    <div className="relative w-full h-[550px]">
      <Image
        fill
        sizes="(max-width: 768px) 100vw, 700px"
        className="object-cover"
        alt={text}
        src={`${text}`}
      />
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const [loadingImage, setLoadingImage] = useState(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState(false);

  const [file, setFile] = useState<File>();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      text: element.extraAttributes.text,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  async function applyChanges(values: propertiesFormSchemaType) {
    let filename = "";
    await handleImageUpload().then(
      () =>
        (filename =
          `https://mctechfiji.s3.amazonaws.com/devlog/${file?.name}` as string)
    );

    // const { text } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text: filename,
      },
    });
  }

  const handleImageUpload = async () => {
    if (!file) return;
    setLoadingImage(true);
    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          setLoadingImage(false);
          setFormReadyToUpload(true);
          // toast.success("Image Uploaded to Cloud");
        })
        .catch((e) => {
          console.log(e);
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=""
      >
        <div className="flex flex-col">
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
            {!formReadyToUpload && loadingImage && "Uploading"}
            {formReadyToUpload && "Uploaded"}
            {!formReadyToUpload && !loadingImage && "Upload"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
