import type { FullConfig, Suite, TestCase, TestResult, FullResult, Reporter } from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onBegin(_config: FullConfig, suite: Suite): void {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase): void {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult): void {
    console.log(`Finished the run: ${result.status}`);
  }
}

export default MyReporter;
