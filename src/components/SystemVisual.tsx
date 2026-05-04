import React from 'react';
import { motion } from 'motion/react';
import logo from '../assets/ax1-logo.png';

const fade = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.72 },
};

export default function SystemVisual() {
  const signals = [
    { top: 18, side: 'left', width: 39, node: 72, delay: 0.12 },
    { top: 27, side: 'left', width: 33, node: 56, delay: 0.22 },
    { top: 37, side: 'left', width: 46, node: 67, delay: 0.32 },
    { top: 56, side: 'left', width: 36, node: 77, delay: 0.42 },
    { top: 68, side: 'left', width: 32, node: 58, delay: 0.52 },
    { top: 74, side: 'left', width: 40, node: 18, delay: 0.62 },
    { top: 27, side: 'right', width: 36, node: 42, delay: 0.26 },
    { top: 35, side: 'right', width: 32, node: 52, delay: 0.36 },
    { top: 45, side: 'right', width: 41, node: 21, delay: 0.46 },
    { top: 56, side: 'right', width: 39, node: 27, delay: 0.56 },
    { top: 67, side: 'right', width: 34, node: 34, delay: 0.66 },
    { top: 73, side: 'right', width: 43, node: 86, delay: 0.76 },
  ] as const;

  return (
    <motion.div className="loop-diagram system-visual" {...fade} aria-label="Capital Operating System data visualization">
      <div className="system-visual-grid" aria-hidden="true" />

      <motion.div
        className="system-axis"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {signals.map((signal, index) => (
        <motion.div
          key={`${signal.side}-${index}`}
          className={`system-signal system-signal-${signal.side}`}
          style={{ top: `${signal.top}%`, width: `${signal.width}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: signal.delay, ease: 'easeOut' }}
        >
          <motion.span
            className="system-node"
            style={{ left: `${signal.node}%` }}
            animate={{
              left: ['2%', '98%'],
              opacity: [0, 0.95, 0.95, 0],
              scale: [0.86, 1.08, 1.08, 0.86],
            }}
            transition={{ duration: 2.6 + index * 0.11, delay: signal.delay, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      ))}

      <div className="system-brand" aria-hidden="true">
        <div className="system-brand-label">Capital Operating System</div>
        <div className="system-brand-row">
          <span />
          <img className="system-brand-logo" src={logo} alt="AX1" />
          <span />
        </div>
      </div>
    </motion.div>
  );
}
