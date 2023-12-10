"use client";
import { useToast } from "@/hooks/useToast";
import { TrashIcon } from "../../infra/icons";
import { Button } from "../ui/button";
import { removeColorAction } from "@/actions/remove-color-action";

interface RemoveButtonProps {
  id: string;
}

export function RemoveCategoryButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeColorAction({ id: data.id });
      onSuccess("Cor removida com sucesso");
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
