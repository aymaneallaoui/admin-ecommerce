import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";

import { format } from "date-fns";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

async function BillboardsPage({ params }: BillboardsPageProps) {
  const Billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards = Billboards.map((Billboard) => ({
    id: Billboard.id,
    label: Billboard.label,
    createdAt: format(Billboard.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}

export default BillboardsPage;
