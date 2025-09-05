import { ErrorToast } from "@/components/ui/toaster/error-toast";
import type { JSX } from "react";
import toast, { type Toast } from "react-hot-toast";

export const showError = (message: string) => {
   return toast.custom(
      (t: Toast): JSX.Element => (
         <ErrorToast message={message} onDismiss={() => toast.dismiss(t.id)} />
      ),
      {
         duration: 3000,
         position: "top-center",
         removeDelay: 0,
      }
   );
};
