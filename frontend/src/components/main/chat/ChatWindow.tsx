import { useGetContacts } from "@/services/hooks/messages.react-query";
import ChatFriend from "./ChatFriend";

function ChatWindow() {
   const { data: contacts, isLoading, error } = useGetContacts();
   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error loading contacts</div>;
   const users = contacts.users;
   return (
      <div className="w-[80vw] h-[80vh] bg-primary/65 gap-2 rounded-2xl p-4 grid grid-cols-[2fr_6fr]">
         <div className="bg-primary/80 rounded-2xl p-2 flex flex-col gap-2 overflow-y-auto">
            {users.map((user: { fullName: string }) => (
               <ChatFriend contact={user.fullName} lastMessage="Hello" />
            ))}
         </div>
         <div className="bg-secondary/20 rounded-2xl"></div>
      </div>
   );
}

export default ChatWindow;
