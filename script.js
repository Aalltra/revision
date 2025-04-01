document.addEventListener('DOMContentLoaded', () => {
    const fish = document.querySelector('.fish');
    const tail = document.querySelector('.fish-tail');
    const finTop = document.querySelector('.fish-fin-top');
    const finBottom = document.querySelector('.fish-fin-bottom');
    const finSide = document.querySelector('.fish-fin-side');
    const scales = document.querySelectorAll('.fish-scale');
    const bubbles = document.querySelectorAll('.bubble');
    const eye = document.querySelector('.fish-eye');
    const pupil = document.querySelector('.fish-pupil');
    const iris = document.querySelector('.fish-iris');
    const patterns = document.querySelectorAll('.fish-pattern');
    const spots = document.querySelectorAll('.fish-spots');
    
    createParticles();
    
    function updateEyePosition(e) {
        const mouseX = e.clientX || (e.touches && e.touches[0].clientX) || window.innerWidth / 2;
        const mouseY = e.clientY || (e.touches && e.touches[0].clientY) || window.innerHeight / 2;
        
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        
        const maxMove = 2;
        const moveX = Math.min(Math.max(deltaX / 20, -maxMove), maxMove);
        const moveY = Math.min(Math.max(deltaY / 20, -maxMove), maxMove);
        
        pupil.setAttribute('cx', 137 + moveX);
        pupil.setAttribute('cy', 45 + moveY);
    }
    
    document.addEventListener('mousemove', updateEyePosition);
    document.addEventListener('touchmove', updateEyePosition);
    
    function swim() {
        tail.animate([
            { transform: 'rotate(-15deg)' },
            { transform: 'rotate(15deg)' },
            { transform: 'rotate(-15deg)' }
        ], {
            duration: 1000,
            easing: 'ease-in-out',
            iterations: 1
        });
        
        fish.animate([
            { transform: 'translateX(-5px) translateY(2px) scale(1)' },
            { transform: 'translateX(5px) translateY(-2px) scale(1.03)' },
            { transform: 'translateX(-5px) translateY(2px) scale(1)' }
        ], {
            duration: 2000,
            easing: 'ease-in-out',
            iterations: 1
        });
        
        finTop.animate([
            { transform: 'rotate(-5deg) scale(1.05)' },
            { transform: 'rotate(3deg) scale(0.95)' },
            { transform: 'rotate(-5deg) scale(1.05)' }
        ], {
            duration: 1500, 
            easing: 'ease-in-out',
            iterations: 1
        });
        
        finBottom.animate([
            { transform: 'rotate(5deg) scale(1.05)' },
            { transform: 'rotate(-3deg) scale(0.95)' },
            { transform: 'rotate(5deg) scale(1.05)' }
        ], {
            duration: 1500,
            easing: 'ease-in-out',
            iterations: 1
        });
        
        finSide.animate([
            { transform: 'rotate(-5deg) translateX(-2px)' },
            { transform: 'rotate(5deg) translateX(2px)' },
            { transform: 'rotate(-5deg) translateX(-2px)' }
        ], {
            duration: 1200,
            easing: 'ease-in-out',
            iterations: 1
        });
        
        patterns.forEach((pattern, index) => {
            setTimeout(() => {
                pattern.animate([
                    { opacity: 0.4 },
                    { opacity: 0.6 },
                    { opacity: 0.4 }
                ], {
                    duration: 1200,
                    easing: 'ease-in-out',
                    iterations: 1
                });
            }, index * 100);
        });
        
        spots.forEach((spot, index) => {
            setTimeout(() => {
                spot.animate([
                    { opacity: 0.6, r: spot.getAttribute('r') },
                    { opacity: 0.8, r: parseFloat(spot.getAttribute('r')) * 1.2 },
                    { opacity: 0.6, r: spot.getAttribute('r') }
                ], {
                    duration: 800,
                    easing: 'ease-in-out',
                    iterations: 1
                });
            }, index * 70);
        });
        
        iris.animate([
            { r: 4.5 },
            { r: 4.0 },
            { r: 4.5 }
        ], {
            duration: 1500,
            easing: 'ease-in-out',
            iterations: 1
        });
        
        scales.forEach((scale, index) => {
            setTimeout(() => {
                scale.animate([
                    { transform: 'scale(1)', fill: '#ffb380' },
                    { transform: 'scale(1.1)', fill: '#ffd1b3' },
                    { transform: 'scale(1)', fill: '#ffb380' }
                ], {
                    duration: 500,
                    easing: 'ease-in-out',
                    iterations: 1
                });
            }, index * 30);
        });
        
        const randomBubbles = Array.from(bubbles).sort(() => 0.5 - Math.random()).slice(0, 3);
        randomBubbles.forEach(bubble => {
            bubble.animate([
                { transform: 'translateY(0) scale(1)', opacity: 0.7 },
                { transform: 'translateY(-20px) scale(1.2)', opacity: 0.9 },
                { transform: 'translateY(-40px) scale(0.8)', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out',
                iterations: 1
            });
        });
    }
    
    setInterval(swim, 3000);
    swim();
    
    const title = document.querySelector('.title');
    const titleBubbles = document.createElement('div');
    titleBubbles.classList.add('title-bubbles');
    title.appendChild(titleBubbles);
    
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('title-bubble');
        
        const size = 3 + Math.random() * 8;
        
        const left = Math.random() * 100;
        const top = 60 + Math.random() * 40;
        
        const delay = Math.random() * 3;
        
        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: ${top}%;
            animation-delay: ${delay}s;
        `;
        
        titleBubbles.appendChild(bubble);
    }
    
    setInterval(() => {
        title.style.transform = `translateY(${Math.sin(Date.now() / 500) * 3}px)`;
    }, 100);
    
    fish.addEventListener('click', () => {
        fish.animate([
            { transform: 'rotate(0) scale(1)' },
            { transform: 'rotate(360deg) scale(1.2)' },
            { transform: 'rotate(720deg) scale(0.9)' },
            { transform: 'rotate(1080deg) scale(1)' }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
        });
        
        document.querySelector('.fish-body').animate([
            { fill: '#ff9d5c', filter: 'drop-shadow(0 0 5px rgba(255, 157, 92, 0.5))' },
            { fill: '#ffcc00', filter: 'drop-shadow(0 0 15px rgba(255, 204, 0, 0.8))' },
            { fill: '#ffaa33', filter: 'drop-shadow(0 0 10px rgba(255, 170, 51, 0.7))' },
            { fill: '#ff9d5c', filter: 'drop-shadow(0 0 5px rgba(255, 157, 92, 0.5))' }
        ], {
            duration: 1500,
            easing: 'ease-in-out'
        });
        
        scales.forEach((scale, index) => {
            scale.animate([
                { transform: 'scale(1)', fill: '#ffb380' },
                { transform: 'scale(1.3)', fill: '#ffdd99' },
                { transform: 'scale(1)', fill: '#ffb380' }
            ], {
                delay: index * 20,
                duration: 800,
                easing: 'ease-in-out'
            });
        });
        
        const fishRect = fish.getBoundingClientRect();
        const fishContainer = document.querySelector('.fish-container');
        
        for(let i = 0; i < 5; i++) {
            const extraBubble = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            extraBubble.setAttribute('class', 'bubble');
            extraBubble.setAttribute('cx', 40 + Math.random() * 20);
            extraBubble.setAttribute('cy', 40 + Math.random() * 20);
            extraBubble.setAttribute('r', 1 + Math.random() * 3);
            extraBubble.setAttribute('fill', '#fff');
            extraBubble.setAttribute('opacity', '0.7');
            
            fish.appendChild(extraBubble);
            
            extraBubble.animate([
                { transform: 'translateY(0) scale(1)', opacity: 0.7 },
                { transform: 'translateY(-60px) scale(1.3)', opacity: 0.5 },
                { transform: 'translateY(-100px) scale(0.5)', opacity: 0 }
            ], {
                duration: 1500 + Math.random() * 1000,
                easing: 'ease-out'
            });
            
            setTimeout(() => {
                extraBubble.remove();
            }, 2500);
        }
        
        createWaterRipple();
        
        title.animate([
            { textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)' },
            { textShadow: '0 0 15px rgba(255, 204, 0, 0.8), 0 0 20px rgba(255, 204, 0, 0.5)' },
            { textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)' }
        ], {
            duration: 1500,
            easing: 'ease-in-out'
        });
        
        createTitleFishIcons();
    });
    
    function createTitleFishIcons() {
        const title = document.querySelector('.title');
        const titleRect = title.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const fishIcon = document.createElement('div');
            fishIcon.innerHTML = i % 2 === 0 ? '🐠' : '🐡';
            fishIcon.style.cssText = `
                position: absolute;
                top: ${titleRect.top + Math.random() * titleRect.height}px;
                left: ${titleRect.left + Math.random() * titleRect.width}px;
                font-size: 1rem;
                opacity: 0;
                z-index: 10;
                transform-origin: center;
                animation: fishIconAnim 2s forwards;
            `;
            
            const angle = Math.random() * 360;
            const distance = 50 + Math.random() * 100;
            
            const keyframes = `
                @keyframes fishIconAnim {
                    0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1); opacity: 0; }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            document.body.appendChild(fishIcon);
            
            setTimeout(() => {
                fishIcon.remove();
                style.remove();
            }, 2000);
        }
    }
    
    function createParticles() {
        const container = document.querySelector('.container');
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'water-particle';
            
            const size = 1 + Math.random() * 4;
            const blueHue = 180 + Math.random() * 40;
            const opacity = 0.1 + Math.random() * 0.3;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: hsla(${blueHue}, 70%, 70%, ${opacity});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${5 + Math.random() * 15}s linear infinite;
                z-index: 0;
            `;
            
            const keyframes = `
                @keyframes floatParticle {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(${Math.random() * 30 - 15}px, ${-Math.random() * 30}px) rotate(${Math.random() * 360}deg); }
                    66% { transform: translate(${Math.random() * 30 - 15}px, ${-Math.random() * 30}px) rotate(${Math.random() * 360}deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            container.appendChild(particle);
        }
        
        for (let i = 0; i < 5; i++) {
            const plankton = document.createElement('div');
            const isSmallFish = Math.random() > 0.7;
            
            plankton.innerHTML = isSmallFish ? 
                `<svg width="14" height="8" viewBox="0 0 14 8">
                    <path d="M2,4 C3,2 5,1 7,2 C9,3 11,2 12,4 C11,6 9,7 7,6 C5,5 3,6 2,4 Z" 
                    fill="${Math.random() > 0.5 ? '#88a' : '#8aa'}" opacity="0.6" />
                </svg>` : 
                `<svg width="6" height="6" viewBox="0 0 6 6">
                    <circle cx="3" cy="3" r="2" fill="#8ac" opacity="0.5" />
                    <path d="M1,3 Q3,1 5,3 Q3,5 1,3" fill="#8ac" opacity="0.3" />
                </svg>`;
                
            plankton.style.cssText = `
                position: absolute;
                top: ${20 + Math.random() * 60}%;
                left: ${Math.random() * 100}%;
                transform: scale(${0.5 + Math.random() * 0.5});
                animation: planktonFloat ${15 + Math.random() * 20}s linear infinite;
                z-index: 0;
            `;
            
            const keyframes = `
                @keyframes planktonFloat {
                    0% { transform: translate(0, 0) ${isSmallFish ? 'rotate(0deg)' : ''}; }
                    25% { transform: translate(${-Math.random() * 100}px, ${Math.random() * 30 - 15}px) ${isSmallFish ? 'rotate(-5deg)' : ''}; }
                    50% { transform: translate(${-Math.random() * 200}px, ${Math.random() * 30 - 15}px) ${isSmallFish ? 'rotate(5deg)' : ''}; }
                    75% { transform: translate(${-Math.random() * 300}px, ${Math.random() * 30 - 15}px) ${isSmallFish ? 'rotate(-5deg)' : ''}; }
                    100% { transform: translate(${-Math.random() * 400}px, ${Math.random() * 30 - 15}px) ${isSmallFish ? 'rotate(0deg)' : ''}; }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            document.body.appendChild(plankton);
        }
    }
    
    function createWaterRipple() {
        const fishRect = fish.getBoundingClientRect();
        const ripple = document.createElement('div');
        const rippleSize = 100;
        
        ripple.className = 'water-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: ${fishRect.top + fishRect.height/2 - rippleSize/2}px;
            left: ${fishRect.left + fishRect.width/2 - rippleSize/2}px;
            width: ${rippleSize}px;
            height: ${rippleSize}px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.5);
            animation: rippleEffect 1.5s ease-out forwards;
            z-index: 0;
        `;
        
        const keyframes = `
            @keyframes rippleEffect {
                0% { transform: scale(0); opacity: 0.8; border-width: 3px; }
                50% { border-width: 2px; }
                100% { transform: scale(3); opacity: 0; border-width: 1px; }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 1500);
    }
    
    animateWaterAmbience();
    
    function animateWaterAmbience() {
        const svg = document.querySelector('.background-elements');
        
        for (let i = 0; i < 3; i++) {
            const wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const yPos = 40 + i * 20;
            
            wave.setAttribute('d', `M0,${yPos} Q200,${yPos-10} 400,${yPos} T800,${yPos}`);
            wave.setAttribute('fill', 'none');
            wave.setAttribute('stroke', '#ffffff');
            wave.setAttribute('stroke-width', '0.5');
            wave.setAttribute('opacity', '0.2');
            
            const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate.setAttribute('attributeName', 'd');
            animate.setAttribute('values', 
                `M0,${yPos} Q200,${yPos-10} 400,${yPos} T800,${yPos};
                 M0,${yPos} Q200,${yPos+10} 400,${yPos} T800,${yPos};
                 M0,${yPos} Q200,${yPos-10} 400,${yPos} T800,${yPos}`
            );
            animate.setAttribute('dur', `${7 + i * 2}s`);
            animate.setAttribute('repeatCount', 'indefinite');
            
            wave.appendChild(animate);
            svg.appendChild(wave);
        }
    }
});