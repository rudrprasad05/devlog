import { Category, Comment, Likes, Post, User } from "@prisma/client";

export type UserType = User;

export type PostType = Post & {
  category: Category;
  comments: CommentType[];
  author: User;
  likes: Likes[];
};

export type OnlyPostType = Post;

export type CommentType = Comment & {
  user: User;
};

export type CategoryType = Category;
