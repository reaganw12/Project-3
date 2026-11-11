
        const tsprecord = document.querySelector('.TSP-Record');
        const needle = document.querySelector('.Record-Needle');
        const tspaudio = document.getElementById('TSP-Audio');
        let playTimer;

        tsprecord.addEventListener('click', function() {
            // If record is NOT playing yet:
            if (!tsprecord.classList.contains('is-playing')) {
                
                // 1. Glide record onto the turntable (takes 1.4s)
                tsprecord.classList.add('is-playing');

                // 2. Swing needle onto the record after 1.4s
                playTimer = setTimeout(() => {
                    needle.classList.add('needle-active');

                    // 3. Start song audio after needle finishes swinging (0.6s)
                    setTimeout(() => {
                        tspaudio.play();
                    }, 600);
                }, 1400);

            } else {
                // If clicked again while playing: lift needle, stop audio, return record
                clearTimeout(playTimer);
                needle.classList.remove('needle-active');
                tspaudio.pause();
                tspaudio.currentTime = 0;

                // Wait 0.5s for needle to clear before sliding record back
                setTimeout(() => {
                    tsprecord.classList.remove('is-playing');
                }, 500);
            }
        });
