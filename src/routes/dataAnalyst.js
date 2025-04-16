// routes/dataAnalyst.js
const dataAnalyst = {
    name: 'Data Analyst',
    description: 'Desarrolla habilidades para analizar, interpretar y visualizar datos de negocio.',
    topics: [
      {
        name: 'Power BI',
        questions: [
          {
            question: '¿Cuál es una fase fundamental en el proceso de modelado en Power BI?',
            options: ['Get Data', 'Visualizar datos', 'Crear tablas dinámicas', 'Agregar texto enriquecido'],
            answer: 'Get Data',
            type: 'text'
          },
          {
            question: 'Según la siguiente gráfica, ¿cuál fue el producto más vendido?',
            type: 'chart',
            data: [
              { name: 'Producto A', ventas: 100 },
              { name: 'Producto B', ventas: 250 },
              { name: 'Producto C', ventas: 180 },
              { name: 'Producto D', ventas: 90 }
            ],
            options: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
            answer: 'Producto B'
          }
        ]
      },
      {
        name: 'Excel',
        questions: [
          {
            question: '¿Qué función de Excel permite buscar un valor en una tabla y devolver un resultado asociado?',
            options: ['BUSCARV', 'SI', 'SUMAR.SI', 'CONCATENAR'],
            answer: 'BUSCARV',
            type: 'text'
          },
          {
            question: 'Según la siguiente gráfica, ¿cuál es la media de ventas?',
            type: 'chart',
            data: [
              { name: 'Semana 1', ventas: 1200 },
              { name: 'Semana 2', ventas: 1400 },
              { name: 'Semana 3', ventas: 1300 },
              { name: 'Semana 4', ventas: 1300 }
            ],
            options: ['1250', '1300', '1350', '1400'],
            answer: '1300'
          }
        ]
      }
    ]
  };
  
  export default dataAnalyst;  