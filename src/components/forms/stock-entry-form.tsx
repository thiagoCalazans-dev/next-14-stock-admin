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

import { adapterStock } from "@/adapter/stock-adapter";
import { stockEntryAction } from "@/actions/stock-entry";

export const FormStockEntrySchema = schema.object({
  id: schema.string().optional(),
  productCode: schema.string().trim(),
  quantity: schema.string(),
  unitCost: schema.string(),
  date: schema.string().transform((string) => {
    return new Date(string).toISOString();
  }),
});

export type FormStockEntry = schema.infer<typeof FormStockEntrySchema>;

interface EntryFormProps {
  initialData?: {
    productCode: string;
  };
}

export function StockEntryForm({ initialData }: EntryFormProps) {
  const form = useForm<FormStockEntry>({
    resolver: zodResolver(FormStockEntrySchema),
    defaultValues: {
      productCode: initialData?.productCode || "",
      quantity: "",
      date: "",
      unitCost: "",
    },
  });

  const { isSubmitting, errors } = form.formState;
  const { onError, onSuccess } = useToast();

  async function onSubmit(formValues: FormStockEntry) {
    try {
      const stockEntry = adapterStock.formStockEntryToAction(formValues);
      console.log(stockEntry);
      await stockEntryAction(stockEntry);

      onSuccess("Entrada realizada com sucesso");
      form.reset();
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="flex gap-3 items-center">
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
        <div className="flex gap-3 items-center">
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
            name="unitCost"
            render={({ field }) => (
              <FormItem>
                <Label>Valor Unitário</Label>
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
        <Button disabled={isSubmitting} className="w-full" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
