// import connectToDatabase from "@/app/connect";
// import { Event } from "@/app/models/Event.js";

// export async function POST(req) {
//   await connectToDatabase();
//   const url = new URL(req.url);
//   const clickedLink = atob(url.searchParams.get('url'))
//   const page = url.searchParams.get('page')
//   console.log({clickedLink })
//   await Event.create({ type: 'click', uri: clickedLink, page }); // Capture the clicked URL in Event
//   return new Response(JSON.stringify({ success: true }), { status: 200 });
// }



import connectToDatabase from "@/app/connect";
import { Event } from "@/app/models/Event.js";

export async function GET(req) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const clickedLink = atob(url.searchParams.get("url"));
    const page = url.searchParams.get("page");

    if (!clickedLink || !page) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid data" }),
        { status: 400 }
      );
    }

    console.log({ clickedLink, page });

    // Log the event in the database
    await Event.create({ type: "click", uri: clickedLink, page });

    // Redirect to the actual link
    return Response.redirect(clickedLink, 302);
  } catch (error) {
    console.error("Error logging click:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
