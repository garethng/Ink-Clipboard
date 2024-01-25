import { currentUser } from "@clerk/nextjs";
import { fetch_all } from "@/sevices/get_clipboard";

export async function POST(req: Request) { 
    const user = await currentUser();
    
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try { 

        const res = await fetch_all();

        return Response.json(res, {status: 200});
    } catch (e) {
        return Response.json({ code: -1, message: "no body" }, { status: 400 });
    }
}