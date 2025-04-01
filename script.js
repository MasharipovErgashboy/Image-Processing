const imageInput = document.getElementById('imageInput');
        const originalCanvas = document.getElementById('originalCanvas');
        const grayscaleCanvas = document.getElementById('grayscaleCanvas');
        const originalCtx = originalCanvas.getContext('2d');
        const grayscaleCtx = grayscaleCanvas.getContext('2d');

        imageInput.addEventListener('change', () => {
            const file = imageInput.files[0];
            if (file) {
                const img = new Image();
                img.onload = () => {
                    // Original rasmni o'rtada ko'rsatish
                    originalCanvas.width = img.width;
                    originalCanvas.height = img.height;
                    originalCtx.drawImage(img, 0, 0);

                    // Grayscale rasmni o'ng tomonda ko'rsatish
                    grayscaleCanvas.width = img.width;
                    grayscaleCanvas.height = img.height;
                    grayscaleCtx.drawImage(img, 0, 0);

                    // Tasvir piksel ma'lumotlarini olish (Grayscale uchun)
                    const imageData = grayscaleCtx.getImageData(0, 0, img.width, img.height);
                    const data = imageData.data;

                    // Har bir pikselni oq-qora formatga aylantirish
                    for (let i = 0; i < data.length; i += 4) {
                        const red = data[i];
                        const green = data[i + 1];
                        const blue = data[i + 2];
                        const avg = (red + green + blue) / 3;

                        data[i] = avg;       // Red
                        data[i + 1] = avg;   // Green
                        data[i + 2] = avg;   // Blue
                        // Alpha (data[i + 3]) saqlanib qoladi
                    }

                    // Yangilangan piksel ma'lumotlarini kanvaska chizish (Grayscale)
                    grayscaleCtx.putImageData(imageData, 0, 0);
                };

                // Tanlangan tasvirni yuklash
                img.src = URL.createObjectURL(file);
            }
        });

        // Reset Canvas function
        function resetCanvas() {
            originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
            grayscaleCtx.clearRect(0, 0, grayscaleCanvas.width, grayscaleCanvas.height);
            imageInput.value = ""; // Faylni tozalash
        }
