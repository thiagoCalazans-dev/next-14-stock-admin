"use client";
import { useToast } from "@/hooks/useToast";
import { TrashIcon } from "../../infra/icons";
import { Button } from "../ui/button";
import { removeCategoryAction } from "@/actions/remove-category-action";

interface RemoveButtonProps {
  id: string;
}

export function RemoveCategoryButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeCategoryAction({ id: data.id });
      onSuccess("Categoria removida com sucesso");
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Button variant="destructive" type="button" onClick={handleRemoveClick}>
      <TrashIcon />
    </Button>
  );
}
