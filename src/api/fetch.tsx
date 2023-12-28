import api from '@/api/baseAPI';

function fetchClipboardData() {
    return api.get('/get_clipboard?userid=123&method=query');
}

function groupByData(data: Record<string, any[]>) {
    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);

    const groups: Record<string, string[]> = {};

    for (const key in data) {
        const date = new Date(key);
        const groupKey = date <= threeDaysAgo ? 'Before' : key;

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(...data[key]);
    }

    const sortedKeys = Object.keys(groups).sort((a, b) => {
        if (a === 'Before') return 1;
        if (b === 'Before') return -1;
        return new Date(b).getTime() - new Date(a).getTime();
    });

    const sortedGroups: Record<string, any[]> = {};
    sortedKeys.forEach((key) => {
        sortedGroups[key] = groups[key];
    });

    const cps = [];
    let index = 1;
    for (const group in sortedGroups) {
        cps.push({
            key: index.toString(),
            label: group,
            children: sortedGroups[group].reverse().map((item) => {
                return { key: item["note_id"], content: item["note"] };
            }),
        });
        index += 1;
    }

    return cps;
}

const fetchUtils = { fetchClipboardData, groupByData };
export default fetchUtils;
