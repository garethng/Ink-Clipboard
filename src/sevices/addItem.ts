import {auth} from "@clerk/nextjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

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


export async function add_item(content: string, userid: string) {
    const signInTokens = auth();
    const supabaseAccessToken = await signInTokens.getToken({ template: 'supabase' });

    if (supabaseAccessToken) {
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data, error } = await supabase
            .from('clipboard')
            .insert([
                { content: content, user_id: userid },
            ]);
        
        if (error) {
            console.log(error);
        }
        console.log(data);
    }
}

