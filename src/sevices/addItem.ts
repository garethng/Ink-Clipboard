import api from '@/sevices/baseAPI'
import getFormattedDate from '@/lib/dateFormat'

function addClipboardItem(userid: string, content: string) 
{
    var dateTime = getFormattedDate(new Date());
    return api.post(`/add_to_clipboard`,{
        "userid": userid,
        "clipboard": content,
        "index_date": dateTime,
    })
}

export default addClipboardItem;