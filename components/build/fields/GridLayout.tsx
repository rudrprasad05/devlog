"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "@/hooks/useDesigner";
import { CiCreditCard2 } from "react-icons/ci";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { MdGridOn } from "react-icons/md";
import { Input } from "@/components/ui/input";

const type: ElementsType = "GridLayout";

const extraAttributes = {
  text: "Text here",
  cardText: "Card",
};

const propertiesSchema = z.object({
  text: z.string(),
  cardText: z.string(),
});

export const GridLayoutFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdGridOn,
    label: "Grid Layout",
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
  const { text, cardText } = element.extraAttributes;
  var arr: string[] = [];
  for (let i = 0; i < parseInt(text); i++) {
    arr.push("a");
  }
  return (
    <div className={`flex justify-between w-full h-24 bg-red-500`}>
      {arr.map(() => (
        <Card>
          <CardTitle>{cardText}</CardTitle>
        </Card>
      ))}
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { text, cardText } = element.extraAttributes;
  var arr: string[] = [];
  for (let i = 0; i < parseInt(text); i++) {
    arr.push("a");
  }
  return (
    <div className={`flex justify-between w-full h-24 bg-red-500`}>
      {arr.map(() => (
        <Card>
          <CardTitle>{cardText}</CardTitle>
        </Card>
      ))}
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
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      text: element.extraAttributes.text,
      cardText: element.extraAttributes.cardText,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { text, cardText } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text,
        cardText,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
