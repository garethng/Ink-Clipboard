// 模拟的获取剪贴板内容的API
axios.defaults.baseURL = 'https://c3951w0dl3.execute-api.us-east-1.amazonaws.com/demo';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
function fetchClipboardItems() {
    return axios.get('/get_clipboard?userid=123&method=query').then((response) => {
        console.log(response);
        return response.data;
    });
}

// 模拟的添加剪贴板内容的API
function addClipboardItem(content) {
    return axios.get(`/add_to_clipboard?userid=123&method=set&clipboard=${content}`).then((response) => {
        console.log(response);
        return response.data;
    });
}

// 复制文本到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('复制成功');
    }, () => {
        alert('复制失败');
    });
}

// 按日期分组剪贴板内容
function groupByDate(data) {
    var groups = {};
    var now = new Date();
    Object.keys(data).forEach(function(item) {
        var date = new Date(item);
        var diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (diff > 3) {
            if (!groups['之前']) {
                groups['之前'] = [];
            }
            groups['之前'].push(data[item]);
        } else {
            if (!groups[item]) {
                groups[item] = [];
            }
            clipboard = data[item].split(',');
            groups[item] = clipboard;
        }
    });

    // Sort the keys
    var sortedKeys = Object.keys(groups).sort(function(a, b) {
        if (a === '之前') return -1;
        if (b === '之前') return 1;
        return new Date(b) - new Date(a);
    });

    // Create a new object with sorted keys
    var sortedGroups = {};
    sortedKeys.forEach(function(key) {
        sortedGroups[key] = groups[key];
    });

    return sortedGroups;
}


// 创建剪贴板分组的HTML元素
// 创建剪贴板分组的HTML元素
function createGroupElement(groupName, items, isLatest) {
    var groupElement = document.createElement('div');
    groupElement.className = 'clipboard-group';
    var titleElement = document.createElement('h3');
    titleElement.className = 'group-title';
    titleElement.textContent = groupName;
    var arrowElement = document.createElement('span');
    arrowElement.className = 'arrow ' + (isLatest ? 'up' : 'down');
    titleElement.appendChild(arrowElement);
    titleElement.onclick = function() {
        var display = listElement.style.display;
        listElement.style.display = display === 'none' ? 'block' : 'none';
        arrowElement.className = 'arrow ' + (display === 'none' ? 'up' : 'down');
    };
    groupElement.appendChild(titleElement);
    var listElement = document.createElement('div');
    listElement.className = 'group-items';
    if (!isLatest) { // 如果不是最新的分组，设置初始的隐藏样式
        listElement.style.display = 'none';
    }
    Object.keys(items).forEach(function(key) {
        var itemElement = document.createElement('div');
        itemElement.className = 'clipboard-item';
        itemElement.innerHTML = `
            ${items[key]}
            <button onclick="copyToClipboard('${items[key]}')">复制</button>
        `;
        listElement.appendChild(itemElement);
    });
    groupElement.appendChild(listElement);
    return groupElement;
}


// 加载并渲染剪贴板内容
function loadClipboardItems() {
    fetchClipboardItems().then((items) => {
        const clipboardList = document.getElementById('clipboard-list');
        clipboardList.innerHTML = '';
        var groups = groupByDate(items);
        var isLatest = true; // 标记是否是最新的分组
        for (var groupName in groups) {
            var groupElement = createGroupElement(groupName, groups[groupName], isLatest);
            clipboardList.appendChild(groupElement);
            isLatest = false; // 只有第一个分组是最新的分组
        }
    });
}


// 页面加载完成后，加载剪贴板内容
window.onload = loadClipboardItems;

// 添加刷新按钮的点击事件
document.getElementById('refresh-btn').addEventListener('click', () => {
    var refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.classList.add('spin');
    loadClipboardItems();
    refreshBtn.classList.remove('spin');
});

// 添加确认按钮的点击事件
document.getElementById('submit-btn').addEventListener('click', () => {
    const inputText = document.getElementById('input-text').value;
    if (inputText) {
        addClipboardItem(inputText).then(() => {
            loadClipboardItems();
            document.getElementById('input-text').value = '';
        });
    }
});
