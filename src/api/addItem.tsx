import api from '@/api/baseAPI'
import getFormattedDate from '@/utils/dateFormat'
function addClipboardItem(content: string) 
{
    var dateTime = getFormattedDate(new Date());
    return api.post(`/add_to_clipboard`,{
        "userid": "123",
        "clipboard": content,
        "index_date": dateTime,
    })
}

export default addClipboardItem;