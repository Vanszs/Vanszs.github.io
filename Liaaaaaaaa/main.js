onload = () =>{
        document.body.classList.remove("container");
};

// Advanced per-flower + wind interaction
(function(){
        const root = document.documentElement;
        const flowers = Array.from(document.querySelectorAll('.flower'));
        const states = flowers.map(()=>({current:0,target:0}));
        const maxDeg = 18; // per flower bend
        const windMax = 10;
        let windCurrent = 0, windTarget = 0;
        let active = false;
        let lastX = null, lastT = null;
        const easeFlower = 0.12;

        function pos(e){
                if(e.touches && e.touches.length){
                        return {x: e.touches[0].clientX, y: e.touches[0].clientY};
                }
                return {x: e.clientX, y: e.clientY};
        }

        function updateTargets(x){
                const w = window.innerWidth;
                flowers.forEach((fl,i)=>{
                        const r = fl.getBoundingClientRect();
                        const cx = r.left + r.width/2;
                        const dx = x - cx;
                        const dist = Math.abs(dx);
                        const influence = Math.max(0, 1 - dist / (w * 0.6));
                        states[i].target = (dx / w) * maxDeg * 2 * influence;
                });
        }

        function updateWind(x){
                const now = performance.now();
                if(lastX != null){
                        const dt = Math.max(16, now - lastT);
                        const vx = (x - lastX) / dt; // px/ms
                        windTarget = Math.max(-windMax, Math.min(windMax, vx * 700));
                }
                lastX = x; lastT = now;
        }

        function animate(){
                states.forEach((s,i)=>{
                        if(Math.abs(s.target - s.current) > 0.05){
                                s.current += (s.target - s.current) * easeFlower;
                        } else if(!active && Math.abs(s.current) > 0.05){
                                s.current += (0 - s.current) * easeFlower;
                        }
                        flowers[i].style.setProperty('--wiggle', s.current.toFixed(2)+'deg');
                });
                if(Math.abs(windTarget - windCurrent) > 0.05){
                        windCurrent += (windTarget - windCurrent) * 0.1;
                } else if(!active && Math.abs(windCurrent) > 0.05){
                        windCurrent += (0 - windCurrent) * 0.06;
                }
                root.style.setProperty('--wind', windCurrent.toFixed(2)+'deg');
                requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        function start(e){
                const {x} = pos(e);
                active = true;
                updateTargets(x);
                updateWind(x);
        }
        function move(e){
                if(!active) return;
                const {x} = pos(e);
                updateTargets(x);
                updateWind(x);
        }
        function end(){
                active = false;
                states.forEach(s=> s.target = 0);
                windTarget = 0;
        }
        const opts = {passive:true};
        window.addEventListener('pointerdown', start, opts);
        window.addEventListener('pointermove', move, opts);
        window.addEventListener('pointerup', end, opts);
        window.addEventListener('pointerleave', end, opts);
        window.addEventListener('touchstart', start, opts);
        window.addEventListener('touchmove', move, opts);
        window.addEventListener('touchend', end, opts);
})();
