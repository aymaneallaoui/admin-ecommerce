"use client";

import { Loader2Icon, PlusCircle } from "lucide-react";
import { ProductsColumn, columns } from "./columns";
import { useParams, useRouter } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface ProductsClientProps {
  data: ProductsColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Your Products (${data.length})`}
          description="Manage products for your client"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/products/new`);
            setLoading(true);
          }}
          disabled={loading}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          create new Products
          {loading && <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Separator />

      <Heading title="API" description="APi calls for products" />

      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
