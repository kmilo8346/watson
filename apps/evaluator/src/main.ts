import chunk from 'lodash.chunk';
import dataSets from './data-sets';
import { Filterer } from './lib/Filterer';
import { Example } from './types';

interface TestResult {
  example: Example;
  output: boolean;
}

// const dataSet = dataSets['fsd'];
// const dataSet = dataSets['fsd-bad-experiences'];
// const dataSet = dataSets['fsd-good-experiences'];
const dataSet = dataSets['fsd-without-interventions'];
// const dataSet = dataSets['tesla'];
// const dataSet = dataSets['tesla-car-sales'];
// const dataSet = dataSets['tesla-megapack-sales'];

const run = async () => {
  const filterer = new Filterer(dataSet.instructions);

  console.log(`[${dataSet.name}]: Running evaluations...`);

  const results: TestResult[] = [];
  const chunks: Example[][] = chunk(dataSet.examples, 20);
  for (const chunk of chunks) {
    const partialResults = await Promise.all(
      chunk.map(async (example) => {
        const output = await filterer.comply(example.input);
        return {
          example,
          output,
        };
      })
    );

    results.push(...partialResults);
  }

  const total = results.length;
  const totalPassed = results.filter(
    (result) => result.output === result.example.expected_output
  ).length;
  const failedTests = results.filter(
    (result) => result.output != result.example.expected_output
  );

  console.log('');
  console.log(`(${totalPassed} / ${total}) tests passed.`);
  if (failedTests.length > 0) {
    console.log('');
    console.log('Failed tests:');
    failedTests.forEach((failedTest) => {
      console.log('--------------------------------');
      console.log('Input:');
      console.log(failedTest.example.input);
      console.log('');
      console.log('Expected output:');
      console.log(failedTest.example.expected_output);
      console.log('Output:');
      console.log(failedTest.output);
    });
  }
};

run();
