'use server';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import connectDB from "@/config/db_config";
import Property from '@/models/Property';
import { get_server_session } from "@/util/serverSession";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function updateProperty(propertyId, formData) {
  await connectDB();

  const sessionUser = await get_server_session();

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  
  if (existingProperty.owner.toString() !== userId) {
    throw new Error('Current user does not own this property.');
  }



  const propertyData = {
    types: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities: formData.getAll('amenities'),
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: userId,
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath('/', 'layout');

  redirect(`/property/${updatedProperty._id}`);
}

export default updateProperty;