document.addEventListener('DOMContentLoaded', () => {
    
    // Проверяем, есть ли на странице элемент канвас (значит мы на Главной)
    const canvas = document.getElementById('waveCanvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const recordBtn = document.getElementById('recordBtn');
        const ringResult = document.getElementById('ringResult');
        const h1 = document.querySelector('h1');
        const p = document.querySelector('.subtitle');

        // Настройка размеров канваса
        canvas.width = 600;
        canvas.height = 300;

        let isRecording = false;
        let animationId;
        let step = 0;

        // Функция рисования волны
        function drawWave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#d4af37'; 
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#d4af37';
            ctx.beginPath();
            
            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + Math.sin(x * 0.02 + step) * 50 * Math.sin(step * 0.1);
                ctx.lineTo(x, y);
            }
            
            ctx.stroke();
            step += 0.1;
            animationId = requestAnimationFrame(drawWave);
        }

        // Клик по кнопке
        recordBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Чтобы страница не прыгала
            if (!isRecording) {
                isRecording = true;
                recordBtn.innerHTML = "Идет запись...";
                recordBtn.classList.add('recording');
                
                canvas.style.opacity = '1';
                drawWave(); 
                
                h1.style.opacity = '0.3';
                p.style.opacity = '0.3';
                h1.style.transition = '0.5s';
                p.style.transition = '0.5s';

                setTimeout(() => {
                    stopRecording();
                }, 4000);
            }
        });

        function stopRecording() {
            isRecording = false;
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            recordBtn.style.display = 'none'; 
            canvas.style.display = 'none'; 
            
            ringResult.style.display = 'flex';
            h1.innerHTML = "Ваш голос воплощен";
            h1.style.opacity = '1';
            p.innerHTML = "Уникальная форма, созданная вашим тембром.";
            p.style.opacity = '1';
        }
    }
});