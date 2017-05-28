// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPLv3.0
(function() {
    var fn = null;
    var inputEl = document.getElementById("input");
    var outputEl = document.getElementById("output");
    var formatsEl = document.getElementById("formats");
    var events = ["keydown", "keyup", "change"];

    function update() {
        outputEl.textContent = fn(inputEl.value);
    }

    events.map(function(eventKey) {
        inputEl.addEventListener(eventKey, update);
    });

    Convert.formats.map(function(format, k) {
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "fromat";
        if (k === 0) {
            radio.checked = true;
            fn = format.fn;
        }
        radio.onclick = function() {
            fn = format.fn;
            update();
        }

        var label = document.createElement("label");
        var labelText = document.createElement("span");
        labelText.textContent = format.fn(format.key);
        label.appendChild(radio);
        label.appendChild(labelText);
        label.style.display = "block";

        formatsEl.appendChild(label, inputEl);
    });

    update();
})();
