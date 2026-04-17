import { test as base, expect } from '@playwright/test';
import { ApiManager } from '../api/ApiManager';
import { ZeroConfig, DemoblazeHome, AboutCompany, SputnikHome } from '../pages';
import { applyPerformanceMocks } from './mockHelpers';

type MyFixtures = {
  api: ApiManager;
  zeroConfigPage: ZeroConfig;
  demoblazeHomePage: DemoblazeHome;
  sputnikHome: SputnikHome;
  aboutCompanyPage: AboutCompany;
};

const test = base.extend<MyFixtures>({
  // Globally intercept tracking analytics and heavy media across the entire test suite

  page: async ({ page }, use) => {
    await applyPerformanceMocks(page);
    await use(page);
  },
  // PO fixtures
  api: async ({ request }, use) => {
    const apiManager = new ApiManager(request);
    await use(apiManager);
  },
  zeroConfigPage: async ({ page }, use) => {
    const zeroConfig = new ZeroConfig(page);
    await use(zeroConfig);
  },
  demoblazeHomePage: async ({ page }, use) => {
    const demoblazeHome = new DemoblazeHome(page);
    await use(demoblazeHome);
  },
  sputnikHome: async ({ page }, use) => {
    const sputnikHome = new SputnikHome(page);
    await use(sputnikHome);
  },
  aboutCompanyPage: async ({ page }, use) => {
    const aboutPage = new AboutCompany(page);
    await use(aboutPage);
  },
});

export { test, expect };
