'use server';

import connectDB from '@/config/db_config';
import Message from '@/models/Message';
import { get_server_session } from '@/util/serverSession';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId) {
  await connectDB();

  const sessionUser = await get_server_session();

  if (!sessionUser || !sessionUser.user) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message Not Found');

  
  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  revalidatePath('/messages', 'page');

  await message.deleteOne();
}

export default deleteMessage;