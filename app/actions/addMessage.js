'use server';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import connectDB from "@/config/db_config";
import Message from '@/models/Message';
import { get_server_session } from "@/util/serverSession";


async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await get_server_session();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'You must be logged in to send a message' };
  }

  const { userId } = sessionUser;

  const recipient = formData.get('recipient');

  if (userId === recipient) {
    return { error: 'You can not send a message to yourself' };
  }


  console.log({
    recipient,
    property: formData.get('property'),
  });
  
  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('body'),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;