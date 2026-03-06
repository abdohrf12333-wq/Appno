// الرابط العالمي الخاص بك من Pinggy
const TUNNEL_URL = "https://testimonials-folding-ceiling-apartment.trycloudflare.com"; 

const statusMsg = document.getElementById('status');
const linkContainer = document.getElementById('link-container');
const finalUrlInput = document.getElementById('final-url');
const uploadBtn = document.getElementById('upload-btn');

// فحص الاتصال بالسيرفر في الموبايل
async function checkConnection() {
    try {
        // إضافة /status للتأكد من استجابة السيرفر
        const response = await fetch(TUNNEL_URL + "/status");
        if(response.ok) {
            statusMsg.innerText = "متصل أونلاين ✅";
            statusMsg.style.color = "#238636";
        }
    } catch (error) {
        statusMsg.innerText = "أوفلاين (تأكد من بقاء تطبيق Pinggy مفتوحاً) ❌";
        statusMsg.style.color = "#da3633";
    }
}

// تنفيذ عملية الرفع
uploadBtn.onclick = async () => {
    const html = document.getElementById('html-code').value;
    const css = document.getElementById('css-code').value;
    const js = document.getElementById('js-code').value;

    if(!html) return alert("برجاء إدخال كود HTML على الأقل");

    uploadBtn.innerText = "جاري الإرسال لسيرفر الموبايل...";
    uploadBtn.disabled = true;

    // دمج السكريبتات في ملف index.html واحد
    const fullSource = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;

    try {
        const res = await fetch(TUNNEL_URL + "/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileName: "index.html", fileData: fullSource })
        });

        if(res.ok) {
            linkContainer.classList.remove('hidden');
            finalUrlInput.value = TUNNEL_URL + "/index.html";
            uploadBtn.innerText = "تم الرفع بنجاح! ✅";
            uploadBtn.style.background = "#21262d";
        }
    } catch (e) {
        alert("فشل الرفع! تأكد أن السيرفر في هاتفك يستقبل البيانات.");
        uploadBtn.innerText = "إعادة المحاولة";
        uploadBtn.disabled = false;
    }
};

// تشغيل الفحص
checkConnection();
