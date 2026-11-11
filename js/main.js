
const needle = document.querySelector('.Record-Needle');
let playTimer;
let audioTimer;

function setupRecord(recordSelector, audioId) {
    const record = document.querySelector(recordSelector);
    const audio = document.getElementById(audioId);

    if (!record || !audio) {
        console.warn(`Missing element for ${recordSelector} or #${audioId}`);
        return;
    }

    record.addEventListener('click', function() {
        if (!record.classList.contains('is-playing')) {
            
            document.querySelectorAll('.is-playing').forEach(r => r.classList.remove('is-playing'));
            document.querySelectorAll('audio').forEach(a => {
                a.pause();
                a.currentTime = 0;
            });
            clearTimeout(playTimer);
            clearTimeout(audioTimer);
            needle.classList.remove('needle-active');

            // 1. Glide record onto the turntable (1.4s)
            record.classList.add('is-playing');

            // 2. Swing needle onto the record after 1.4s
            playTimer = setTimeout(() => {
                needle.classList.add('needle-active');

                // 3. Start song audio after needle finishes swinging (0.6s)
                audioTimer = setTimeout(() => {
                    audio.play();
                }, 600);
            }, 1400);

        } else {
            // Lift needle, stop audio, return record
            clearTimeout(playTimer);
            clearTimeout(audioTimer);
            needle.classList.remove('needle-active');
            audio.pause();
            audio.currentTime = 0;

            setTimeout(() => {
                record.classList.remove('is-playing');
            }, 500);
        }
    });
}

setupRecord('.TSP-Record', 'TSP-Audio');
setupRecord('.AIC-Record', 'AIC-Audio');
setupRecord('.Hole-Record', 'Hole-Audio');
