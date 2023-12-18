import axios from 'axios';

axios.defaults.baseURL = 'https://c3951w0dl3.execute-api.us-east-1.amazonaws.com/demo';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";


function addClipboardItem(content: string) {
    return axios.get(`/add_to_clipboard?userid=123&method=set&clipboard=${content}`)
}

export default addClipboardItem;