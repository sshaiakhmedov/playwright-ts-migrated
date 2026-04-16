import { test as base, expect } from '@playwright/test';
import { ApiManager } from '../api/ApiManager';
import { ZeroConfig, DemoblazeHome, AboutCompany } from '../pages';
import { Sputnik8 } from '../pages/Sputnik8.page';
import { SputnikHome } from '../pages/Sputnik8Home.page';
import { applyPerformanceMocks } from './mockHelpers';

type MyFixtures = {
  api: ApiManager;
  zeroConfigPage: ZeroConfig;
  demoblazeHomePage: DemoblazeHome;
  sputnik8: Sputnik8;
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
  sputnik8: async ({ page }, use) => {
    const sputnikHome = new Sputnik8(page);
    await use(sputnikHome);
  },
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
