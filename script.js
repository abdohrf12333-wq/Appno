// ⚠️ هام: حط هنا رابط Localtonet العالمي بتاعك
const TUNNEL_URL = "https://your-name.localltonet.com"; 

const statusMsg = document.getElementById('status');
const linkContainer = document.getElementById('link-container');
const finalUrlInput = document.getElementById('final-url');

async function checkConnection() {
    try {
        const r = await fetch(TUNNEL_URL + "/status");
        if(r.ok) { statusMsg.innerText = "متصل أونلاين ✅"; statusMsg.style.color="#4CAF50"; }
    } catch(e) { statusMsg.innerText = "أوفلاين (شغل الـ Tunnel) ❌"; statusMsg.style.color="#ff4444"; }
}

document.getElementById('upload-btn').onclick = async () => {
    const html = document.getElementById('html-code').value;
    const css = document.getElementById('css-code').value;
    const js = document.getElementById('js-code').value;

    // تجميع الموقع في ملف واحد index.html لسهولة العرض
    const fullSource = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;

    try {
        const res = await fetch(TUNNEL_URL + "/upload", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ fileName: "index.html", fileData: fullSource })
        });

        if(res.ok) {
            linkContainer.classList.remove('hidden');
            finalUrlInput.value = TUNNEL_URL + "/index.html";
            alert("تم الرفع للسيرفر العالمي!");
        }
    } catch(e) { alert("خطأ في الاتصال بالسيرفر"); }
};

function copyUrl() {
    finalUrlInput.select();
    document.execCommand("copy");
    alert("تم نسخ الرابط!");
}

checkConnection();
                
