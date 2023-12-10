"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast/toast";
import { useToastPrimitive } from "@/components/ui/toast/use-toast-primitive";
import { CopyIcon } from "../infra/icons";

export function useToast() {
  const { toast } = useToastPrimitive();

  function onSuccess(title: string) {
    toast({
      title,
      description: new Date().toDateString(),
    });
  }

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
  };

  function onError(message: string) {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
      action: (
        <ToastAction onClick={() => onCopy(message)} altText="Close">
          <CopyIcon />
        </ToastAction>
      ),
    });
  }

  return {
    onSuccess,
    onError,
  };
}
