import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs";
const supabaseClient = async (supabaseAccessToken: string): Promise<SupabaseClient> => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'DEFAULT_SUPABASE_URL',
        process.env.NEXT_PUBLIC_SUPABASE_KEY || 'DEFAULT_SUPABASE_KEY',
        {
            global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
        }
    );
    // set Supabase JWT on the client object,
    // so it is sent up with all Supabase requests
    return supabase;
};


export async function deleteFromClipboard(userid: string,  noteid: string) {

    const signInTokens = auth();
    const supabaseAccessToken = await signInTokens.getToken({ template: 'supabase' });
    console.log(userid, noteid)
    if (supabaseAccessToken) {
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data, error } = await supabase
            .from('clipboard')
            .delete()
            .match({ user_id: userid, noteid: noteid });
        
        if (error) {
            console.log(error);
        }
        console.log(data);
    }

 }
