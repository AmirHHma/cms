"use client";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./select";
import { SelectValue } from "@radix-ui/react-select";
import { redirect } from "next/navigation";

const Pagination = ({
  page,
  totalItems,
  divide,
}: {
  page: number;
  totalItems: number;
  divide: number;
}) => {
  let prevPage = Math.max(page - 1, 1);
  const [pageArr, setPageArr] = useState<number[]>([]);
  const TotalPages = Math.ceil(totalItems / divide);
  const nextPage = Math.min(page + 1, TotalPages);

  useEffect(() => {
    setPageArr(() => [page]);
    if (page - 1 > 0) {
      console.log("salam alaykom");
      setPageArr((prev) => [page - 1, ...prev]);
    }
    if (page - 2 > 0) {
      console.log("salam alaykom");
      setPageArr((prev) => [page - 2, ...prev]);
    }
    if (page < totalItems) {
      setPageArr((prev) => [...prev, page + 1, page + 2]);
    }
    setPageArr((prev) => prev.filter((item) => item <= TotalPages));
  }, [page]);

  function handleValueChange(value: string) {
    redirect(`?page=${value}`);
  }

  return (
    <div className=" flex gap-4 items-center justify-center  grow">
      <div className="rounded-md hover:bg-neutral-300 px-4 py-2 dark:hover:bg-neutral-800 cursor-pointer">
        <Link href={`?page=${prevPage}`}>&lt; Previous</Link>
      </div>

      <div className="flex gap-1">
        <Button
          asChild
          variant={"outline"}
          className={`p-2 px-3 rounded-md aspect-square cursor-pointer  hover:bg-neutral-300 dark:hover:bg-neutral-800 ${
            page < 4 && "hidden"
          }`}
        >
          <Link href={`?page=1`}>First</Link>
        </Button>
        {pageArr.map((item) => {
          return (
            <Button
              key={item}
              variant={"outline"}
              asChild
              className={`p-2 px-3 rounded-md aspect-square cursor-pointer  hover:bg-neutral-300 dark:hover:bg-neutral-800 ${
                item == page && "bg-neutral-200"
              }`}
            >
              <Link href={`?page=${item}`}>{item}</Link>
            </Button>
          );
        })}

        <Button
          asChild
          variant={"outline"}
          className={`p-2 px-3 rounded-md aspect-square cursor-pointer  hover:bg-neutral-300 dark:hover:bg-neutral-800 ${
            page == TotalPages && "hidden"
          }`}
        >
          <Link href={`?page=${TotalPages}`}>Last</Link>
        </Button>
        <Select onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder={`page ${page}`}></SelectValue>
          </SelectTrigger>

          <SelectGroup>
            <SelectContent>
              {Array.from({ length: TotalPages }, (_, i) => i + 1).map(
                (item) => (
                  <SelectItem key={item} value={`${item}`}>{item}</SelectItem>
                )
              )}
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>

      <div className="rounded-md hover:bg-neutral-300 px-4 py-2 dark:hover:bg-neutral-800 cursor-pointer">
        <Link href={`?page=${nextPage}`}>Next &gt; </Link>{" "}
      </div>
    </div>
  );
};

export default Pagination;
