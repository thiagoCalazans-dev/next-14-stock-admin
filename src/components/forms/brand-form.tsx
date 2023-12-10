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
import { createBrandAction } from "@/actions/create-brand-action";
import { useToast } from "@/hooks/useToast";

interface BrandFormProps {
  initialData: FormBrand | null;
}

export const FormBrandSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string().min(3),
});

export type FormBrand = schema.infer<typeof FormBrandSchema>;

export function BrandForm({ initialData }: BrandFormProps) {
  const form = useForm<FormBrand>({
    resolver: zodResolver(FormBrandSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { isSubmitting, errors } = form.formState;
  const { onError, onSuccess } = useToast();

  async function onSubmit(formValues: FormBrand) {
    try {
      await createBrandAction(formValues);
      onSuccess("Categoria Cadastrada com sucesso");
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
        </div>
        <Button disabled={isSubmitting} className="w-full" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
