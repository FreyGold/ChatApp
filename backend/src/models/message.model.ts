import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
   {
      senderId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      receiverId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      text: {
         type: String,
      },
      image: {
         type: String,
      },
   },
   { timestamps: true }
);

messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ receiverId: 1, senderId: 1 });

export const Message = mongoose.model("Message", messageSchema);
