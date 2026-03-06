// ضع هنا الرابط العالمي الذي حصلت عليه من تطبيق الموبايل
const SERVER_URL = "https://YOUR-TUNNEL-URL.localltonet.com"; 

const uploadBtn = document.getElementById('upload-btn');
const statusText = document.getElementById('status');

// فحص هل السيرفر (الموبايل) متصل؟
async function checkServer() {
    try {
        const res = await fetch(SERVER_URL + "/status");
        if(res.ok) {
            statusText.innerText = "متصل أونلاين ✅";
            statusText.style.color = "#4CAF50";
        }
    } catch (e) {
        statusText.innerText = "أوفلاين (تأكد من تشغيل التطبيق) ❌";
        statusText.style.color = "#FF5252";
    }
}

// وظيفة الرفع للموبايل
uploadBtn.onclick = async () => {
    const content = document.getElementById('file-content').value;
    const name = document.getElementById('file-name').value;

    if(!content || !name) return alert("امسح الخانات واكتب السكريبت واسم الملف");

    uploadBtn.innerText = "جاري الرفع لسيرفر الموبايل...";

    try {
        const response = await fetch(SERVER_URL + "/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileName: name, fileData: content })
        });

        if (response.ok) {
            document.getElementById('result-link').classList.remove('hidden');
            document.getElementById('global-url').innerText = SERVER_URL + "/" + name;
            document.getElementById('global-url').href = SERVER_URL + "/" + name;
            uploadBtn.innerText = "تم الرفع بنجاح!";
        }
    } catch (error) {
        alert("فشل الرفع: تأكد أن السيرفر في الموبايل يعمل");
        uploadBtn.innerText = "إعادة المحاولة";
    }
};

checkServer();
  
