import api from '@/api/baseAPI';

function deleteFromClipboard( noteid: string) {
    return api.post(`/delete_from_clipboard`,{
        "noteid": noteid,
        "userid": "123",
    });
 }

export default deleteFromClipboard;