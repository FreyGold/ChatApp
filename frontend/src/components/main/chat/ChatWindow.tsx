import ChatFriend from "./ChatFriend";

function ChatWindow() {
   return (
      <div className="w-[80vw] h-[80vh] bg-primary/65 gap-2 rounded-2xl p-4 grid grid-cols-[2fr_7fr]">
         <div className="bg-primary/50 rounded-2xl p-4">
            <ChatFriend />
         </div>
         <div className="bg-secondary/20 rounded-2xl"></div>
      </div>
   );
}

export default ChatWindow;
