import prismadb from "@/lib/prismadb";
import { CategoriesClient } from "./components/client";

import { format } from "date-fns";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

async function BillboardsPage({ params }: BillboardsPageProps) {
  const Categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },

    include: {
      billboard: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = Categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col ">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
}

export default BillboardsPage;
