"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "../build/FormElements";

function FormSubmitComponent({ content }: { content: FormElementInstance[] }) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  return (
    <div className=" text-justify">
      <div className="flex flex-col gap-4 flex-grow bg-background overflow-y-auto ">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FormSubmitComponent;
