'use server';

import mongoose from "mongoose";
import { Page } from "../models/Page.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function grabUsername(formData) {
    const username = formData.get('username');

    // Ensure the database connection
    if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    // Check if the username exists
    const existingPageDoc = await Page.findOne({ uri: username });
    if (existingPageDoc) {
        return false; // Username is taken
    }

    // Get the session for ownership information
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        throw new Error("User is not authenticated.");
    }

    // Create a new page and return confirmation
    await Page.create({ uri: username, owner: session.user.email });
    return true; // Username successfully registered
}
