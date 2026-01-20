'use server';

import connectDB from '@/config/db_config';
import Message from '@/models/Message';
import { get_server_session } from '@/util/serverSession';

async function getUnreadMessageCount() {
  await connectDB();

  const sessionUser = await get_server_session();

  if (!sessionUser || !sessionUser.user) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
}

export default getUnreadMessageCount;