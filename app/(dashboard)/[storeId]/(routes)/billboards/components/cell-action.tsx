"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit2Icon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const oncopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied to clipboard");
  };

  console.log(data);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className=" hover:cursor-pointer"
          onClick={() =>
            router.push(`/${params.storeId}/billboards/${data.id}`)
          }
        >
          <Edit2Icon className="w-4 h-4 mr-2 " />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer" onClick={oncopy}>
          <Copy className="w-4 h-4 mr-2 " />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="transition-colors bg-destructive focus:bg-destructive/80 focus:cursor-pointer ">
          <Trash2Icon className="w-4 h-4 mr-2 " />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
