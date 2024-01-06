"use client";
import { UpdateSiteContent } from "@/actions/post";
import React, { useEffect, useState, useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "@/hooks/useDesigner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export function SaveFormBtn({ id }: { id: string }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const [ticking, setTicking] = useState(true);

  //   useEffect(() => {
  //     const timer = setInterval(() => startTransition(updateFormContent), 60000);
  //     return () => clearInterval(timer);
  //   }, []);

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateSiteContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}
