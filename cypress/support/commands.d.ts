// cypress\support\commands.d.ts

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Login, токены, кукисы
       */
      mockLogin(): Chainable<void>;

      /**
       * Очистка localStorage и куки
       */
      clearMemory(): Chainable<void>;
    }
  }
}

export {}; 
