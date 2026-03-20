import { test as base, expect } from '@playwright/test';
import { ApiManager } from '../api/ApiManager';
import { Home, FindADoctor, ZeroConfig, FeatureEnableDisable, DemoblazeHome } from '../pages';

type MyFixtures = {
  api: ApiManager;
  homePage: Home;
  findADoctorPage: FindADoctor;
  zeroConfigPage: ZeroConfig;
  featureEnableDisablePage: FeatureEnableDisable;
  demoblazeHomePage: DemoblazeHome;
};

export const test = base.extend<MyFixtures>({
  api: async ({ request }, use) => {
    const apiManager = new ApiManager(request);
    await use(apiManager);
  },
  homePage: async ({ page }, use) => {
    const home = new Home(page);
    await use(home);
  },
  findADoctorPage: async ({ page }, use) => {
    const fad = new FindADoctor(page);
    await use(fad);
  },
  zeroConfigPage: async ({ page }, use) => {
    const zeroConfig = new ZeroConfig(page);
    await use(zeroConfig);
  },
  featureEnableDisablePage: async ({ page }, use) => {
    const featureEnableDisable = new FeatureEnableDisable(page);
    await use(featureEnableDisable);
  },
  demoblazeHomePage: async ({ page }, use) => {
    const demoblazeHome = new DemoblazeHome(page);
    await use(demoblazeHome);
  },
});

export { expect };
