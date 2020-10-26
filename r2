const sector_regression_r2 = function(sector) {
    return vl.markText({x:"width", y:-5, align:"right"})
      .data(wdi_economic_output)
        .transform(
          vl.lookup('Country Code').from(
            vl.data(countries).key('country-code').fields('income-group', 'region')
          ),
          vl.lookup('Country Code').from(
            vl.data(economic_fitness_2014).key('country-code').fields('economic-fitness')
          ),
          vl.filter(`datum.Year == 2014 && datum.${sector} != 0 && datum.${sector} != null` +
                    `&& datum["income-group"] != null`),
          vl.regression(sector).method('poly').order(3).extent([0,9]).on('economic-fitness').params(true),
          // r2 output per vega-lite docs https://vega.github.io/vega-lite/docs/regression.html
          vl.calculate("'R²: '+format(datum.rSquared, '.2f')").as("R2")
        )
      .encode(
        vl.text()
          .fieldN('R2')
      )
      .title(null)
      .width(400)
      .height(300)
  }