document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("fontSizeSelect");
    for (var i = 1; i <= 100; i += 0.5) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i + "pt";
        select.appendChild(option);
    }
    
    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + "年" + (currentDate.getMonth() + 1) + "月" + currentDate.getDate() + "日";
    document.getElementById("currentDate").textContent = formattedDate;
});

function showImageNameInput() {
    document.getElementById('imageNameInputContainer').style.display = 'block';
}

function addImageName() {
    const imageName = document.getElementById('imageNameInput').value;
    if (imageName) {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.textContent = '画像: ' + imageName;
        document.querySelector('article').appendChild(placeholder);
        document.getElementById('imageNameInput').value = '';
        document.getElementById('imageNameInputContainer').style.display = 'none';
    }
}

function submitChanges() {
    var doc = document.documentElement.cloneNode(true);
    doc.querySelectorAll("[contenteditable]").forEach(function(elem) {
        elem.removeAttribute("contenteditable");
    });
    var fileInputs = doc.querySelectorAll('.hidden-input');
    fileInputs.forEach(function(input) {
        input.remove();
    });
    var btnGroup = doc.querySelector('.btn-group');
    if (btnGroup) {
        btnGroup.remove();
    }
    var imageNameInputContainer = doc.querySelector('#imageNameInputContainer');
    if (imageNameInputContainer) {
        imageNameInputContainer.remove();
    }
    var placeholders = doc.querySelectorAll('.placeholder');
    placeholders.forEach(function(placeholder) {
        const imgName = placeholder.textContent.replace('画像: ', '');
        const imgTag = document.createElement('img');
        imgTag.src = imgName;
        imgTag.alt = imgName;
        placeholder.replaceWith(imgTag);
    });
    var outputDiv = doc.querySelector('#output');
    if (outputDiv) {
        outputDiv.remove();
    }
    var html = new XMLSerializer().serializeToString(doc);
    document.getElementById('output').textContent = html;
}

function copyToClipboard() {
    var copyText = document.getElementById("output");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert("HTMLコードがクリップボードにコピーされました。");
}

function addHorizontalLine() {
    var hr = document.createElement("hr");
    document.querySelector('article').appendChild(hr);
}

function changeFontSize() {
    var size = document.getElementById("fontSizeSelect").value;
    if (size) {
        document.execCommand("styleWithCSS", false, true);
        var span = document.createElement("span");
        span.style.fontSize = size + "pt";
        if (window.getSelection().rangeCount > 0) {
            var range = window.getSelection().getRangeAt(0);
            range.surroundContents(span);
        }
    }
}

function getComputedFontSize(element) {
    return parseFloat(window.getComputedStyle(element).fontSize);
}

function updateFontSizeSelector() {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var parentElement = range.startContainer.parentElement;
        var fontSize = getComputedFontSize(parentElement);
        document.getElementById("fontSizeSelect").value = (fontSize / 1.33333).toFixed(1); // Convert px to pt
    }
}

document.addEventListener('selectionchange', updateFontSizeSelector);

function makeLinks(content) {
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return content.replace(urlPattern, function(url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

document.getElementById('contentEditable').addEventListener('input', function(event) {
    const content = event.target.innerHTML;
    const newContent = makeLinks(content);
    if (content !== newContent) {
        event.target.innerHTML = newContent;
        setCaretAtEnd(event.target);
    }
});

function setCaretAtEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
}
