// カムトゥル 漢方相談サイト - JavaScript

document.addEventListener("DOMContentLoaded", function () {
    // ヘッダースクロール制御
    const header = document.getElementById("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // モバイルメニュー
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });

    // ナビリンククリックでメニュー閉じる
    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("open");
            menuToggle.classList.remove("active");
        });
    });

    // FAQ アコーディオン
    document.querySelectorAll(".faq-question").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var item = this.parentElement;
            var answer = item.querySelector(".faq-answer");
            var isActive = item.classList.contains("active");

            // 他のFAQを閉じる
            document.querySelectorAll(".faq-item").forEach(function (other) {
                other.classList.remove("active");
                other.querySelector(".faq-answer").style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 数字カウントアップアニメーション
    function animateCountUp(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    // スクロールアニメーション (Intersection Observer)
    var observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    // フェードインアニメーション
    var fadeElements = document.querySelectorAll(
        ".feature-card, .service-card, .flow-step, .symptom-card, .about-content, .section-header"
    );

    fadeElements.forEach(function (el) {
        el.classList.add("fade-in");
    });

    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function (el) {
        fadeObserver.observe(el);
    });

    // カウントアップアニメーション
    var statNumbers = document.querySelectorAll(".stat-number");
    var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCountUp(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
        countObserver.observe(el);
    });

    // フォーム送信
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var name = document.getElementById("name").value.trim();
            var email = document.getElementById("email").value.trim();

            if (!name || !email) {
                alert("お名前とメールアドレスは必須です。");
                return;
            }

            // 送信成功メッセージ
            var btn = form.querySelector('button[type="submit"]');
            var originalText = btn.textContent;
            btn.textContent = "送信しました！";
            btn.disabled = true;
            btn.style.background = "#6a9e78";

            setTimeout(function () {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = "";
                form.reset();
            }, 3000);
        });
    }

    // スムーススクロール (Safari対応)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            var targetId = this.getAttribute("href");
            if (targetId === "#") return;
            var target = document.querySelector(targetId);
            if (target) {
                var headerHeight = header.offsetHeight;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
