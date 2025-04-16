import React, { useState } from 'react';
import topics from './topics';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const startTopic = (key) => {
    setSelectedTopic(key);
    setStep(0);
    setScore(0);
    setFinished(false);
    setFeedback('');
    setShowAnswer(false);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFinished(false);
    setFeedback('');
    setShowAnswer(false);
  };

  const goBackToMenu = () => {
    setSelectedTopic(null);
    setStep(0);
    setScore(0);
    setFeedback('');
    setFinished(false);
    setShowAnswer(false);
  };

  if (!selectedTopic) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
        <h1>📚 Selecciona un tema</h1>
        {Object.entries(topics).map(([key, topic]) => (
          <button
            key={key}
            onClick={() => startTopic(key)}
            style={{
              margin: '10px',
              padding: '15px 30px',
              fontSize: '18px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            {topic.name}
          </button>
        ))}
      </div>
    );
  }

  const currentQuestions = topics[selectedTopic].questions;
  const current = currentQuestions[step];

  const handleAnswer = (option) => {
    if (option === current.answer) {
      setFeedback('✅ ¡Correcto!');
      setScore(score + 1);
      setShowAnswer(false);

      setTimeout(() => {
        setFeedback('');
        if (step + 1 < currentQuestions.length) {
          setStep(step + 1);
        } else {
          setFinished(true);
        }
      }, 1500);
    } else {
      setFeedback('❌ Intenta otra vez.');
      setShowAnswer(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      {finished ? (
        <div>
          <h1>🎉 ¡Has completado {topics[selectedTopic].name}!</h1>
          <p>Tu puntaje: {score} de {currentQuestions.length}</p>
          <button
            onClick={restart}
            style={{
              margin: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Reintentar
          </button>
          <button
            onClick={goBackToMenu}
            style={{
              margin: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Volver al menú principal
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
                  animate={{ width: `${((step) / currentQuestions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: '10px',
                    background: '#4caf50',
                    borderRadius: '5px'
                  }}
                />
              </div>
              Pregunta {step + 1} de {currentQuestions.length}
            </p>

            <h1>{current.question}</h1>

            {current.type === 'chart' && current.data && (
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="90%" height="100%">
                  <BarChart data={current.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ventas" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

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

            {showAnswer && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => alert(`💡 La respuesta correcta es: ${current.answer}`)}
                  style={{
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Mostrar respuesta correcta
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
