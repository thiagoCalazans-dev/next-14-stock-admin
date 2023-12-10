"use client";
import { useToast } from "@/hooks/useToast";
import { TrashIcon } from "../../infra/icons";
import { Button } from "../ui/button";
import { removeBrandAction } from "@/actions/remove-brand-action";

interface RemoveButtonProps {
  id: string;
}

export function RemoveBrandButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeBrandAction({ id: data.id });
      onSuccess("Marca removida com sucesso");
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
