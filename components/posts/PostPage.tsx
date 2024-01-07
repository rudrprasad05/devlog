"use client";

import { PostType } from "@/types";
import React, { useEffect, useState } from "react";
// import CommentCard from "./CommentCard";
// import PostComments from "./PostComments";
// import AuthorCard from "@/components/global/AuthorCard";
import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import { GiSpiderWeb } from "react-icons/gi";
import { FormElementInstance } from "../build/FormElements";
import PostSection from "./PostSection";
import AuthorCard from "./AuthorCard";
import PostComments from "../comments/PostComments";
import CommentCard from "../comments/CommentCard";

interface props {
  data: PostType;
}

// const checkDisable = (
//   data: PostType,
//   user: any,
//   setDisableCommentSubmit: any
// ) => {
//   data.comments?.map((commentData) => {
//     if (user?.id == commentData.userId && !commentData.isModerated)
//       setDisableCommentSubmit(true);
//   });
// };

const PostPage: React.FC<props> = ({ data }) => {
  const [disableCommentSubmit, setDisableCommentSubmit] = useState(false);
  const [domLoaded, setDomLoaded] = useState(true);

  const session = useSession();
  const user = session.data?.user;

  const postContent = JSON.parse(data.content) as FormElementInstance[];

  // useEffect(() => {
  //   data.comments?.map((commentData) => {
  //     if (user?.id == commentData.userId && !commentData.isModerated)
  //       setDisableCommentSubmit(true);
  //   });

  //   setDomLoaded(true);
  // }, []);

  return (
    <>
      {domLoaded && (
        <main className="">
          <PostSection content={postContent} />
          <AuthorCard post={data} />
          <section>
            {domLoaded && (
              <PostComments
                disableButtonProps={disableCommentSubmit}
                data={data}
                user={user}
              />
            )}

            {data.comments?.map((commentData) => {
              if (user?.id == commentData.userId && !commentData.isModerated)
                return (
                  <CommentCard
                    key={commentData.id}
                    data={commentData}
                    user={user}
                  />
                );
              else if (commentData.isModerated)
                return (
                  <CommentCard
                    key={commentData.id}
                    data={commentData}
                    user={user}
                  />
                );
            })}
          </section>

          {data.comments.length < 1 && (
            <div className="text-slate-700 flex items-center gap-5">
              <GiSpiderWeb className={"w-16 h-16"} />
              No comments yet. Start a new Converstaion
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default PostPage;
