// routes/dataEngineer.js
const dataEngineer = {
    name: 'Data Engineer',
    description: 'Crea y automatiza pipelines de datos robustos, escalables y eficientes.',
    topics: [
      {
        name: 'SQL',
        questions: [
          {
            question: '¿Qué instrucción se usa para seleccionar datos de una tabla en SQL?',
            options: ['SELECT', 'GET', 'CHOOSE', 'FETCH'],
            answer: 'SELECT',
            type: 'text'
          },
          {
            question: 'Según esta gráfica, ¿cuántas ventas superan los 500?',
            type: 'chart',
            data: [
              { name: 'Juan', ventas: 450 },
              { name: 'Ana', ventas: 600 },
              { name: 'Luis', ventas: 700 },
              { name: 'Marta', ventas: 300 }
            ],
            options: ['1', '2', '3', '4'],
            answer: '2'
          }
        ]
      },
      {
        name: 'Python',
        questions: [
          {
            question: '¿Cuál librería se usa comúnmente en Python para análisis de datos?',
            options: ['NumPy', 'Pandas', 'Scikit-learn', 'All of the above'],
            answer: 'All of the above',
            type: 'text'
          },
          {
            question: 'Según esta gráfica, ¿en qué mes se registró la mayor demanda?',
            type: 'chart',
            data: [
              { name: 'Enero', ventas: 100 },
              { name: 'Febrero', ventas: 120 },
              { name: 'Marzo', ventas: 180 },
              { name: 'Abril', ventas: 160 }
            ],
            options: ['Enero', 'Febrero', 'Marzo', 'Abril'],
            answer: 'Marzo'
          }
        ]
      }
    ]
  };
  
  export default dataEngineer;
  