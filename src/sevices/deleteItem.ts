import api from '@/sevices/baseAPI';

function deleteFromClipboard(userid: string,  noteid: string) {

    return api.post(`/delete_from_clipboard`,{
        "noteid": noteid,
        "userid": userid,
    });

 }

export default deleteFromClipboard;