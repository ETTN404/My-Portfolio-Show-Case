import React, { useEffect, useRef } from 'react';

const WaveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let time = 0;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Mouse tracking for interaction
    const mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Wave parameters - larger, smoother sweeps to look like hills
    const waves = [
      { yOffset: height * 0.4, amplitude: 150, wavelength: 0.001, speed: 0.005, color: '#CCF330', opacity: 0.4 }, // Lime wave (back)
      { yOffset: height * 0.55, amplitude: 180, wavelength: 0.0008, speed: 0.007, color: '#38BDF8', opacity: 0.5 }, // Cyan wave (middle)
      { yOffset: height * 0.7, amplitude: 120, wavelength: 0.0012, speed: 0.006, color: '#10B981', opacity: 0.3 }, // Emerald wave (front)
    ];

    const render = () => {
      time += 1;
      
      // Clear canvas with deep dark blue background
      ctx.fillStyle = '#050A10';
      ctx.fillRect(0, 0, width, height);

      // Draw waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 10) { // Step by 10px
          // Base sine wave calculation with secondary sine for organic feel
          let y = wave.yOffset 
                + Math.sin(x * wave.wavelength + time * wave.speed) * wave.amplitude 
                + Math.sin(x * wave.wavelength * 2 - time * wave.speed * 0.5) * (wave.amplitude * 0.3);
          
          // Mouse interaction (repel effect)
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 350; // Interaction radius
          
          if (distance < maxDistance) {
            // Push wave away from mouse smoothly
            const force = Math.pow((maxDistance - distance) / maxDistance, 2);
            const displacement = force * 100; 
            
            if (mouse.y < y) {
              y += displacement * Math.abs(dx / maxDistance); 
            } else {
              y -= displacement * Math.abs(dx / maxDistance);
            }
          }

          ctx.lineTo(x, y);
        }
        
        // Close path to bottom of screen to fill it
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        // Create 3D gradient fill for the "hill"
        // Starts slightly transparent at the crest and fades into the dark background
        const gradient = ctx.createLinearGradient(0, wave.yOffset - wave.amplitude, 0, height);
        gradient.addColorStop(0, `rgba(15, 23, 42, 0.9)`); 
        gradient.addColorStop(1, `#050A10`);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add a bright, glowing stroke at the crest
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 15;
        
        // Redraw path for stroke so we only stroke the top curve
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          let y = wave.yOffset 
                + Math.sin(x * wave.wavelength + time * wave.speed) * wave.amplitude 
                + Math.sin(x * wave.wavelength * 2 - time * wave.speed * 0.5) * (wave.amplitude * 0.3);
          
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 350;
          
          if (distance < maxDistance) {
            const force = Math.pow((maxDistance - distance) / maxDistance, 2);
            const displacement = force * 100; 
            if (mouse.y < y) {
              y += displacement * Math.abs(dx / maxDistance); 
            } else {
              y -= displacement * Math.abs(dx / maxDistance);
            }
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Reset shadow for next draws
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ filter: 'blur(4px)' }} // Adds the soft glowing effect from the reference
    />
  );
};

export default WaveBackground;
