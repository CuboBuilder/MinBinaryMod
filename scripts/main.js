const ui = require("ui_lib/library");

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

function createCustomDialog() {
    const dialog = new BaseDialog("MinBinary");

    dialog.cont.add("[blue]MinBinary").pad(10).center();
    dialog.cont.row();

    dialog.cont.add("[green]Click buttons to encode or decode text.").pad(10).center();
    dialog.cont.row();

    dialog.cont.button("Encode Text", () => {
        Vars.ui.showTextInput("Enter text to encode:", "Text:", "", (inputText) => {
            const encodedText = encodeText(inputText);
            Core.app.setClipboardText(encodedText);
            Vars.ui.showInfo("Encoded text copied to clipboard!");
        });
    }).size(240, 50).pad(10);

    dialog.cont.row();

    dialog.cont.button("Decode Text", () => {
        Vars.ui.showConfirm("Decode Text", "Text will be copied from your clipboard. Proceed?", () => {
            const clipboardText = Core.app.getClipboardText();

            if (clipboardText) {
                const decodedText = decodeText(clipboardText);
                Vars.ui.showInfo("Decoded Text: " + decodedText);
            } else {
                Vars.ui.showInfo("Clipboard is empty, cannot decode.");
            }
        });
    }).size(240, 50).pad(10);

    dialog.addCloseButton();
    dialog.show();
}

ui.onLoad(() => {
    Vars.ui.schematics.buttons.button("Text Encoder/Decoder", Icon.paste, () => {
        createCustomDialog();
    });
});
