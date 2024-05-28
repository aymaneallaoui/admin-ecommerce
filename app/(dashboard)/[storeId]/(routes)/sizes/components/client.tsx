"use client";

import { Loader2Icon, PlusCircle } from "lucide-react";
import { SizeColumn, columns } from "./columns";
import { useParams, useRouter } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Your Sizes (${data.length})`}
          description="Manage Sizes for your Store"
        />
        <Button
          onClick={() => {
            setLoading(true);
            router.push(`/${params.storeId}/sizes/new`);
          }}
          disabled={loading}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          create new Size
          {loading && <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Separator />

      <Heading title="API" description="APi calls for Sizes" />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
