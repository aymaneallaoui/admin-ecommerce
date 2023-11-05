"use client";

import { CategoriesColumns, columns } from "./columns";
import { Loader2Icon, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface CategoriesClientProps {
  data: CategoriesColumns[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Your Categories (${data.length})`}
          description="Manage Categories for your Store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/categories/new`);
            setLoading(true);
          }}
          disabled={loading}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          create new Category
          {loading && <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Separator />

      <Heading title="API" description="APi calls for categories" />

      <ApiList entityName="categories" entityIdName="categoriesId" />
    </>
  );
};
