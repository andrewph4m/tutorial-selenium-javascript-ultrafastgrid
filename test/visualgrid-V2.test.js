'use strict';

const { Builder, By } = require('selenium-webdriver');
const { Eyes, VisualGridRunner, Target, RectangleSize, Configuration, BatchInfo, BrowserType, DeviceName, ScreenOrientation} = require('@applitools/eyes-selenium');

describe('Applitools V1 - Ultrafast Grid', function () {
  let runner, eyes, driver;

  before(async () => {

    // Create a new chrome web driver
    driver = await new Builder()
        .forBrowser('chrome')
        .build();

    // Create a runner with concurrency of 1
    runner = new VisualGridRunner(1);

    // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.
    eyes = new Eyes(runner);

    // Initialize the eyes configuration.
    let conf = new Configuration()

    // You can get your api key from the Applitools dashboard
    conf.setApiKey('KIz4L4RkyrfENe1CzA5fGX1ykPAr4w97JabBJWKFuwvw110');

    // create a new batch info instance and set it to the configuration
    conf.setBatch(new BatchInfo("UFG Hackathon"));

    // Add browsers with different viewports
    conf.addBrowser(1200, 700, BrowserType.CHROME);
    conf.addBrowser(1200, 700, BrowserType.FIREFOX);
    conf.addBrowser(1200, 700, BrowserType.EDGE_CHROMIUM);
    conf.addBrowser(768, 700, BrowserType.CHROME);
    conf.addBrowser(768, 700,  BrowserType.FIREFOX);
    conf.addBrowser(768, 700, BrowserType.EDGE_CHROMIUM);

    // Add mobile emulation devices in Portrait mode
    conf.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    conf.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);

    // set the configuration to eyes
    eyes.setConfiguration(conf)


  });

  it('ultraFastTest', async () => {
    // Call Open on eyes to initialize a test session
    await eyes.open(driver, 'Task 1', 'Cross-Device Elements Test', new RectangleSize(800, 600));

    // Navigate the browser to the "ACME" demo app.
    // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
    // but then change the above URL to https://demo.applitools.com/index_v2.html
    // (for the 2nd run)
    await driver.get("https://demo.applitools.com/gridHackathonV2.html");

    // Check the app page
    await eyes.check("Applications UltraFastGrid | Cross Browser Testing Demo App", Target.window().fully());

    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  after(async () => {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortAsync();

    // we pass false to this method to suppress the exception that is thrown if we
    // find visual differences
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
  });
});

