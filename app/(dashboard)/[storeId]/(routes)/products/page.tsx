import { ProductsClient } from "./components/client";
import { ProductsColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import prismadb from "@/lib/prismadb";

interface ProductsPageProps {
  params: {
    storeId: string;
  };
}

async function ProductsPage({ params }: ProductsPageProps) {
  const Products = await prismadb.products.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductsColumn[] = Products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
}

export default ProductsPage;
