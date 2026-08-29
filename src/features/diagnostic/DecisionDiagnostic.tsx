import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { fade } from '../../components';
import { trackAX1Event } from '../../utils/analytics';
import {
  calculateDiagnosticResult,
  type DiagnosticAnswer,
} from './diagnosticModel';

const questions = [
  ['01', 'Can you see what changed since capital was approved?', 'Current execution, not the last reported position.'],
  ['02', 'Can you identify what controls the next capital action?', 'The relevant milestone, owner and present consequence.'],
  ['03', 'Is the supporting evidence current and attributable?', 'Usable for this decision without another reconciliation cycle.'],
  ['04', 'Is authority clear, including what action is permitted now?', 'A visible boundary between readiness and human decision.'],
] as const;

const choices: Array<{ value: DiagnosticAnswer; label: string; icon: typeof Check }> = [
  { value: 'yes', label: 'Yes', icon: Check },
  { value: 'partly', label: 'Partly', icon: Eye },
  { value: 'no', label: 'No', icon: EyeOff },
];

export function DecisionDiagnostic() {
  const [answers, setAnswers] = useState<Array<DiagnosticAnswer | undefined>>([]);
  const started = useRef(false);
  const currentIndex = questions.findIndex((_, index) => !answers[index]);
  const activeIndex = currentIndex === -1 ? 3 : currentIndex;
  const completeAnswers = answers.filter(Boolean) as DiagnosticAnswer[];
  const result = useMemo(() => calculateDiagnosticResult(completeAnswers), [completeAnswers]);

  const answerQuestion = (index: number, answer: DiagnosticAnswer) => {
    if (!started.current) {
      started.current = true;
      trackAX1Event('diagnostic_started');
    }

    const next = [...answers];
    next[index] = answer;
    setAnswers(next);
    trackAX1Event('diagnostic_answered', { question: index + 1, answer });

    const completed = next.filter(Boolean) as DiagnosticAnswer[];
    const nextResult = calculateDiagnosticResult(completed);
    if (nextResult) {
      trackAX1Event('diagnostic_completed', { result: nextResult.state, score: nextResult.score });
    }
  };

  const reset = () => {
    setAnswers([]);
    started.current = false;
  };

  return (
    <section className="cg-diagnostic" id="diagnostic" aria-labelledby="cg-diagnostic-title">
      <div className="cg-shell cg-diagnostic-layout">
        <motion.header className="cg-section-heading cg-section-heading-dark" {...fade}>
          <span className="cg-eyebrow">A 60 second test</span>
          <h2 id="cg-diagnostic-title">Can the next action be defended without another report?</h2>
          <p>Answer four plain questions. No programme data is submitted or stored.</p>
          <div className="cg-diagnostic-progress" aria-label={`${completeAnswers.length} of 4 questions answered`}>
            <span><strong>{completeAnswers.length}</strong> / 4 answered</span>
            <i><b style={{ width: `${completeAnswers.length * 25}%` }} /></i>
          </div>
        </motion.header>

        <div className="cg-question-rail">
          {questions.map(([number, question, explanation], index) => (
            <motion.article className={index === activeIndex && !result ? 'is-current' : ''} key={number} {...fade}>
              <div className="cg-question-index"><span>{number}</span><i className={index === activeIndex && !result ? 'is-active' : answers[index] ? 'is-complete' : ''} /></div>
              <div className="cg-question-copy"><h3>{question}</h3><p>{explanation}</p></div>
              <div className="cg-diagnostic-choices" role="group" aria-label={question}>
                {choices.map(({ value, label, icon: Icon }) => (
                  <button
                    className={answers[index] === value ? 'is-active' : ''}
                    key={value}
                    type="button"
                    aria-pressed={answers[index] === value}
                    onClick={() => answerQuestion(index, value)}
                  >
                    <Icon size={15} />{label}
                  </button>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {result && (
          <motion.div className={`cg-diagnostic-result is-${result.state}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status" aria-live="polite">
            <div><span>{result.label}</span><h3>{result.headline}</h3><p>{result.explanation}</p></div>
            <div className="cg-diagnostic-result-actions">
              <a className="cg-button cg-button-primary" href="#decision-exposure">{result.nextStep}<ArrowRight size={16} /></a>
              <button type="button" onClick={reset}><RotateCcw size={15} />Reset</button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
