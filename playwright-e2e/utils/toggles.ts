import dotenv from 'dotenv';

dotenv.config();

interface ToggleConfig {
  [key: string]: string | boolean;
}

interface BannerConfig {
  [key: string]: string | boolean;
}

export const toggleConfig: ToggleConfig = {
  pcqTestsEnabled: (process.env.PCQ_TESTS_ENABLED || 'true') === 'true',
};

export const toggleBanner: BannerConfig = {
  bannerEnabled: (process.env.BANNER_ENABLED || 'false') === 'true',
};
