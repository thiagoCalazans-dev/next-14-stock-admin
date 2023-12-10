"use client";
import { useToast } from "@/hooks/useToast";
import { TrashIcon } from "../../infra/icons";
import { Button } from "../ui/button";
import { removeProductAction } from "@/actions/remove-product-action";

interface RemoveButtonProps {
  id: string;
}

export function RemoveProductButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeProductAction({ id: data.id });
      onSuccess("Produto removido com sucesso");
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
