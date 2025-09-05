// cypress\support\cypress.d.ts


import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Login, токены, кукисы
       */
      mockLogin(): void;

      /**
       * Очистка localStorage и куки
       */
      clearMemory(): void;

      getBySelId(
        selector: string,
        childSelector?: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
      ): Chainable<JQuery<HTMLElement>>;

      // getBySelId(
      //   selector: string,
      //   options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
      // ): Chainable<JQuery<HTMLElement>>;

      // getBySelId(selector, ...args): Chainable<JQuery<E>>;
      // getBySelId(
      //   selector: string,
      //   ...args: Parameters<typeof cy.get>
      // ): Chainable<JQuery<HTMLElement>>;
    }
  }
}


// import './commands';

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       /**
//        * Login, токены, кукисы
//        */
//       mockLogin(): Chainable<void>;

//       /**
//        * Очистка localStorage и куки
//        */
//       clearMemory(): Chainable<void>;
//     }
//   }
// }

// export {}; 
