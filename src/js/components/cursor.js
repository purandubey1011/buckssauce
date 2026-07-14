const SEGMENT_COUNT = 14;

export const initCursor = () => {
  if (innerWidth < 768 || matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return null;

  const canvas = document.querySelector('.sauce-cursor');
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return null;

  document.documentElement.classList.add('has-custom-cursor');

  const target = { x: innerWidth / 2, y: innerHeight / 2 };
  const head = { ...target };
  const segments = Array.from({ length: SEGMENT_COUNT }, () => ({ ...target }));
  let visible = false;
  let hovering = false;
  let running = true;
  let frame;
  let opacity = 0;
  let tone = { r: 240, g: 189, b: 55 };
  let innerTone = { r: 247, g: 239, b: 223 };
  let surfaceLight = false;
  let surfaceTarget = null;

  const detectLightSurface = element => {
    let node = element;
    while (node && node !== document.documentElement) {
      const color = getComputedStyle(node).backgroundColor;
      const channels = color?.match(/[\d.]+/g)?.map(Number) || [];
      if (channels.length >= 3) {
        const alpha = channels.length > 3 ? channels[3] : 1;
        if (alpha > .18) {
          const luminance = channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
          return luminance > 148;
        }
      }
      node = node.parentElement;
    }
    return true;
  };

  const updateSurface = element => {
    if (!element || element === surfaceTarget) return;
    surfaceTarget = element;
    surfaceLight = detectLightSurface(element);
  };

  const resize = () => {
    const enabled = innerWidth >= 768;
    document.documentElement.classList.toggle('has-custom-cursor', enabled);
    canvas.style.display = enabled ? '' : 'none';
    if (!enabled) visible = false;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const onPointerMove = event => {
    target.x = event.clientX;
    target.y = event.clientY;
    visible = true;
    updateSurface(event.target);
  };

  const onPointerOver = event => {
    hovering = Boolean(event.target.closest('a, button, input, select, textarea, .fx-heading, .fx-media'));
    updateSurface(event.target);
  };

  const onPointerLeave = () => { visible = false; };

  const drawRing = (point, index, time) => {
    const progress = 1 - index / SEGMENT_COUNT;
    const pulse = Math.sin(time * .004 - index * .52) * 1.15;
    const baseRadius = hovering ? 12 : 8;
    const radius = Math.max(2, baseRadius * (.36 + progress * .7) + pulse);
    const alpha = opacity * (.09 + progress * .5);

    const contrast = surfaceLight ? { r: 247, g: 239, b: 223 } : { r: 10, g: 8, b: 7 };
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.strokeStyle = `rgba(${contrast.r},${contrast.g},${contrast.b},${alpha * .5})`;
    context.lineWidth = 3 + progress * 1.6;
    context.shadowBlur = 0;
    context.stroke();

    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.strokeStyle = `rgba(${tone.r},${tone.g},${tone.b},${alpha})`;
    context.lineWidth = 1 + progress * 1.5;
    context.shadowColor = `rgba(${tone.r},${tone.g},${tone.b},${alpha * 1.8})`;
    context.shadowBlur = index < 5 ? (hovering ? 15 : 10) * progress : 0;
    context.stroke();

    if (index % 4 === 0 && progress > .25) {
      context.beginPath();
      context.arc(point.x, point.y, radius * .48, 0, Math.PI * 2);
      context.strokeStyle = `rgba(${innerTone.r},${innerTone.g},${innerTone.b},${alpha * .82})`;
      context.lineWidth = .8;
      context.stroke();
    }
  };

  const render = time => {
    if (!running) return;
    context.clearRect(0, 0, innerWidth, innerHeight);

    opacity += ((visible ? 1 : 0) - opacity) * .09;
    head.x += (target.x - head.x) * .2;
    head.y += (target.y - head.y) * .2;

    const desiredTone = surfaceLight
      ? (hovering ? { r: 184, g: 42, b: 28 } : { r: 13, g: 11, b: 9 })
      : (hovering ? { r: 247, g: 239, b: 223 } : { r: 240, g: 189, b: 55 });
    const desiredInner = surfaceLight ? { r: 233, g: 81, b: 45 } : { r: 247, g: 239, b: 223 };
    tone.r += (desiredTone.r - tone.r) * .08;
    tone.g += (desiredTone.g - tone.g) * .08;
    tone.b += (desiredTone.b - tone.b) * .08;
    innerTone.r += (desiredInner.r - innerTone.r) * .08;
    innerTone.g += (desiredInner.g - innerTone.g) * .08;
    innerTone.b += (desiredInner.b - innerTone.b) * .08;

    let leader = head;
    segments.forEach((segment, index) => {
      const ease = Math.max(.14, .34 - index * .009);
      segment.x += (leader.x - segment.x) * ease;
      segment.y += (leader.y - segment.y) * ease;
      leader = segment;
    });

    context.save();
    context.globalCompositeOperation = 'source-over';
    for (let index = SEGMENT_COUNT - 1; index >= 0; index -= 1) {
      drawRing(segments[index], index, time);
    }
    context.beginPath();
    context.arc(head.x, head.y, hovering ? 4.3 : 3.3, 0, Math.PI * 2);
    context.fillStyle = `rgba(${tone.r},${tone.g},${tone.b},${opacity})`;
    context.strokeStyle = surfaceLight ? 'rgba(247,239,223,.88)' : 'rgba(10,8,7,.82)';
    context.lineWidth = 2;
    context.shadowColor = `rgba(${tone.r},${tone.g},${tone.b},.88)`;
    context.shadowBlur = hovering ? 14 : 9;
    context.fill();
    context.stroke();
    context.restore();

    frame = requestAnimationFrame(render);
  };

  const onVisibility = () => {
    running = !document.hidden;
    if (running) frame = requestAnimationFrame(render);
    else cancelAnimationFrame(frame);
  };

  addEventListener('resize', resize);
  addEventListener('pointermove', onPointerMove, { passive: true });
  addEventListener('pointerover', onPointerOver, { passive: true });
  addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  resize();
  frame = requestAnimationFrame(render);

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(frame);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onPointerMove);
      removeEventListener('pointerover', onPointerOver);
      removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      document.documentElement.classList.remove('has-custom-cursor');
    }
  };
};
