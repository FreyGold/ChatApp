import { useGetContacts } from "@/services/hooks/messages.react-query";

function ChatFriend() {
   const { data: contacts, isLoading, error } = useGetContacts();
   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error loading contacts</div>;
   console.log(contacts);
   return <div className="bg-sidebar-primary/40 w-full h-20 rounded-2xl"></div>;
}

export default ChatFriend;
