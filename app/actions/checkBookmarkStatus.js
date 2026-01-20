'use server';

import connectDB from '@/config/db_config';
import User from '@/models/User';
import { get_server_session } from '@/util/serverSession';

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const sessionUser = await get_server_session();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  
  const user = await User.findById(userId);

  
  let isBookmarked = user.bookmark.includes(propertyId);

  return { isBookmarked };
}

export default checkBookmarkStatus;