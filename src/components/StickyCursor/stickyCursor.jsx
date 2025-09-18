'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * <StickyCursor
 *   targets={[ { ref: someRef, render: () => <MainButton/> } ]}
 *   dotSize={12}
 *   corner={16}
 *   offset={{ x: 0, y: 0 }}
 * />
 */
export default function StickyCursor({
  targets = [],
  dotSize = 12,
  corner = 16,
  offset = { x: 0, y: 0 },
}) {
  // позиція курсора без ре-рендерів
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 20, stiffness: 300, mass: 0.5 });
  const sy = useSpring(my, { damping: 20, stiffness: 300, mass: 0.5 });

  // активна ціль (реакт-стан міняємо РІДКО — лише коли змінився id)
  const [activeIdx, setActiveIdx] = useState(null); // number|null
  const [contentSize, setContentSize] = useState({ w: dotSize, h: dotSize });
  const measureRef = useRef(null);

  // кеш прямокутників і raf
  const rectsRef = useRef([]); // [{el, rect}]
  const rafRef = useRef(0);

  const nodes = useMemo(() => targets.map(t => t.ref?.current ?? null), [targets.map(t => t.ref?.current).join('|')]);

  // оновлення кешу прямокутників
  const updateRects = () => {
    rectsRef.current = nodes.map(el => (el ? { el, rect: el.getBoundingClientRect() } : null));
  };

  // вимір розміру контенту коли актив змінюється
  useEffect(() => {
    if (activeIdx == null) {
      setContentSize({ w: dotSize, h: dotSize });
      return;
    }
    const id = requestAnimationFrame(() => {
      const el = measureRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setContentSize({ w: Math.ceil(r.width), h: Math.ceil(r.height) });
    });
    return () => cancelAnimationFrame(id);
  }, [activeIdx, dotSize]);

  // головний pointermove з throttling через rAF + геометричний хіт-тест
  useEffect(() => {
    updateRects();

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        // знаходимо першу ціль, чий rect містить курсор
        const i = rectsRef.current.findIndex(entry => {
          if (!entry) return false;
          const { left, top, right, bottom } = entry.rect;
          const x = e.clientX, y = e.clientY;
          return x >= left && x <= right && y >= top && y <= bottom;
        });

        // міняємо стан тільки коли змінилась ціль
        setActiveIdx(prev => (prev !== i ? (i === -1 ? null : i) : prev));
      });
    };

    const onResizeScroll = () => updateRects();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResizeScroll);
    window.addEventListener('scroll', onResizeScroll, true);

    // спостерігачі за зміною розмірів таргетів
    const ros = nodes
      .filter(Boolean)
      .map((el) => {
        const ro = new ResizeObserver(updateRects);
        ro.observe(el);
        return ro;
      });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResizeScroll);
      window.removeEventListener('scroll', onResizeScroll, true);
      ros.forEach(ro => ro.disconnect());
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [nodes]);

  const isActive = activeIdx != null;
  const activeTarget = isActive ? targets[activeIdx] : null;
  const radius = isActive ? corner : dotSize / 2;

  return (
    <>
      {/* офскрін-вимірювач натурального розміру */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
        {isActive && (
          <div ref={measureRef} className="inline-block">
            {typeof activeTarget?.render === 'function' ? activeTarget.render() : null}
          </div>
        )}
      </div>

      {/* контейнер, що морфиться з точки у компонент і йде за курсором */}
      <motion.div
        className="fixed z-[9999] pointer-events-none" // не блокує таргет
        style={{
          left: sx,
          top: sy,
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
        }}
        animate={{
          width: contentSize.w,
          height: contentSize.h,
          borderRadius: radius,
          backgroundColor: isActive ? 'rgba(0,0,0,0)' : 'rgba(38,38,38,0.8)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <AnimatePresence initial={false} mode="wait">
          {!isActive && (
            <motion.div
              key="dot"
              className="w-full h-full"
              style={{ borderRadius: dotSize / 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}

          {isActive && (
            <motion.div
              key={`active-${activeIdx}`}
              className="w-full h-full flex items-center justify-center pointer-events-auto" // кликабельний вміст
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              {typeof activeTarget?.render === 'function' ? activeTarget.render() : null}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
