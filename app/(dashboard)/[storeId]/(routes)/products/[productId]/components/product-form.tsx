"use client";

import * as z from "zod";

import { Category, Color, Image, Products, Size } from "@prisma/client";
import { CheckIcon, Loader2Icon, Trash } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import { useReducer, useState } from "react";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import Heading from "@/components/ui/Heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1),
  images: z
    .object({
      url: z.string(),
    })
    .array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Products & {
        images: Image[];
      })
    | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

interface State {
  openCategory: boolean;
  openColor: boolean;
  openSize: boolean;
}

interface Action {
  type:
    | "openCategory"
    | "openColor"
    | "openSize"
    | "closeCategory"
    | "closeColor"
    | "closeSize";
}

function reducer(state: State, action: Action) {
  const { type } = action;

  switch (type) {
    case "openCategory":
      return { ...state, openCategory: true };
    case "openColor":
      return { ...state, openColor: true };
    case "openSize":
      return { ...state, openSize: true };
    case "closeCategory":
      return { ...state, openCategory: false };
    case "closeColor":
      return { ...state, openColor: false };
    case "closeSize":
      return { ...state, openSize: false };
    default:
      return state;
  }
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  colors,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, {
    openCategory: false,
    openColor: false,
    openSize: false,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "product updated." : "product created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error(`Something went wrong`);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("product deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this product first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Images </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <Popover
                    open={state.openCategory}
                    onOpenChange={(open) => {
                      if (open) {
                        dispatch({ type: "openCategory" });
                      } else {
                        dispatch({ type: "closeCategory" });
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            " flex h-9  w-full  rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (billboard) => billboard.id === field.value
                              )?.name
                            : "Select a Category"}
                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search categories..."
                          className="h-9"
                        />
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((billboard) => (
                            <CommandItem
                              value={billboard.name}
                              key={billboard.id}
                              onSelect={() => {
                                form.setValue("categoryId", billboard.id);
                                dispatch({ type: "closeCategory" });
                              }}
                            >
                              {billboard.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  billboard.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>

                  <Popover
                    open={state.openSize}
                    onOpenChange={(open) => {
                      if (open) {
                        dispatch({ type: "openSize" });
                      } else {
                        dispatch({ type: "closeSize" });
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            " flex h-9  w-full  rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? sizes.find((item) => item.id === field.value)
                                ?.name
                            : "Select a Size"}
                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search sizes..."
                          className="h-9"
                        />
                        <CommandEmpty>No size found.</CommandEmpty>
                        <CommandGroup>
                          {sizes.map((item) => (
                            <CommandItem
                              value={item.name}
                              key={item.id}
                              onSelect={() => {
                                form.setValue("sizeId", item.id);
                                dispatch({ type: "closeSize" });
                              }}
                            >
                              {item.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  item.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>

                  <Popover
                    open={state.openColor}
                    onOpenChange={(open) => {
                      if (open) {
                        dispatch({ type: "openColor" });
                      } else {
                        dispatch({ type: "closeColor" });
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            " flex h-9  w-full  rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <>
                              <div className="flex items-center gap-x-2">
                                <div
                                  className="w-4 h-4 border rounded-full"
                                  style={{
                                    backgroundColor: colors.find(
                                      (item) => item.id === field.value
                                    )?.value,
                                  }}
                                />
                                {
                                  colors.find((item) => item.id === field.value)
                                    ?.name
                                }
                              </div>
                            </>
                          ) : (
                            "Select a color"
                          )}
                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search colors..."
                          className="h-9"
                        />
                        <CommandEmpty>No color found.</CommandEmpty>
                        <CommandGroup>
                          {colors.map((item) => (
                            <CommandItem
                              value={item.name}
                              key={item.id}
                              onSelect={() => {
                                form.setValue("colorId", item.id);
                                dispatch({ type: "closeColor" });
                              }}
                            >
                              <div className="flex items-center">
                                <div
                                  className="w-4 h-4 mr-2 rounded-full"
                                  style={{ backgroundColor: item.value }}
                                />
                                {item.name}
                              </div>
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  item.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row p-4 mt-4 space-x-3 space-y-0 border rounded-md item-start">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 leading-none ">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      Featured products will be displayed on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row p-4 mt-4 space-x-3 space-y-0 border rounded-md item-start">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 leading-none ">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      Archived products will not be displayed on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}

            {loading && <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />}
          </Button>
        </form>
      </Form>
    </>
  );
};
