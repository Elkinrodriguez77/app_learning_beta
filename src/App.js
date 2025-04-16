// App.js (con gráficas interactivas tipo Recharts)
import React, { useState, useEffect } from 'react';
import routes from './routes/routes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from 'recharts';

function App() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [firstTry, setFirstTry] = useState(true);

  const startTest = (topic) => {
    setSelectedTopic(topic);
    setStep(0);
    setFeedback('');
    setScore(0);
    setFinished(false);
    setFirstTry(true);
  };

  const current = selectedTopic?.questions[step];

  const handleAnswer = (option) => {
    if (!current) return;
    const isCorrect = option === current.answer;

    if (isCorrect && firstTry) {
      setScore((prev) => prev + 1);
    }

    if (isCorrect) {
      setFeedback('✅ ¡Correcto!');
      setTimeout(() => {
        setFeedback('');
        if (step + 1 < selectedTopic.questions.length) {
          setStep((prev) => prev + 1);
          setFirstTry(true);
        } else {
          setFinished(true);
        }
      }, 1000);
    } else {
      setFeedback('❌ Intenta otra vez.');
      setFirstTry(false);
    }
  };

  const resetAll = () => {
    setSelectedRoute(null);
    setSelectedTopic(null);
    setStep(0);
    setScore(0);
    setFinished(false);
    setFeedback('');
    setFirstTry(true);
  };

  if (!selectedRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">🎓 Elige tu Ruta de Formación</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {routes.map((route) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={route.name}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl"
              onClick={() => setSelectedRoute(route)}
            >
              <h2 className="text-2xl font-semibold mb-2">{route.name}</h2>
              <p className="text-gray-600 mb-2">{route.description}</p>
              <ul className="text-sm text-gray-500 list-disc ml-5">
                {route.topics.map((topic) => (
                  <li key={topic.name}>{topic.name}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🧭 {selectedRoute.name}</h1>
        <p className="mb-6 text-gray-600">{selectedRoute.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {selectedRoute.topics.map((topic) => (
            <button
              key={topic.name}
              onClick={() => startTest(topic)}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              {topic.name}
            </button>
          ))}
        </div>
        <div className="mt-8">
          <button
            onClick={() => setSelectedRoute(null)}
            className="text-blue-500 hover:underline"
          >
            🔙 Volver a rutas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {finished ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 ¡Test finalizado!</h1>
          <p className="text-lg mb-6">Tu puntaje: {score} / {selectedTopic.questions.length}</p>
          <button
            onClick={resetAll}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            🔁 Volver al inicio
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
            className="w-full max-w-3xl mx-auto"
          >
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((step) / selectedTopic.questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-2 bg-green-500 rounded-full"
              />
            </div>

            <h2 className="text-xl font-bold mb-4">{current.question}</h2>

            {current.type === 'chart' && current.data && (
              <div className="w-full h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={current.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ventas" fill="#3b82f6">
                      <LabelList dataKey="ventas" position="top" style={{ fill: '#1f2937', fontSize: 12 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {current.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded text-left"
                >
                  {option}
                </button>
              ))}
            </div>

            {feedback && <p className="text-lg font-semibold mt-4">{feedback}</p>}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
