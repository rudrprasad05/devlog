"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdCalendarToday, MdOutbox } from "react-icons/md";
import { GetDate } from "../posts/AllPosts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { IconType } from "react-icons";

export const ReadMeMd = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-10 items-center">
          <h1 className="text-3xl">README.md</h1>
          <p className="text-muted-foreground">A brief overview and history</p>
        </div>

        <Link
          className={buttonVariants({ variant: "default" })}
          href={"/posts/readme"}
        >
          View README
        </Link>
      </div>
    </div>
  );
};
