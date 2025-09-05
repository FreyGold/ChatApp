interface ErrorToastProps {
   message: string;
   onDismiss: () => void;
}

export function ErrorToast({ message, onDismiss }: ErrorToastProps) {
   return (
      <div className="border border-destructive bg-destructive/10 text-text radius-none p-4 rounded-none gap-1">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <span>{message}</span>
            </div>
            <button
               onClick={onDismiss}
               className="text-destructive hover:text-destructive/80 ml-1 text-2xl">
               &times;
            </button>
         </div>
      </div>
   );
}
