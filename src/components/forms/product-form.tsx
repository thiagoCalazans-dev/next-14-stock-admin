"use client";
import { useForm, zodResolver } from "../../infra/hook-form";
import { schema } from "@/infra/schema";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/useToast";
import { createProductAction } from "@/actions/create-product-action";
import { Brand } from "@/domain/entities/brand";
import { Color } from "@/domain/color";
import { Size } from "@/domain/size";
import { Category } from "@/domain/category";
import { Combobox } from "../ui/combobox";

export const FormProductSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string(),
  code: schema.string().trim(),
  price: schema.string().transform((item) => Number(item)),
  brandId: schema.string(),
  categoryId: schema.string(),
  sizeId: schema.string(),
  colorId: schema.string(),
});

export type FormProduct = schema.infer<typeof FormProductSchema>;

interface ProductFormProps {
  initialData: FormProduct | null;
  brands: Brand[];
  colors: Color[];
  sizes: Size[];
  categories: Category[];
}
export function ProductForm({
  initialData,
  brands,
  categories,
  colors,
  sizes,
}: ProductFormProps) {
  const form = useForm<FormProduct>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: initialData || {
      name: "",
      brandId: "",
      categoryId: "",
      code: "",
      colorId: "",
      price: 0,
      sizeId: "",
    },
  });

  const { isSubmitting, errors } = form.formState;
  const { onError, onSuccess } = useToast();

  async function onSubmit(formValues: FormProduct) {
    try {
      await createProductAction(formValues);
      onSuccess("Producto Cadastrado com sucesso");
      form.reset();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:gap-2 md:grid-cols-2 py-2 ">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <Label>Código</Label>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Type"
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
                  <Label>Preço</Label>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Type"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:gap-2 md:grid-cols-2 py-2 ">
            <Combobox data={brands} form={form} label="Marcas" name="brandId" />
            <Combobox
              data={categories}
              form={form}
              label="Categorias"
              name="categoryId"
            />
          </div>
          <div className="grid md:gap-2 md:grid-cols-2 py-2 ">
            <Combobox data={sizes} form={form} label="Tamanho" name="sizeId" />
            <Combobox data={colors} form={form} label="Cores" name="colorId" />
          </div>
          <Button disabled={isSubmitting} className="w-full" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
