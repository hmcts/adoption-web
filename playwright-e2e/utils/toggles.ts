import dotenv from 'dotenv';

dotenv.config();

interface ToggleConfig {
  [key: string]: string | boolean;
}

export const toggleConfig: ToggleConfig = {
  pcqTestsEnabled: (process.env.PCQ_TESTS_ENABLED || 'true') === 'true',
};
