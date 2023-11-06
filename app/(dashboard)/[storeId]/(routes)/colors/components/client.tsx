"use client";

import { ColorColumn, columns } from "./columns";
import { Loader2Icon, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface ColorClientProps {
  data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Your Colors (${data.length})`}
          description="Manage Colors for your items"
        />
        <Button
          onClick={() => {
            setLoading(true);
            router.push(`/${params.storeId}/colors/new`);
          }}
          disabled={loading}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          create new Color
          {loading && <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Separator />

      <Heading title="API" description="APi calls for colors" />

      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};
