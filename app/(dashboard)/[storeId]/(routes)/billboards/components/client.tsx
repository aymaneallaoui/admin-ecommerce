"use client";

import { BillboardColumn, columns } from "./columns";
import { Loader2Icon, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Your Billboards (${data.length})`}
          description="Manage billboards for your client"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
            setLoading(true);
          }}
          disabled={loading}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          create new Billboard
          {loading && <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="label" />

      <Separator />

      <Heading title="API" description="APi calls for billboards" />

      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
