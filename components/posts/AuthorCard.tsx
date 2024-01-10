import { PostType, UserType } from "@/types";
import { formatDistance } from "date-fns";
import React from "react";
import AvatarComponent from "../navbar/AvatarComponent";

interface props {
  user: UserType;
}

const AuthorCard = ({ post }: { post: PostType }) => {
  return (
    <>
      <h1 className="pt-10 pb-3 text-2xl">Written By</h1>
      <div className="flex flex-col gap-3 md:gap-0 md:flex md:flex-row md:justify-between md:items-center">
        <AuthorCardElement user={post.author} />
        <div className="text-sm italic text-primary">
          {formatDistance(post.createdAt, new Date(), {
            addSuffix: true,
          })}
        </div>
      </div>
    </>
  );
};

const AuthorCardElement: React.FC<props> = ({ user }) => {
  const fallback = user.name.slice(0, 2).toUpperCase();

  return (
    <div className="flex gap-5 items-center">
      <div>
        <AvatarComponent
          fallback={fallback}
          src={user.image == null ? "/user.jpeg" : user.image}
        />
      </div>
      <div>
        <h1>{user.name}</h1>
      </div>
    </div>
  );
};

export default AuthorCard;
