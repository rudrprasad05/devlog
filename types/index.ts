import { Category, Likes, Post, User } from "@prisma/client";

export type UserType = User;

export type PostType = Post & {
  category: Category;
  comments: Comment;
  author: User;
  likes: Likes;
};

export type CategoryType = Category;
