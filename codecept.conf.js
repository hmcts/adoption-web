require('./src/test/e2e/helpers/event_listener');
const lodash = require('lodash');

const testConfig = require('./src/test/config.js').config;
exports.config = {
  output: './output',
  multiple: {
    parallel: {
      chunks: files => {
        const splitFiles = (list, size) => {
          const sets = [];
          const chunks = list.length / size;
          let i = 0;

          while (i < chunks) {
            sets[i] = list.splice(0, size);
            i++;
          }
          return sets;
        };

        const buckets = parseInt(process.env.PARALLEL_CHUNKS || '5');
        const slowTests = lodash.filter(files, file => file.includes('@slow'));
        const otherTests = lodash.difference(files, slowTests);

        let chunks = [];
        if (buckets > slowTests.length + 1) {
          const slowTestChunkSize = 1;
          const regularChunkSize = Math.ceil((files.length - slowTests.length) / (buckets - slowTests.length));
          chunks = lodash.union(splitFiles(slowTests, slowTestChunkSize), splitFiles(otherTests, regularChunkSize));
        } else {
          chunks = splitFiles(files, Math.ceil(files.length / buckets));
        }

        console.log(chunks);

        return chunks;
      },
    },
  },
  helpers: {
    Puppeteer: {
      show: process.env.SHOW_BROWSER_WINDOW || false,
      waitForTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT || '20000'),
      chrome: {
        ignoreHTTPSErrors: true,
        args: process.env.DISABLE_WEB_SECURITY === 'true' ? ['--disable-web-security'] : [],
        devtools: process.env.SHOW_BROWSER_WINDOW || false,
      },
      windowSize: '1280x960',
    },
    HooksHelper: {
      require: './src/test/e2e/helpers/hooks_helper.js',
    },
    BrowserHelpers: {
      require: './src/test/e2e/helpers/browser_helper.js',
    },
    DumpBrowserLogsHelper: {
      require: './src/test/e2e/helpers/dump_browser_logs_helper.js',
    },
    StepListener: {
      require: './src/test/e2e/helpers/stepListener.js',
    },
    Mochawesome: {
      uniqueScreenshotNames: true,
    },
  },

  include: {
    config: './src/test/e2e/config.js',
    I: './src/test/e2e/actors/main.js',
    loginPage: './src/test/e2e/pages/login.page.js',
    openApplicationEventPage: './src/test/e2e/pages/events/openApplicationEvent.page.js',
    caseListPage: './src/test/e2e/pages/caseList.page.js',
    eventSummaryPage: './src/test/e2e/pages/eventSummary.page.js',
    landingPage: './src/test/e2e/pages/LandingPage.js',
    primaryApplicantDetailsPage: './src/test/e2e/pages/primaryApplicant.page.js',
    taskListPage: './src/test/e2e/pages/taskList.page.js',
    otherApplicantDetailsPage: './src/test/e2e/pages/otherApplicant.page.js',
    childDetailsPlacementOrderPage: './src/test/e2e/pages/childDetailsPlacementOrder.page.js',
    primaryApplicantPersonalDetailsPage: './src/test/e2e/pages/primaryApplicantPersonalDetails.page.js',
    childrenBirthCertificatePage: './src/test/e2e/pages/childrenBirthCertificate.page.js',
    otherApplicantPersonalDetailsPage: './src/test/e2e/pages/otherApplicantPersonalDetails.page.js',
    childsDetailsPage: './src/test/e2e/pages/childsDetails.page.js',
    childBirthMothersDetailsPage: './src/test/e2e/pages/childBirthMothersDetails.page.js',
    childOtherParentDetailsPage: './src/test/e2e/pages/childOtherParentDetails.page.js',
    childBirthFatherDetailsPage: './src/test/e2e/pages/childBirthFatherDetails.page.js',
    childAdoptionAgencyDetailsPage: './src/test/e2e/pages/childAdoptionAgencyDetails.page.js',
    childSiblingDetailsPage: './src/test/e2e/pages/childSiblingDetails.page.js',
    reviewPayAndSubmitPage: './src/test/e2e/pages/reviewPayAndSubmit.page.js',
    uploadDocumentsDetailsPage: './src/test/e2e/pages/uploadDocumentsDetails.page.js',
    dateChildMovedinDetailsPage: './src/test/e2e/pages/dateChildMovedinDetails.page.js',
    chooseYourFamilyCourtDetailsPage: './src/test/e2e/pages/chooseYourFamilyCourtDetails.page.js',
    saveAsDraftPage: './src/test/e2e/pages/saveAsDraft.page',
    checkYourAnswersPage: './src/test/e2e/pages/checkYourAnswers.page.js',
    laCheckYourAnswersPage: './src/test/e2e/pages/laCheckYourAnswers.page',
  },
  plugins: {
    autoLogin: testConfig.AutoLogin,
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
  },
  tests: './src/test/e2e/tests/*_test.js',
  teardownAll: require('./src/test/e2e/hooks/aggregate-metrics'),
  teardown: testConfig.teardown,
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          steps: false,
        },
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: {
          mochaFile: 'test-results/result.xml',
        },
      },
      mochawesome: {
        stdout: '-',
        options: {
          reportDir: './output',
          inlineAssets: true,
          json: false,
        },
      },
      '../../src/test/e2e/reporters/json-file-reporter/reporter': {
        stdout: '-',
      },
    },
  },
};
