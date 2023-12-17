import axios from 'axios';

axios.defaults.baseURL = 'https://c3951w0dl3.execute-api.us-east-1.amazonaws.com/demo';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

function fetchClipboardItems() {
    return axios.get('/get_clipboard?userid=123&method=query')
}

function groupByData(data: Record<string, string>) {
    var groups: Record<string, string[]> = {};
    var now = new Date();
    Object.keys(data).forEach(function(item) {
        var date = new Date(item);
        var diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 3) {
            if (!groups['之前']) {
                groups['之前'] = [];
            }
            groups['之前'].push(data[item]);
        } else {
            if (!groups[item]) {
                groups[item] = [];
            }
            const clipboard = data[item].split(',');
            groups[item] = clipboard;
        }
    });


    // Sort the keys
    const sortedKeys = Object.keys(groups).sort((a, b) => {
        if (a === '之前') return -1;
        if (b === '之前') return 1;
        return new Date(b).getTime() - new Date(a).getTime();
    });

    // Create a new object with sorted keys
    const sortedGroups: Record<string, string[]> = {};
    sortedKeys.forEach((key) => {
        sortedGroups[key] = groups[key];
    });

    return sortedGroups;
}

const fetchUtils = { fetchClipboardItems, groupByData };
export default fetchUtils;
