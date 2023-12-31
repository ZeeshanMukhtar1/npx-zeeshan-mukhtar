#!/usr/bin/env node

'use strict';

const boxen = require('boxen');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clear = require('clear');
const open = require('open');
const fs = require('fs');
const path = require('path');

clear();

//! importing User Data from data.json
const res = fs.readFileSync(path.resolve(__dirname, 'data.json'));
const user_data = JSON.parse(res);
const {
  user_name,
  user_email,
  instagram_username,
  linkedin_username,
  github_username,
  personal_site,
  npx_card_handle,
  job_title,
  introduction,
  languages,
  qualifications,
  goals,
} = user_data;

const linkedinUrl = `https://www.linkedin.com/in/${linkedin_username}/`;

const prompt = inquirer.createPromptModule();

const data = {
  name: chalk.bold.green(`                  ${user_name}`),
  work: `${chalk.white(`${job_title}`)}`,
  instagram:
    chalk.gray('https://instagram.com/') +
    chalk.magentaBright(`${instagram_username}`),
  linkedin:
    chalk.gray(`https://linkedin.com/in/`) + chalk.blue(`${linkedin_username}`),
  github: chalk.gray('https://github.com/') + chalk.green(`${github_username}`),
  web: chalk.cyan(`${personal_site}`),
  npx: chalk.red('npx') + ' ' + chalk.white(`${npx_card_handle}`),
  labelWork: chalk.white.bold('       Work:'),
  labelInstagram: chalk.white.bold(' Instagram:'),
  labelLinkedIn: chalk.white.bold('   LinkedIn:'),
  labelGitHub: chalk.white.bold('     GitHub:'),
  labelWeb: chalk.white.bold('        Web:'),
  labelCard: chalk.white.bold('       Card:'),
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork}  ${data.work}`,
    `${data.labelInstagram}  ${data.instagram}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelWeb}  ${data.web}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic('I am currently looking for new opportunities,')}`,
    `${chalk.italic('my inbox is always open. Whether you have a')}`,
    `${chalk.italic('question or just want to say hi, I will try ')}`,
    `${chalk.italic('my best to get back to you!')}`,
  ].join('\n'),
  {
    margin: 1,
    float: 'center',
    padding: 1,
    borderStyle: 'single',
    borderColor: 'green',
  }
);

console.log(me);

const mainMenu = [
  {
    type: 'list',
    name: 'action',
    message: 'What you want to do?',
    choices: [
      //// Send an email
      {
        name: `Send me an ${chalk.green.bold('email')}?`,
        value: () => {
          open(`mailto:${user_email}`);
          console.log('\nDone, see you soon at the inbox.\n');
          displayMainMenu();
        },
      },
      //// Read my Tech Articles
      {
        name: `Read my ${chalk.blue.bold('Tech Articles')}?`,
        value: () => {
          open(`https://zeeshanmukhtar1.hashnode.dev/`);
          console.log('\nRedirecting to my Tech Articles...\n');
          displayMainMenu();
        },
      },
      //// Explore Introduction
      {
        name: `Learn more about me: ${chalk.cyan('Introduction')}`,
        value: () => {
          console.log(`${chalk.bold('Introduction:')} ${introduction}\n`);
          displayMainMenu();
        },
      },
      //// Explore Languages
      {
        name: `Explore my expertise: ${chalk.yellow('Languages')}`,
        value: () => {
          console.log(`${chalk.bold('Skills:')}`);
          for (const category in user_data.skills) {
            if (user_data.skills.hasOwnProperty(category)) {
              console.log(
                `${chalk.bold(category)}: ${user_data.skills[category].join(
                  ', '
                )}\n`
              );
            }
          }
          displayMainMenu();
        },
      },

      //// Explore Qualifications
      {
        name: `My Qualifications: ${chalk.magentaBright('Qualifications')}`,
        value: () => {
          console.log(`${chalk.bold('Qualifications:')} ${qualifications}\n`);
          displayMainMenu();
        },
      },
      //// Explore Goals
      {
        name: `My Goals: ${chalk.green.bold('Goals')}`,
        value: () => {
          console.log(`${chalk.bold('Goals:')} ${goals}\n`);
          displayMainMenu();
        },
      },
      //// Go back to menu
      {
        name: `Go back to ${chalk.cyan.bold('menu')}`,
        value: displayMainMenu,
      },
      //// Farewell Message
      {
        name: 'Say goodbye for now!',
        value: () => {
          console.log('You will be missed. Until next time!\n');
        },
      },
    ],
  },
];

function displayMainMenu() {
  prompt(mainMenu).then((answer) => answer.action());
}

displayMainMenu();
