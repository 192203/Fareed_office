/* =====================================================
   LAW OFFICE WEBSITE
   MOBILE INTERACTIONS
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");


/* فتح القائمة */

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.add("active");

        document.body.style.overflow = "hidden";

    });

}


/* غلق القائمة */

if (closeMenu && mobileMenu) {

    closeMenu.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        document.body.style.overflow = "";

    });

}


/* =====================================================
   CLOSE MENU AFTER CLICK
===================================================== */

if (mobileMenu) {

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            document.body.style.overflow = "";

        });

    });

}


/* =====================================================
   CLOSE MENU WITH ESC
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (mobileMenu) {

            mobileMenu.classList.remove("active");

            document.body.style.overflow = "";

        }

    }

});


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header =
    document.querySelector(".site-header");


window.addEventListener("scroll", () => {

    if (!header) return;


    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".service-card, .why-card, .about-content, .contact-item, .contact-form"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}


/* =====================================================
   EMAILJS CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const button =
                contactForm.querySelector(
                    ".premium-submit"
                );


            const buttonText =
                button
                    ? button.querySelector("span")
                    : null;


            /* =================================================
               CHECK EMAILJS
            ================================================= */

            if (typeof emailjs === "undefined") {

                console.error(
                    "EmailJS library is not loaded."
                );


                showToast(
                    "error",
                    "تعذر الاتصال بخدمة الإرسال. تأكد من تحميل EmailJS."
                );


                return;

            }


            /* =================================================
               BUTTON LOADING
            ================================================= */

            if (button) {

                button.disabled = true;

            }


            if (buttonText) {

                buttonText.textContent =
                    "جاري إرسال الاستشارة...";

            }


            /* =================================================
               SEND EMAIL
            ================================================= */

            emailjs.sendForm(

                "service_v2wehzz",

                "template_f86ls8p",

                contactForm

            )

            /* =================================================
               SUCCESS
            ================================================= */

            .then(function () {

                console.log(
                    "EmailJS: Message sent successfully."
                );


                /* إظهار رسالة النجاح */

                showToast(
                    "success",
                    "تم إرسال الاستشارة بنجاح، وسنتواصل معك قريبًا."
                );


                /* تنظيف النموذج */

                contactForm.reset();


                /* تغيير الزر */

                if (button) {

                    button.classList.add("sent");

                }


                if (buttonText) {

                    buttonText.textContent =
                        "تم الإرسال ✓";

                }


                /* إعادة الزر بعد 4 ثواني */

                setTimeout(function () {

                    if (button) {

                        button.classList.remove("sent");

                    }


                    if (buttonText) {

                        buttonText.textContent =
                            "إرسال الاستشارة";

                    }

                }, 4000);

            })


            /* =================================================
               ERROR
            ================================================= */

            .catch(function (error) {

                console.error(
                    "EmailJS Error:",
                    error
                );


                showToast(
                    "error",
                    "حدث خطأ أثناء إرسال الاستشارة، حاول مرة أخرى."
                );


                if (buttonText) {

                    buttonText.textContent =
                        "إرسال الاستشارة";

                }

            })


            /* =================================================
               FINALLY
            ================================================= */

            .finally(function () {

                if (button) {

                    button.disabled = false;

                }

            });

        }

    );

}


/* =====================================================
   TOP TOAST MESSAGE
   تظهر فوق الـ HEADER
===================================================== */

let toastTimer = null;


function showToast(type, message) {

    /* لو الرسالة غير موجودة في HTML */

    let toast =
        document.getElementById("formMessage");


    /* إنشاء الرسالة لو مش موجودة */

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "formMessage";

        document.body.appendChild(toast);

    }


    /* مهم جدًا:
       نقل الرسالة مباشرة إلى BODY */

    if (toast.parentElement !== document.body) {

        document.body.appendChild(toast);

    }


    /* إلغاء أي مؤقت قديم */

    if (toastTimer) {

        clearTimeout(toastTimer);

    }


    /* نوع الرسالة */

    toast.className =
        "form-message " + type;


    /* النص */

    toast.textContent =
        message;


    /* إجبار المتصفح على تحديث الشكل */

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });


    /* اختفاء بعد 4 ثواني */

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

            toast.className =
                "form-message";

            toast.textContent =
                "";

        }, 4000);

}


/* =====================================================
   CURRENT YEAR
===================================================== */

const footerYear =
    document.querySelector(".footer-bottom");


if (footerYear) {

    footerYear.innerHTML =
        `© ${new Date().getFullYear()} فريد حسام عبدالهادي — جميع الحقوق محفوظة`;

}


/* =====================================================
   PREVENT EMPTY WHATSAPP LINK
===================================================== */

const whatsappLinks =
    document.querySelectorAll(
        'a[href="https://wa.me/"]'
    );


whatsappLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();


        alert(
            "يرجى إضافة رقم واتساب المكتب أولاً."
        );

    });

});


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "⚖️ Law Office Website Loaded Successfully"
);