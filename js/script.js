

document.addEventListener('DOMContentLoaded', function () {
    const BOT_TOKEN = '8166512734:AAErQSKadBJyIKXgCQbDdDggcsJvCUiWq8o';
    const CHAT_ID = '1421075571';

    // ===== 📩 Основна контактна форма
    const contactForm = document.getElementById("myForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);

            const firstName = formData.get("firstname");
            const lastName = formData.get("lastname");
            const email = formData.get("email");
            const country = formData.get("country");
            const phone = formData.get("phone");
            const message = formData.get("message");

            try {
                const textMessage =
                    `📨 *New Form Submission:*\n\n` +
                    `👤 First Name: ${firstName}\n` +
                    `👥 Last Name: ${lastName}\n` +
                    `📧 Email: ${email}\n` +
                    `🌍 Country: ${country}\n` +
                    `📞 Phone: ${phone}\n` +
                    `💬 Message:\n${message}`;

                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: textMessage,
                        parse_mode: 'Markdown'
                    })
                });

                alert("✅ Successfully submitted!");
                contactForm.reset();
            } catch (error) {
                console.error("Error sending to Telegram:", error);
                alert("❌ An error occurred while sending the form.");
            }
        });
    }

    // ===== 📨 Форма підписки
    const subscribeForm = document.getElementById("subscribe-form");
    if (subscribeForm) {
        subscribeForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input[name="email"]');
            const email = emailInput.value;

            try {
                const textMessage =
                    `📬 *New Newsletter Subscription:*\n\n` +
                    `📧 Email: ${email}`;

                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: textMessage,
                        parse_mode: 'Markdown'
                    })
                });

                alert("✅ Subscription successful!");
                subscribeForm.reset();
            } catch (error) {
                console.error("Error sending subscription:", error);
                alert("❌ Failed to subscribe.");
            }
        });
    }


    const burger = document.getElementById('burger-menu');
    const menu = document.getElementById('menu');
    const info = document.getElementById('info');
    const img = document.getElementById('img');

    burger.addEventListener('click', () => {
        burger.classList.toggle('close');
        menu.classList.toggle('overlay');

        info.classList.toggle('fade-out');
        img.classList.toggle('fade-out');
    });




    document.querySelectorAll('.accordion-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    const pageUpBtn = document.getElementById("pageUpBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 1600) {
            pageUpBtn.style.display = "block";
        } else {
            pageUpBtn.style.display = "none";
        }
    });

    pageUpBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const countrySelect = document.getElementById("country");
    const phoneInput = document.getElementById("phone");

    const countryCodes = {
        US: "+1",
        UA: "+380"
    };

    countrySelect.addEventListener("change", () => {
        const code = countryCodes[countrySelect.value];
        phoneInput.value = code;
        phoneInput.focus();
        phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    });

    phoneInput.addEventListener("input", () => {
        const code = countryCodes[countrySelect.value];
        if (!phoneInput.value.startsWith(code)) {
            phoneInput.value = code;
            phoneInput.setSelectionRange(code.length, code.length);
        }
    });


    new WOW().init();
});




