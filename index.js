#! /usr/bin/env node

import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import ora from 'ora';
import { execa } from 'execa';
import { fileURLToPath } from 'url';

const promptPackageManager = async () => {
  const { packageManager } = await inquirer.prompt({
    name: 'packageManager',
    type: 'list',
    message: 'What is your package manager?',
    choices: ['npm', 'yarn'],
    default: 'npm'
  });
  return packageManager;
};

const addConfigs = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const PROJECT_PATH = path.dirname(__filename);
  const spinner = ora('Copying config files').start();

  try {
    const configPath = path.join(PROJECT_PATH, 'config');
    await fs.copy(configPath, PROJECT_PATH);
    spinner.succeed('Copying config files completed!');
  } catch (err) {
    spinner.fail('Error while adding config files!');
    console.log(err);
    process.exit();
  }
};

const installDevDependencies = async (pkgManager, devDependencies) => {
  const spinner = ora('Installing dev dependencies!').start();
  try {
    const pkgCommand = pkgManager === 'npm' ? 'install' : 'add';
    const devCommand = pkgManager === 'npm' ? '-D' : '--dev';

    // Instead of calling the execa function inside a loop,
    // call it manually for each command to avoid throwing an error.

    await execa(pkgManager, [pkgCommand, devCommand, devDependencies[0]], {
      cwd: process.cwd()
    });
    await execa(pkgManager, [pkgCommand, devCommand, devDependencies[1]], {
      cwd: process.cwd()
    });
    await execa(pkgManager, [pkgCommand, devCommand, devDependencies[2]], {
      cwd: process.cwd()
    });
    await execa(pkgManager, [pkgCommand, devCommand, devDependencies[3]], {
      cwd: process.cwd()
    });
    await execa(pkgManager, [pkgCommand, devCommand, devDependencies[4]], {
      cwd: process.cwd()
    });
    await execa(pkgManager, [pkgCommand, devCommand, devDependencies[5]], {
      cwd: process.cwd()
    });
    spinner.succeed('Dev dependencies installed successfully!');
  } catch (err) {
    spinner.fail('Error while installing dev dependencies!');
    console.log(err);
    process.exit();
  }
};

const displayDevDependencies = (devDependencies) => {
  console.log('\n-----[ Installed dev dependencies ]-----\n');
  devDependencies.forEach((dependency) => {
    console.log(`\t${dependency}`);
  });
  console.log('\n\tCLEAN CODING JOURNEY BEGINS!\n');
};

const devDependencies = [
  'eslint@8.33.0',
  'prettier@2.8.3',
  'eslint-config-airbnb-base@15.0.0',
  'eslint-config-prettier@8.6.0',
  'eslint-plugin-import@2.27.5',
  'eslint-plugin-prettier@4.2.1'
];

(async () => {
  const packageManager = await promptPackageManager();
  await addConfigs();
  await installDevDependencies(packageManager, devDependencies);
  displayDevDependencies(devDependencies);
})();
