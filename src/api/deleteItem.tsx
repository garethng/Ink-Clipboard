import axios from 'axios';

axios.defaults.baseURL = 'https://c3951w0dl3.execute-api.us-east-1.amazonaws.com/demo';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

function deleteFromClipboard(dateTime: string, index: number) {
    return axios.get(`/delete_from_clipboard?userid=123&method=delete&datetime=${dateTime}&index=${index}`)
 }

export default deleteFromClipboard;