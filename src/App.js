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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">📚 Selecciona un tema</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(topics).map(([key, topic]) => (
            <button
              key={key}
              onClick={() => startTopic(key)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow transition"
            >
              {topic.name}
            </button>
          ))}
        </div>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center font-sans p-6">
      {finished ? (
        <div>
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            🎉 ¡Has completado {topics[selectedTopic].name}!
          </h1>
          <p className="text-lg mb-6">Tu puntaje: {score} de {currentQuestions.length}</p>
          <button
            onClick={restart}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg m-2 transition"
          >
            Reintentar
          </button>
          <button
            onClick={goBackToMenu}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg m-2 transition"
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
            className="w-full max-w-2xl"
          >
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((step) / currentQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-2 bg-green-500 rounded-full"
              />
            </div>

            <h1 className="text-2xl font-bold mb-4">{current.question}</h1>

            {current.type === 'chart' && current.data && (
              <div className="w-full h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={current.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ventas" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">{feedback}</h2>

            {showAnswer && (
              <button
                onClick={() => alert(`💡 La respuesta correcta es: ${current.answer}`)}
                className="bg-yellow-100 border border-yellow-400 text-yellow-700 font-medium px-4 py-2 rounded-md mt-4 hover:bg-yellow-200 transition"
              >
                Mostrar respuesta correcta
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;