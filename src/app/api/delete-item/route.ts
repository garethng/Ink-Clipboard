import { currentUser } from "@clerk/nextjs";
import {deleteFromClipboard} from "@/sevices/deleteItem";

export async function POST(req: Request, response: Response) {
    const user = await currentUser();
    
    if (!user || !user.id) {
        return Response.json({ code: -2, message: "no auth" }, { status: 401 });
    }

    try {
        const bodyData = await new Response(req.body).text();
        var json = JSON.parse(bodyData);
        if (!json) {
            return Response.json({ code: -1, message: "no body" }, { status: 400 });
        }
        var noteid = json.noteid;
        if (!noteid) {
            return Response.json({ code: -1, message: "no noteid" }, { status: 400 });
        }

        // Parse the body as JSON
        const res = await deleteFromClipboard(user.id, noteid);
        return Response.json({ noteid: noteid }, {
            status: 200,
        })
    }catch (e) {
        return Response.json({ code: -1, message: "no body" }, { status: 400 });
    }
}