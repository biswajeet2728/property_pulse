'use server';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import connectDB from "@/config/db_config";
import Message from '@/models/Message';
import { get_server_session } from "@/util/serverSession";


async function addMessage(previousState, formData) {

  try {
    await connectDB();

    const sessionUser = await get_server_session();

    if (!sessionUser || !sessionUser.userId) {
      return { error: 'You must be logged in to send a message' };
    }

    const { userId } = sessionUser;

    const { recipient, property, name, email, phone, body } = formData;

    if (userId === recipient) {
      return { error: 'You can not send a message to yourself' };
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property,
      name,
      email,
      phone,
      body,
    });

    await newMessage.save();

    return { submitted: true };

  } catch (error) {
    console.log("Error in sending message ", error);
    return;
  }

}

export default addMessage;