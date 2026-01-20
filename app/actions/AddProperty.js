"use server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import connectDB from "@/config/db_config";
import Property from "@/models/Property";
import { get_server_session } from "@/util/serverSession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary_config";

async function addProperty(formData) {
    console.log("=== ADD PROPERTY STARTED ===");
    
    try {
        console.log("1. Connecting to DB...");
        await connectDB();

        console.log("2. Getting session...");
        const sessionUser = await get_server_session();
        console.log("Session user:", sessionUser);

        if (!sessionUser || !sessionUser.userId) {
            console.error("No user ID found!");
            throw new Error("User ID is required");
        }

        const { userId } = sessionUser;
        console.log("User ID:", userId);

        console.log("3. Processing form data...");
        const amenities = formData.getAll("amenities");
        const images = formData
            .getAll("images")
            .filter((image) => image.name !== "");

        console.log("Images count:", images.length);

        const propertyData = {
            owner: userId,
            types: formData.get("type"),
            name: formData.get("name"),
            description: formData.get("description"),

            location: {
                street: formData.get("location.street"),
                city: formData.get("location.city"),
                state: formData.get("location.state"),
                zipcode: formData.get("location.zipcode"),
            },

            beds: formData.get("beds"),
            baths: formData.get("baths"),
            square_feet: formData.get("square_feet"),
            amenities,

            rates: {
                nightly: formData.get("rates.nightly"),
                weekly: formData.get("rates.weekly"),
                monthly: formData.get("rates.monthly"),
            },

            seller_info: {
                name: formData.get("seller_info.name"),
                email: formData.get("seller_info.email"),
                phone: formData.get("seller_info.phone"),
            },
        };

        console.log("4. Uploading images...");
        const imageUrls = [];

        for (const imageFile of images) {
            const imageBuffer = await imageFile.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);
            const imageBase64 = imageData.toString("base64");

            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,
                {
                    folder: "propertyPulse",
                }
            );

            imageUrls.push(result.secure_url);
            console.log("Uploaded image:", result.secure_url);
        }

        propertyData.images = imageUrls;

        console.log("5. Saving property...");
        const newProperty = new Property(propertyData);
        await newProperty.save();
        console.log("Property saved with ID:", newProperty._id);

        console.log("6. Revalidating path...");
        revalidatePath("/", "layout");

        console.log("7. Redirecting...");
        redirect(`/property/${newProperty._id}`);
    } catch (error) {
        console.error("=== ERROR IN ADD PROPERTY ===");
        console.error('Full Error:', error)
        throw error;
    }
}

export default addProperty;