import { currentUser } from "@clerk/nextjs";
import {add_item} from "@/sevices/addItem";

export async function POST(req: Request, response: Response) { 
    const user = await currentUser();
   
    if (!user || !user.id) {
        return Response.json({ code: -2, message: "no auth" }, {status: 401});
    }


    try {
        const bodyData = await new Response(req.body).text();
        var json = JSON.parse(bodyData);

        if (!json) { 
            return Response.json({ code: -1, message: "no body" }, { status: 400 });
        }
        var content = json.content;
        if (!content) { 
            return Response.json({ code: -1, message: "no content" }, { status: 400 });
        }
        // // Parse the body as JSON
        const res = await add_item(content, user.id);
        return Response.json({ nodeid: "2222" }, {
            status: 200,
        })
    } catch (e) { 
        return Response.json({ code: -1, message: "no body" }, { status: 400 });
    }
}
