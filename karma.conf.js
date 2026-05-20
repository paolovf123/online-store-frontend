// Karma config — Angular 20 (@angular/build:karma).
// Solo se sobreescribe lo necesario: reporters de cobertura y thresholds.
// El resto (frameworks, plugins, etc.) viene del builder.

module.exports = function (config) {
  config.set({
    reporters: ['progress', 'kjhtml', 'coverage'],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/solution-test-ventas'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' },
        { type: 'cobertura', file: 'cobertura.xml' },
      ],
      // Falla el build si la cobertura baja del threshold.
      // Ajustar a medida que se añadan tests; valores iniciales conservadores.
      check: {
        global: {
          statements: 50,
          branches: 40,
          functions: 50,
          lines: 50,
        },
      },
    },
  });
};
