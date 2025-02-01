const currentUrl = window.location.href;

const rawUrlData = currentUrl.split('?');
if (rawUrlData.length > 1) {
    const splitData = rawUrlData[1].split('&');

    const data = {}
    splitData.forEach(dataSet => {
        const keyVal = dataSet.split('=');
        data[keyVal[0]] = keyVal[1];
    });
    const formData = document.querySelector("#form-data");
    formData.innerHTML += `<p><b>Name:</b> ${data["first-name"]} ${data["last-name"]}`;
    formData.innerHTML += `<p><b>Organization Title:</b> ${data["organization-title"]}`;
    formData.innerHTML += `<p><b>Email:</b> ${data["email"].replace('%40', '@')}`;
    formData.innerHTML += `<p><b>Phone Number:</b> ${data["phone"]}`;
    formData.innerHTML += `<p><b>Business/Organization Name:</b> ${data["business-name"]}`;
    formData.innerHTML += `<p><b>Membership Level:</b> ${data["membership-level"]}`;
    if (data["description"] !== '')
        formData.innerHTML += `<p><b>Business/Organization Description:</b> ${data["description"]}`;
    formData.innerHTML += `<p><b>Timestamp:</b> ${data["timestamp"].replaceAll('%2F','/')}`;



} else {
    window.location.href = "join.html"
}