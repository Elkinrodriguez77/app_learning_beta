import React, { useState } from 'react';
import questions from './questions';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[step];

  const handleAnswer = (option) => {
    if (option === current.answer) {
      setFeedback('✅ ¡Correcto!');
      setScore(score + 1);

      setTimeout(() => {
        setFeedback('');
        if (step + 1 < questions.length) {
          setStep(step + 1);
        } else {
          setFinished(true);
        }
      }, 1500);
    } else {
      setFeedback('❌ Intenta otra vez.');
    }
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFinished(false);
    setFeedback('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      {finished ? (
        <div>
          <h1>🎉 ¡Curso finalizado!</h1>
          <p>Tu puntaje: {score} de {questions.length}</p>
          <button
            onClick={restart}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Reiniciar
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ fontSize: '18px' }}>
            <div style={{ width: '80%', margin: '20px auto', height: '10px', background: '#e0e0e0', borderRadius: '5px' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((step) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  height: '10px',
                  background: '#4caf50',
                  borderRadius: '5px'
                }}
              />
            </div>

              Pregunta {step + 1} de {questions.length}
            </p>
            <h1>{current.question}</h1>
            <div>
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  style={{
                    margin: '10px',
                    padding: '10px 20px',
                    fontSize: '18px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <h2 style={{ marginTop: '20px' }}>{feedback}</h2>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;