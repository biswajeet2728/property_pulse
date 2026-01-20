'use server';

import connectDB from '@/config/db_config';
import User from '@/models/User';
import { get_server_session } from '@/util/serverSession';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await get_server_session();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

 
  const user = await User.findById(userId);


  let isBookmarked = user.bookmark.includes(propertyId);
  console.log(isBookmarked);

  let message;

  if (isBookmarked) {
   
    user.bookmark.pull(propertyId);
    message = 'Bookmark removed successfully';
    isBookmarked = false;
  } else {
    
    user.bookmark.push(propertyId);
    message = 'Bookmark added successfully';
    isBookmarked = true;
  }

  console.log(message);

  await user.save();
  revalidatePath('/property/saved', 'page');

  return { message, isBookmarked };
}

export default bookmarkProperty;