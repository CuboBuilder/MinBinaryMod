const ui = require("ui_lib/library");

// Функции для шифрования и расшифрования текста
function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}

function binaryToCustom(binaryString) {
    return binaryString.replace(/0/g, '').replace(/1/g, '');
}

function customToBinary(customString) {
    return customString.replace(//g, '0').replace(//g, '1');
}

function binaryToText(binaryString) {
    let text = '';
    for (let i = 0; i < binaryString.length; i += 8) {
        text += String.fromCharCode(parseInt(binaryString.slice(i, i + 8), 2));
    }
    return text;
}

function encodeText(text) {
    const binaryString = textToBinary(text);
    const customBinaryString = binaryToCustom(binaryString);
    return customBinaryString;
}

function decodeText(customString) {
    const binaryString = customToBinary(customString);
    const text = binaryToText(binaryString);
    return text;
}

// Добавление кнопки для шифрования текста
ui.addMenuButton("Encode Text", "paste", () => {
    Vars.ui.showTextInput("Enter text to encode:", "Text:", "", (inputText) => {
        const encodedText = encodeText(inputText);
        // Копируем результат в буфер обмена
        Core.app.setClipboardText(encodedText);
        Vars.ui.showInfo("Encoded text copied to clipboard!");
    });
});

// Добавление кнопки для расшифрования текста
ui.addMenuButton("Decode Text", "paste", () => {
    // Предупреждение перед декодированием текста из буфера обмена
    Vars.ui.showConfirm("Decode Text", "Text will be copied from your clipboard. Proceed?", () => {
        // Получаем текст из буфера обмена
        const clipboardText = Core.app.getClipboardText();
        
        if (clipboardText) {
            // Выполняем декодирование текста
            const decodedText = decodeText(clipboardText);
            Vars.ui.showInfo("Decoded Text: " + decodedText);
        } else {
            // Сообщение, если буфер обмена пуст
            Vars.ui.showInfo("Clipboard is empty, cannot decode.");
        }
    });
});
