'use server';
import cloudinary from '@/config/cloudinary_config';
import connectDB from  '@/config/db_config';
import Property from '@/models/Property';
import { get_server_session } from '@/util/serverSession';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId) {
  const sessionUser = await get_server_session();

  // Check for session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId);

  console.log('DELETE propertyId:', propertyId);

  if (!property) throw new Error('Property Not Found');

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // extract public id's from image url in DB
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  // Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('propertypulse/' + publicId);
    }
  }

  // Proceed with property deletion
  await property.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteProperty;