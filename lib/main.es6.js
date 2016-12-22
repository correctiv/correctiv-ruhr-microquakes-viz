// data helper
const convert = data => {
  return data[0].map((d, i) => {
    return {
      x: d,
      y: data[1][i]
    }
  })
}

// DATA
const DATA = {
  weekdays: convert([
    ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    [3429, 4208, 4472, 4425, 4474, 3461, 1667]
  ]),
  intraday: convert([
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    [1530, 1510, 1423, 1367, 1026, 786, 690, 622, 706, 768, 890, 880, 860, 926, 954, 1075, 1071, 1102, 1143, 1353, 1397, 1391, 1354, 1312]
  ]),
  magnitudes: [
    [1.0, 1849],
    [1.1, 1857],
    [1.2, 1769],
    [1.3, 1607],
    [1.4, 1549],
    [1.5, 1357],
    [1.6, 1030],
    [1.7, 833],
    [1.8, 571],
    [1.9, 373],
    [2.0, 237],
    [2.1, 175],
    [2.2, 162],
    [2.3, 79],
    [2.4, 58],
    [2.5, 33],
    [2.6, 21],
    [2.7, 16],
    [2.8, 15],
    [2.9, 10],
    [3.0, 9],
    [3.1, 2],
    [3.2, 1],
    [3.3, 3],
    [3.4, 0],
    [3.5, 2],
    [3.6, 1],
    [3.7, 1],
    [3.8, 0],
    [3.9, 0]
  ].map(d => ({x: d[0], y: d[1]}))
}

// global opts for all charts
d3.playbooks.defaults({
  color: '#efab59',
  width: 700,
  height: 400
})

const cScale = d3.scaleLinear().range([1, 0]).domain([4, 0])
const getColor = val => {
  return d3.interpolateOranges(cScale(val.x))
}

const magnitudeChart = {
  margin: {
    left: 50
  },
  yTicks: 3,
  elementId: 'chart-magnitudes',
  data: DATA.magnitudes,
  color: getColor,
  barMargin: 5,
  yLabel: 'Anzahl der Erdbeben',
  xLabel: 'Richterskala (Magnitude)'
}

const weekdayChart = {
  elementId: 'chart-weekdays',
  data: DATA.weekdays,
  showYAxis: false,
  showXLabel: false,
  barMargin: 20,
  drawExtra: c => {
    const band = c.xScale.bandwidth()
    c.g.append('g')
      .attr('class', 'bar-labels')
      .selectAll('.text')
      .data(c.data)
      .enter().append('text')
      .attr('x', d => c.xScale(d.x) + band/2)
      .attr('y', d => c.yScale(d.y) + 20)
      .attr('text-anchor', 'middle')
      .text(d => d.y)
  }
}

const intradayChart = {
  elementId: 'chart-intraday',
  data: DATA.intraday,
  showYAxis: false,
  // xLabel: 'Uhrzeit',
  showXAxis: false,
  barMargin: 5,
  drawExtra: c => {
    const band = c.xScale.bandwidth()
    c.g.append('g')
      .attr('class', 'bar-labels')
      .selectAll('.text')
      .data(c.data)
      .enter().append('text')
      .attr('y', d => c.xScale(d.x) + band/2)
      .attr('x', -c.height + 50)
      .attr('dominant-baseline', 'central')
      .attr('transform', 'rotate(-90)')
      .text((d, i) => i === 0 ? d.y + ' Erdbeben zu dieser Stunde' : d.y)
    const hours = ['0', '3', '6', '9', '12', '15', '18', '21']
    c.g.append('g')
      .attr('class', 'clockticks')
      .selectAll('.text')
      .data(hours)
      .enter().append('text')
      .attr('x', d => c.xScale(d) + band/2)
      .attr('y', c.height - 5)
      .attr('text-anchor', 'middle')
      .text(d => d + ' h')
  }
}


window.renderMagnitudeChart = () => d3.playbooks.barChart(magnitudeChart).build()
window.renderWeekdayChart = () => d3.playbooks.barChart(weekdayChart).build()
window.renderIntradayChart = () => d3.playbooks.barChart(intradayChart).build()

// render carto map
window.renderEarthquakesMap  = () => {
  const vizjson = 'https://graph-zahl.carto.com/api/v2/viz/617fbd4a-4788-11e6-b10b-0e3ebc282e83/viz.json';
  cartodb.createVis('microquakes-map', vizjson);
}
