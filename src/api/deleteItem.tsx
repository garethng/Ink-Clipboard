import api from '@/api/baseAPI';

function deleteFromClipboard( noteid: string) {
    return api.get(`/delete_from_clipboard?userid=123&method=delete&noteid=${noteid}`);
 }

export default deleteFromClipboard;