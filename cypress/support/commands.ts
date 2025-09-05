// cypress\support\commands.ts
// /// <reference types="cypress" />

import type {} from './commands';

const URL = 'https://norma.nomoreparties.space/api';

Cypress.Commands.add('mockLogin', (): void => {
  // в результате, мы становимся авторизованными с пользователем
  // из cypress/fixtures/user.json
  cy.intercept('POST', '**/auth/login', { fixture: 'login' }).as('postLogin');
  cy.intercept('GET', '**/auth/user', { fixture: 'user' }).as('getUser');
  cy.intercept('POST', '**/orders', { fixture: 'order' }).as('order');
  window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
  );
  cy.setCookie('accessToken', 'test-accessToken');
  cy.visit('/');


  // cy.intercept('POST', `/login`, { fixture: 'login' }).as('postLogin');
  // cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user' }).as('getUser');
  // window.localStorage.setItem(
  //   'refreshToken',
  //   JSON.stringify('test-refreshToken')
  // );
  // cy.setCookie('accessToken', 'test-accessToken');
});

Cypress.Commands.add('clearMemory', (): void => {
  cy.clearLocalStorage();
  cy.clearCookies();
});


Cypress.Commands.add('getBySelId', (
  selector: string,
  childSelector?: string,
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
) => {
  const fullSelector = `[data-testid=${selector}]${childSelector ? ' ' + childSelector : ''}`;
  return cy.get(fullSelector, options);
});


// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
