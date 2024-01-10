import Link from "next/link";
import React from "react";
import { Card, CardDescription, CardFooter } from "../ui/card";

const Footer = () => {
  return (
    <Card className="">
      <div className="w-4/5 mx-auto py-8 flex justify-around">
        <div className="flex flex-col gap-5">
          <h1 className="text-primary text-2xl">Quick Links</h1>
          <div className="flex flex-col gap-2">
            <Link href={"/posts"}>Posts</Link>
            <Link href={"/posts/659e316b7ecda7be4880d695"}>About</Link>
            <Link href={"#contact"}>Contact</Link>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-primary text-2xl">My Favourites</h1>
          <div className="flex flex-col gap-2">
            <Link href={"/posts/659e316b7ecda7be4880d695"}>Readme</Link>
            <Link href={"/posts/659e316b7ecda7be4880d695"}>React</Link>
            <Link href={"/posts/ecommerce"}>Ecommerce</Link>
          </div>
        </div>
      </div>
      <CardFooter>
        <CardDescription className="text-center w-full">
          © {new Date().getFullYear().toString()} Rudr Prasad | Powered by
          <span className="ml-1 cursor-pointer text-primary underline-offset-4 hover:underline">
            Procyon
          </span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Footer;
