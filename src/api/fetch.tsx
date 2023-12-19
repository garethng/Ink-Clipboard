import axios from 'axios';
import getFormattedDate from '@/utils/dateFormat';

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
    Object.keys(data).forEach(function (item) {
        
        var date = new Date(item);
        var format_date = getFormattedDate(date);
        
        var diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 3) {
            if (!groups['Before']) {
                groups['Before'] = [];
            }
            groups['Before'] = [...groups['Before'], ...data[item].split(',')];
        } else {
            if (!groups[format_date]) {
                groups[format_date] = [];
            } 
            const clipboard = data[item].split(',');
            groups[format_date] = clipboard;
        }
    });


    // Sort the keys
    const sortedKeys = Object.keys(groups).sort((a, b) => {
        if (a === 'Before') return 1;
        if (b === 'Before') return -1;
        return new Date(b).getTime() - new Date(a).getTime();
    });
    // Create a new object with sorted keys
    const sortedGroups: Record<string, string[]> = {};
    sortedKeys.forEach((key) => {
        sortedGroups[key] = groups[key];
    });

    var cps = []
    var index = 1
    
    for (const group in sortedGroups) {
        cps.push({
            key: index.toString(),
            label: group,
            children: sortedGroups[group].reverse().map((item, n_index) => {
                return { "key": n_index, "content": item }
            }),
        });
        index += 1;
    }

    return cps;
}

const fetchUtils = { fetchClipboardItems, groupByData };
export default fetchUtils;
