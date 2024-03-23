// Define los conjuntos de datos disponibles
const DATASETS = {
    videogames: {
      TITLE: 'Video Game Sales',
      DESCRIPTION: 'Top 100 Most Sold Video Games Grouped by Platform',
      FILE_PATH: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json'
    },
    movies: {
      TITLE: 'Movie Sales',
      DESCRIPTION: 'Top 100 Highest Grossing Movies Grouped By Genre',
      FILE_PATH: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json'
    },
    kickstarter: {
      TITLE: 'Kickstarter Pledges',
      DESCRIPTION: 'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
      FILE_PATH: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json'
    }
  };
  
  // Obtiene los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const DEFAULT_DATASET = 'videogames';
  const DATASET = DATASETS[urlParams.get('data') || DEFAULT_DATASET];
  
  // Establece el título y la descripción de acuerdo al conjunto de datos seleccionado
  document.getElementById('title').innerHTML = DATASET.TITLE;
  document.getElementById('description').innerHTML = DATASET.DESCRIPTION;
  
  // Selecciona el elemento SVG y obtiene sus dimensiones
  const svg = d3.select('#tree-map');
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  
  // Define la función fader para la interpolación de colores
  const fader = color => d3.interpolateRgb(color, '#fff')(0.2);
  
  // Define la escala de colores utilizando una paleta predefinida y la función fader
  const color = d3.scaleOrdinal().range(
    ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'].map(fader)
  );
  
  // Define la función de treemap y establece sus dimensiones
  const treemap = d3.treemap().size([width, height]).paddingInner(1);
  
  // Carga los datos del archivo JSON correspondiente al conjunto de datos seleccionado
  d3.json(DATASET.FILE_PATH)
    .then(data => {
      // Crea una jerarquía de datos
      const root = d3.hierarchy(data)
        .eachBefore(d => {
          d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
        })
        .sum(d => d.value)
        .sort((a, b) => b.height - a.height || b.value - a.value);
  
      // Genera el treemap
      treemap(root);
  
      // Selecciona los elementos de grupo y asigna los datos
      const cell = svg.selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('class', 'group')
        .attr('transform', d => `translate(${d.x0},${d.y0})`);
  
      // Agrega rectángulos para representar los datos
      cell.append('rect')
        .attr('id', d => d.data.id)
        .attr('class', 'tile')
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('data-name', d => d.data.name)
        .attr('data-category', d => d.data.category)
        .attr('data-value', d => d.data.value)
        .attr('fill', d => color(d.data.category))
        .on('mouseover', function (event, d) {
            tooltip.transition().style('opacity', 0.9)
            tooltip.html('Name: ' + d.data.name + '<br>Category: ' + d.data.category + '<br>Value: ' + d.data.value)
                .attr('data-value', d.data.value)
                .style('left', (event.pageX + 10) + 'px') // Posiciona el tooltip horizontalmente
                .style('top', (event.pageY + 10) + 'px') // Posiciona el tooltip verticalmente
                .style("background-color", "black")
        })
        .on('mouseout', (d) => tooltip.transition().style('opacity', 0));
  
      // Agrega texto a los rectángulos
      cell.append('text')
        .attr('class', 'tile-text')
        .selectAll('tspan')
        .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
        .enter()
        .append('tspan')
        .attr('x', 4)
        .attr('y', (d, i) => 13 + i * 10)
        .text(d => d);

    // Crea el tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0) // Establece la opacidad inicial del tooltip
        .style("position", "absolute")
        .style("color", "#fff") // Color del texto del tooltip
        .style("padding", "10px") // Añade un relleno al tooltip
        .style("font-size", "15px")
        .style("text-align", "left");

        // Obtener las categorías únicas de los nodos hoja del treemap
    const categories = [...new Set(root.leaves().map(node => node.data.category))];

    // Seleccionar el elemento SVG de la leyenda y obtener su ancho
    const legend = d3.select('#legend');
    const legendWidth = +legend.attr('width');

    // Definir constantes para el espaciado y tamaño de los elementos de la leyenda
    const LEGEND_RECT_SIZE = 15;
    const LEGEND_H_SPACING = 150;
    const LEGEND_V_SPACING = 10;
    const LEGEND_TEXT_X_OFFSET = 3;
    const LEGEND_TEXT_Y_OFFSET = -2;

    // Calcular el número de elementos por fila en la leyenda
    const legendElemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

    // Crear los elementos de la leyenda
    const legendElem = legend.selectAll('g')
    .data(categories)
    .enter()
    .append('g')
    .attr('transform', (d, i) => {
            // Calcular la posición horizontal (x) de cada elemento
            const x = (i % legendElemsPerRow+0.5) * LEGEND_H_SPACING;
            // Calcular la posición vertical (y) de cada fila
            const y = Math.floor(i / legendElemsPerRow) * (LEGEND_RECT_SIZE + LEGEND_V_SPACING);
            return `translate(${x},${y})`;
        });

    // Agregar rectángulos coloreados a la leged
    legendElem.append('rect')
    .attr('width', LEGEND_RECT_SIZE)
    .attr('height', LEGEND_RECT_SIZE)
    .attr('class', 'legend-item')
    .attr('fill', color);

    // Agregar etiquetas de texto a la legend
    legendElem.append('text')
    .attr('x', LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET+5)
    .attr('y', LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET-2.5)
    .text(d => d)
    .attr("fill", "white")
    .style("font-size", "12.5px")

    })