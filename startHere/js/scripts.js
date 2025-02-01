const currentUrl = window.location.href;

const rawUrlData = currentUrl.split('?')[1].split('&');
//console.log(urlData)
const data = {}
rawUrlData.forEach(dataSet => {
    const keyVal = dataSet.split('=');
    const key = keyVal[0];
    const val = keyVal[1].replace("%40", '@');
    data[key] = val;
});

console.log(data)