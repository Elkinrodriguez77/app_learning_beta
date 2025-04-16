const questions = [
  {
    type: 'text',
    question: '¿Cuál es una fase de Power BI?',
    options: ['Get Data', 'Excel', 'Otra'],
    answer: 'Get Data'
  },
  {
    type: 'text',
    question: '¿Cuál es la capital de Colombia?',
    options: ['Medellín', 'Bogotá', 'Cali'],
    answer: 'Bogotá'
  },
  {
    type: 'text',
    question: '¿Cuánto es 3 x 4?',
    options: [7, 12, 9],
    answer: 12
  },
  {
    type: 'chart',
    question: 'Según la gráfica, ¿cuál es el producto más vendido?',
    options: ['Producto A', 'Producto B', 'Producto C'],
    answer: 'Producto B',
    data: [
      { name: 'Producto A', ventas: 240 },
      { name: 'Producto B', ventas: 350 },
      { name: 'Producto C', ventas: 300 }
    ]
  }
];

export default questions;
