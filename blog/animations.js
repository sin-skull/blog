document.addEventListener('DOMContentLoaded', function() {
    let clickCount = 0;
    const h2Element = document.querySelector('.contact h2');

    h2Element.addEventListener('click', function() {
        clickCount++;
        if (clickCount >= 10) {
            window.open('index.html', '_blank');
            clickCount = 0;
        }

        // クリック時にh2要素を少し大きくするアニメーション
        h2Element.style.transition = "transform 0.2s";
        h2Element.style.transform = "scale(1.1)";
        setTimeout(() => {
            h2Element.style.transform = "scale(1)";
        }, 200);
    });

    // ページ読み込み時にフェードインアニメーションを追加
    const contactSection = document.querySelector('.contact');
    contactSection.style.opacity = 0;
    contactSection.style.transition = "opacity 1s";
    window.onload = () => {
        contactSection.style.opacity = 1;
    };

    // ボタンにホバーアニメーションを追加
    const buttons = document.querySelectorAll('.contact form button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            button.style.transition = "background-color 0.3s, transform 0.3s";
            button.style.backgroundColor = "#45a049";
            button.style.transform = "scale(1.05)";
        });

        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = "#4CAF50";
            button.style.transform = "scale(1)";
        });
    });

    // フォーム要素にフォーカス時のアニメーションを追加
    const formElements = document.querySelectorAll('.contact form input, .contact form textarea');
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            element.style.transition = "border-color 0.3s, box-shadow 0.3s";
            element.style.borderColor = "#4CAF50";
            element.style.boxShadow = "0 0 5px rgba(76, 175, 80, 0.5)";
        });

        element.addEventListener('blur', function() {
            element.style.borderColor = "#ddd";
            element.style.boxShadow = "none";
        });
    });

    // ページスクロール時にフォームセクションがフェードインするアニメーション
    window.addEventListener('scroll', function() {
        const formSection = document.querySelector('.contact form');
        const sectionPos = formSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            formSection.style.opacity = 1;
            formSection.style.transform = "translateY(0)";
            formSection.style.transition = "opacity 1s, transform 1s";
        }
    });
});