# correctiv-ruhr-microquakes-viz

## requirements

```html
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="./lib/d3-playbooks.base.min.js"></script>
<script src="./main.js"></script>
```

## visualizations

```
  renderMagnitudeChart();
  renderWeekdayChart();
  renderIntradayChart();
  renderEarthquakesMap();
```

## using these containers

they should be present in `dom` otherwise viz won't be displayed.

```html

<h3>Karte</h3>
<section id="microquakes-map"></section>

<h3>Magnituden</h3>
<section class="microquakes-charts" id="chart-magnitudes"></section>
<p class="microquakes-charts__description">Zeitraum: 1983-2016 | <a href="https://github.com/der-pott-bebt/der-pott-bebt.github.io/tree/master/data">Daten (Github):</a> des Seismologischen Observatorium der Ruhr-Universität Bochum | Gesamtzahl der Erdbeben: 13620</p>

<h3>Erdbeben im Wochenverlauf</h3>
<section class="microquakes-charts" id="chart-weekdays"></section>
<p class="microquakes-charts__description">Zeitraum: 1983-2016 | <a href="https://github.com/der-pott-bebt/der-pott-bebt.github.io/tree/master/data"> Daten (Github):</a> Seismologisches Observatorium der Ruhr-Universität Bochum | Gesamtzahl der Erdbeben: 26136</p>

<h3>Erdbeben im Tagesverlauf</h3>
<section class="microquakes-charts" id="chart-intraday"></section>
<p class="microquakes-charts__description">Zeitraum: 1983-2016 | <a href="https://github.com/der-pott-bebt/der-pott-bebt.github.io/tree/master/data"> Daten (Github):</a> des Seismologischen Observatorium der Ruhr-Universität Bochum | Gesamtzahl der Erdbeben: 26136</p>
```

## build

`babel lib/main.es6.js | uglifyjs > main.js`
