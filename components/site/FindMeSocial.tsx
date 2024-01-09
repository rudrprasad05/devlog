"use client";

import React from "react";
import { IconType } from "react-icons";
import { MdOutbox } from "react-icons/md";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  FaExternalLinkAlt,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaChessKnight,
} from "react-icons/fa";
import { GetDate } from "../posts/AllPosts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface Data {
  name: string;
  icon: IconType;
  link: string;
  linktext: string;
  username: string;
}

const data: Data[] = [
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/not_rudr/?hl=en",
    linktext: "DM me",
    username: "@not_rudr",
  },
  {
    name: "Github",
    icon: FaGithub,
    link: "https://github.com/rudrprasad05",
    linktext: "View Repo",
    username: "rudrprasad05",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    link: "",
    linktext: "Boomers Only",
    username: "@not_rudr",
  },
  {
    name: "Chess.com",
    icon: FaChessKnight,
    link: "https://www.chess.com/member/rudrprasad05",
    linktext: "1v1 me",
    username: "prasadrudr05",
  },
];

const FindMeSocial = () => {
  return (
    <div id="#contact">
      <div>
        <h1 className="text-3xl ">Got a quesiton?</h1>
        <p className="text-muted-foreground py-2">
          Hit me up on any of these platforms. Or send a git pull request 🤣
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 py-8">
        {data.map((item) => (
          <SocialCard key={item.link} item={item} />
        ))}
      </div>
    </div>
  );
};

const SocialCard = ({ item }: { item: Data }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <item.icon className="w-12 h-12 " />
        <CardTitle className="truncate">{item.name}</CardTitle>
      </CardHeader>

      <CardContent className="">
        <Link href={item.link}>
          <Badge variant={"outline"}>{item.username}</Badge>
        </Link>
      </CardContent>

      <CardFooter>
        <Link
          href={`/posts/`}
          className={`flex gap-3 items-center text-primary underline-offset-4 hover:underline`}
        >
          <FaExternalLinkAlt className={"fill-primary stroke-primary"} />
          {item.linktext}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FindMeSocial;
