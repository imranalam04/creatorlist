'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Page } from "../models/Page";
import connectToDatabase from "../connect";
import { User } from "../models/User";

export async function savePageSettings(formData) {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (session) {
        const email = session.user?.email;

        // Update Page settings
        const displayName = formData.get("displayName");
        const location = formData.get("location");
        const bio = formData.get("bio");
        const bgType = formData.get("bgType");
        const bgColor = formData.get("bgColor");
        const bgImage = formData.get("bgImage");

        await Page.updateOne(
            { owner: email },
            { displayName, location, bio, bgType, bgColor, bgImage }
        );

        // Update User avatar if provided
        if (formData.has("avatar")) {
            const avatarLink = formData.get("avatar");
            await User.updateOne(
                { email },
                { image: avatarLink }
            );
        }

        return true;
    }

    return false;
}



export async function savePageButtons(formData) {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (session) {
        const buttonsValues = {};
        formData.forEach((key, value) => {
            buttonsValues[value] = key;
        })
        const dataToUpdate = { buttons: buttonsValues }
        await Page.updateOne(
            { owner: session?.user?.email },
            dataToUpdate,
        )
        return true;
    }
    return false;
}

export async function savePageLinks(links) {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    if (session) {
        await Page.updateOne(
            { owner: session?.user?.email },
            { links }
        )
    } else {
        return false;
    }
}