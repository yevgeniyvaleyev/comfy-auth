const fs = require('fs');
const path = require('path');
const istanbul = require('istanbul');
const collector = new istanbul.Collector();
const Report = istanbul.Report;
const shieldBadgeReporter = require('istanbul-reporter-shield-badge');

istanbul.Report.register(shieldBadgeReporter);
const report = Report.create('shield-badge', {
  readmeFilename: 'README.md',
  readmeDir: process.cwd(),
  subject: 'Local Coverage',
});

try {
  console.log(`
=== Adding the badge to the ===
${report.readmeFilename}
===
`);
  const coverageDir = path.resolve(process.cwd(), 'coverage');
  fs.readdirSync(coverageDir).forEach((file) => {
    if (file.indexOf('cov') === 0 && file.indexOf('.json') > 0) {
      collector.add(
        JSON.parse(fs.readFileSync(path.resolve(coverageDir, file), 'utf8'))
      );
    }
  });
  report.on('done', function () {
    console.log('The istanbul shield badge report has been generated');
  });
  report.writeReport(collector, true);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
