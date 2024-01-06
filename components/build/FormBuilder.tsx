"use client";

import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "@/hooks/useDesigner";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import PublishFormBtn, { UnPublishFormBtn } from "./PublishFormBtn";
import { SaveFormBtn } from "./SaveFormBtn";
import { PostType } from "@/types";

function FormBuilder({ form }: { form: PostType }) {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content || "");
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col min-h-screen w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <div className="flex gap-5 items-center">
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => router.back()}
            >
              <HiMiniArrowLongLeft className={"w-6 h-6 stroke-primary mr-3"} />
              Back Home
            </Button>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Post:</span>
              <span>{form.name}</span>
            </h2>
            <Status status={form.published} />
          </div>

          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            <SaveFormBtn id={form.id} />
            <PublishForm post={form} />
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative min-h-screen bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;

const Status = ({ status }: { status: boolean }) => {
  if (status)
    return (
      <div className="flex gap-3 items-center">
        <div className="rounded-full h-2 w-2 bg-primary" />
        <span className="text-sm text-primary">Published</span>
      </div>
    );

  if (!status)
    return (
      <div className="flex gap-3 items-center">
        <div className="rounded-full h-2 w-2 bg-red-500" />
        <span className="text-sm text-red-500">Draft</span>
      </div>
    );
};

const PublishForm = ({ post }: { post: PostType }) => {
  if (post.published) return <UnPublishFormBtn id={post.id} />;
  else if (!post.published) return <PublishFormBtn id={post.id} />;
  else return null;
};
