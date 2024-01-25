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

function groupByDate(data: any[]) {
    // group the data by create_at. return a dict with key as date and value as list of data
    // if the date is 3 days ago, use "Before" as the key
    // return: { "Before": [{key: "1", label: "Before", children: [{key: "1", content: "content"}]}], "2021-10-10": [{key: "1", label: "2021-10-10", children: [{key: "1", content: "content"}]}]}
    // the children is sorted by actual_time in each group

    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);

    const groupedData: { [key: string]: any} = {};

    data.forEach((item) => {


        const createdAt = new Date(item["created_at"]);


        const key = createdAt <= threeDaysAgo ? "Before" : item["created_at"];
        
        if (!groupedData[key]) {
            groupedData[key] = { key: key, label: key, children: []};
        }
        groupedData[key].children.push({ key: item["noteid"], content: item["content"], actual_time: new Date(item["actual_time"])});
    });

    // sort the children by actual_time
    Object.keys(groupedData).forEach((key) => { 
        groupedData[key].children.sort((a: any, b: any) => {
            return b.actual_time.getTime() - a.actual_time.getTime();
        })
    });
    console.log(groupedData);
    return Object.values(groupedData);
}

export async function fetch_all() {
    const  signInTokens = auth();
    
    const supabaseAccessToken = await signInTokens.getToken({ template: 'supabase' });

    if (supabaseAccessToken) {
        const supabase = await supabaseClient(supabaseAccessToken);

        // TODO #2: Replace with your database table name
        const tableName = 'clipboard';

        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            
        

        if (error) {
            // TODO #3: Handle errors
            console.error(error);
            return;
        }
        if (!data) {
            // TODO #3: Handle errors
            console.error("no data");
            return;
        }
        //conver the data dict to object
        

        console.log(data);
        const new_data = groupByDate(data);
        return new_data;
        // TODO #4: return the response in the format below
        //[

        
    }
}
  
