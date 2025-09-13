import { Toaster as ToasterConfig } from "react-hot-toast";

function Toaster() {
   return (
      <ToasterConfig
         position="top-center"
         toastOptions={{
            success: {
               duration: 3000,
               iconTheme: {
                  primary: "green",
                  secondary: "black",
               },
            },
            error: {
               duration: 2000,
            },
         }}
      />
   );
}

export default Toaster;
