const topics = {
    powerbi: {
      name: "Power BI",
      questions: [
        {
          type: 'text',
          question: '¿Cuál es una fase de Power BI?',
          options: ['Get Data', 'Excel', 'Otra'],
          answer: 'Get Data'
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
      ]
    },
    excel: {
      name: "Excel",
      questions: [
        {
          type: 'text',
          question: '¿Qué fórmula se usa para sumar en Excel?',
          options: ['=SUMA()', '=CONTAR()', '=SI()'],
          answer: '=SUMA()'
        },
        {
          type: 'text',
          question: '¿Qué atajo copia una celda?',
          options: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V'],
          answer: 'Ctrl + C'
        }
      ]
    }
  };
  
  export default topics;
  