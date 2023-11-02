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
<<<<<<< HEAD
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
=======
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
>>>>>>> 43c0864dbed99392fae04d79833cad4157c9f86b

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

=======
>>>>>>> 43c0864dbed99392fae04d79833cad4157c9f86b
  const oncopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied to clipboard");
  };
<<<<<<< HEAD
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
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
          <DropdownMenuItem
            className="transition-colors bg-destructive focus:bg-destructive/80 focus:cursor-pointer "
            onClick={() => setOpen(true)}
          >
            <Trash2Icon className="w-4 h-4 mr-2 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
=======

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
>>>>>>> 43c0864dbed99392fae04d79833cad4157c9f86b
  );
};
