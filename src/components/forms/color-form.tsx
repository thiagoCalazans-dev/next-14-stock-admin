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
import { createCategoryAction } from "@/actions/create-category-action";
import { useToast } from "@/hooks/useToast";
import { createColorAction } from "@/actions/create-color-action";

export const FormColorSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string().min(3),
  hexadecimal: schema.string().length(7),
});

export type FormColor = schema.infer<typeof FormColorSchema>;

interface ColorFormProps {
  initialData: FormColor | null;
}
export function ColorForm({ initialData }: ColorFormProps) {
  const form = useForm<FormColor>({
    resolver: zodResolver(FormColorSchema),
    defaultValues: initialData || {
      name: "",
      hexadecimal: "",
    },
  });

  const { isSubmitting, errors } = form.formState;
  const { onError, onSuccess } = useToast();

  async function onSubmit(formValues: FormColor) {
    try {
      await createColorAction(formValues);
      onSuccess("Cor Cadastrada com sucesso");
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
          <FormField
            control={form.control}
            name="hexadecimal"
            render={({ field }) => (
              <FormItem>
                <Label>Hexadecimal</Label>
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
