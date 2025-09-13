import ShinyText from "@/components/ShinyText";

function AlreadyIn(fullName: { fullName: string }) {
   return (
      <div className="text-center rounded-full p-10 bg-black/50 flex items-center flex-col max-h-30 justify-center">
         <div className="">
            <ShinyText
               speed={2}
               text={`You are already logged in as ${fullName}. `}
               className="text-sm"
            />
         </div>
         <a href="/" className="">
            <ShinyText
               speed={2}
               text={"Go to home page"}
               className="underline underline-offset-4 cursor-pointer"
            />
         </a>
      </div>
   );
}

export default AlreadyIn;
