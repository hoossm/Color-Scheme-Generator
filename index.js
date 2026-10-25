
const colorPicker = document.getElementById("seed-color")
const colorScheme = document.getElementById("color-scheme")
const getSchemeBtn = document.getElementById("get-scheme")

getSchemeBtn.addEventListener("click", function () {
    const seedColor = colorPicker.value.replace("#", "")
    const mode = colorScheme.value

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {

            const colorContainer = document.getElementById("color-container")

            colorContainer.innerHTML = data.colors.map(color => `
                <div class="color-column">
                    <div class="color-box" style="background-color: ${color.hex.value}"></div>
                    <p class="color-hex">${color.hex.value}</p>
                </div>
                
            `).join("")





            document.querySelectorAll(".color-column").forEach(column => {
                const colorBox = column.querySelector(".color-box");
                const colorHex = column.querySelector(".color-hex");
                const hex = colorHex.textContent;

                async function copyColor() {
                    try {
                        await navigator.clipboard.writeText(hex);

                        colorHex.textContent = "Copied!";

                        setTimeout(() => {
                            colorHex.textContent = hex;
                        }, 1000);

                    } catch (error) {
                        console.error("Failed to copy:", error);
                    }
                }

                colorBox.addEventListener("click", copyColor);
                colorHex.addEventListener("click", copyColor);
            });




        })
})
