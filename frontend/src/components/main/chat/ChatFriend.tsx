import { FaCircleUser } from "react-icons/fa6";

function ChatFriend({
   contact,
   lastMessage,
}: {
   contact: string;
   lastMessage?: string;
}) {
   return (
      <div className="bg-sidebar-primary/60 w-full h-20 rounded-4xl flex items-center gap-4 p-4 cursor-pointer hover:bg-sidebar-primary/70 transition duration-300 ease-initial">
         <FaCircleUser size={45} />
         <div className="flex flex-col ">
            <h6 className="text-lg">{contact}</h6>
            <p className="text-sm">{lastMessage}</p>
         </div>
      </div>
   );
}

export default ChatFriend;
