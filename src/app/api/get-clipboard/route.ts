import { currentUser } from "@clerk/nextjs";
import fetchUtils from "@/sevices/fetch";

export async function POST(req: Request) { 
    const user = await currentUser();
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try { 
        const res = await fetchUtils.fetchClipboardData(user.id);
        const cps = fetchUtils.groupByData(res.data);
        return Response.json(cps, {status: 200});
    } catch (e) {
        return Response.json({ code: -1, message: "no body" }, { status: 400 });
    }
}