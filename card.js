#!/usr/bin/env node

'use strict';

const boxen = require('boxen');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clear = require('clear');
const open = require('open');
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');

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
  resume_url,
  introduction,
  languages,
  qualifications,
  goals,
} = user_data;

const linkedinUrl = 'https://www.linkedin.com/in/zeeshanmukhtar1/';

const prompt = inquirer.createPromptModule();

const data = {
  name: chalk.bold.green(`                  ${user_name}`),
  work: `${chalk.white(`${job_title}`)}`,
  instagram:
    chalk.gray('https://instagram.com/') +
    chalk.magentaBright(`${instagram_username}`),
  linkedin:
    chalk.gray('https://linkedin.com/in/') + chalk.blue(`${linkedin_username}`),
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

const questions = [
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
          console.log('\nDone, see you soon at inbox.\n');
        },
      },
      //// Download Online Resume (LinkedIn)
      {
        name: `Download my ${chalk.magentaBright.bold('Online Resume')}?`,
        value: () => {
          open(linkedinUrl);
          console.log('\nRedirecting to LinkedIn profile...\n');
        },
      },
      //// Explore Introduction
      {
        name: `Learn more about me: ${chalk.cyan('Introduction')}`,
        value: () => {
          console.log(`${chalk.bold('Introduction:')} ${introduction}\n`);
        },
      },
      //// Explore Languages
      {
        name: `Explore my expertise: ${chalk.yellow('Languages')}`,
        value: () => {
          console.log(`${chalk.bold('Languages:')} ${languages.join(', ')}\n`);
        },
      },
      //// Explore Qualifications
      {
        name: `My Qualifications: ${chalk.magentaBright('Qualifications')}`,
        value: () => {
          console.log(`${chalk.bold('Qualifications:')} ${qualifications}\n`);
        },
      },
      //// Explore Goals
      {
        name: `My Goals: ${chalk.green.bold('Goals')}`,
        value: () => {
          console.log(`${chalk.bold('Goals:')} ${goals}\n`);
        },
      },
      //// Quit
      {
        name: 'Just quit and catch you later!',
        value: () => {
          console.log('Hasta la vista.\n');
        },
      },
    ],
  },
];

prompt(questions).then((answer) => answer.action());
