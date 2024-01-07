"use client";

import React from "react";
import { Button } from "../ui/button";
import { MdDeleteOutline, MdOutlineCheck } from "react-icons/md";
import { useSession } from "next-auth/react";
import { DeleteComment, ModerateComment } from "@/actions/comment";
import { CommentType } from "@/types";

const ModComments = ({ comment }: { comment: CommentType }) => {
  const session = useSession();
  if (session.data?.user.role != "admin") {
    return null;
  }

  const DeleteCommentFunction = async () => {
    console.log("fired");
    await DeleteComment({ id: comment.id });
  };

  const ModCommentFunction = async () => {
    console.log("fired");
    await ModerateComment({ id: comment.id });
  };

  return (
    <div>
      <Button onClick={() => ModCommentFunction()} className="">
        <MdOutlineCheck />
      </Button>
      <Button onClick={() => DeleteCommentFunction()} variant={"destructive"}>
        <MdDeleteOutline />
      </Button>
    </div>
  );
};

export default ModComments;
