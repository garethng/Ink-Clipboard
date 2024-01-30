import {auth} from "@clerk/nextjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';

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


const getCurrentDate = (): string => {
    const date = new Date()
  
    const year = date.getFullYear()
  
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
  
    const day = date.getDate().toString().padStart(2, '0')
  
    return `${year}-${month}-${day}`
  }

export async function add_item(content: string, userid: string) {
    const signInTokens = auth();
    const supabaseAccessToken = await signInTokens.getToken({ template: 'supabase' });

    if (supabaseAccessToken) {
        const supabase = await supabaseClient(supabaseAccessToken);
        const noteid = uuidv4();
        // get datetime for current timezone format as YYYY-MM-DD set timezone to local timezone
        
        const created_at = getCurrentDate()

        const { data, error } = await supabase
            .from('clipboard')
            .insert([
                { content: content, user_id: userid, noteid: noteid, created_at: created_at },
            ]);
        
        if (error) {
            console.log(error);
        }
        console.log(data);
        return noteid;
    }
}



