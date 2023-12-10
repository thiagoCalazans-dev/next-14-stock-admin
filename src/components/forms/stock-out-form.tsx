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
import { coerce } from "zod";
import { adapterStock } from "@/adapter/stock-adapter";
import { stockOutAction } from "@/actions/stock-out";

export const FormStockOutSchema = schema.object({
  id: schema.string().optional(),
  productCode: schema.string().trim(),
  quantity: schema.string(),
  unitPrice: schema.coerce.number(),
  date: schema.string().transform((string) => {
    return new Date(string).toISOString();
  }),
  discount: coerce.number().default(0),
});

export type FormStockOut = schema.infer<typeof FormStockOutSchema>;

export interface StockOutFormProps {
  initialData: {
    productCode: string;
    unitPrice: number;
  };
}

export function StockOutForm({ initialData }: StockOutFormProps) {
  const form = useForm<FormStockOut>({
    resolver: zodResolver(FormStockOutSchema),
    defaultValues: {
      productCode: initialData.productCode,
      quantity: "1",
      date: "",
      unitPrice: initialData.unitPrice,
      discount: 0,
    },
  });

  const { isSubmitting, errors } = form.formState;
  const { onError, onSuccess } = useToast();

  async function onSubmit(formValues: FormStockOut) {
    try {
      const stockOut = adapterStock.formStockOutToAction(formValues);
      await stockOutAction(stockOut);
      onSuccess("Saída realizada com sucesso");
      form.reset();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  const price = form.watch("unitPrice");
  const quantity = form.watch("quantity");
  const discount = form.watch("discount");

  const finalPrice =
    Number(price) * Number(quantity) -
    Number(price) * Number(quantity) * (discount / 100);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="grid grid-cols-2 gap-3 items-center">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <Label>Data</Label>
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
            name="productCode"
            render={({ field }) => (
              <FormItem>
                <Label>Código do Produto</Label>
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
        </div>
        <div className="grid grid-cols-2 gap-3 items-center">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <Label>Quantidade</Label>
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
            name="unitPrice"
            render={({ field }) => (
              <FormItem>
                <Label>Preço Unitário</Label>
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
        </div>
        <div className="grid grid-cols-2 gap-3 items-center">
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <Label>Desconto</Label>
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
          <p className="justify-self-end self-end pr-3 font-semibold ">
            Final Price:{" "}
            <span className="text-primary font-bold text-xl">{finalPrice}</span>
          </p>
        </div>
        <Button disabled={isSubmitting} className="w-full" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
