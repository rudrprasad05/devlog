import { User, Tag, Product, Order, OrderDetails } from "@prisma/client";

export type UserType = User;

export type ProductType = Product & {
  tag: Tag;
};

export type OrderType = Order & {
  customer: User;
  orderDetails: OrderDetails;
};

export type TagType = Tag;
