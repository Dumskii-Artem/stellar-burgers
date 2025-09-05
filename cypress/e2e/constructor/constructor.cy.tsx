// cypress\e2e\constructor\constructor.cy.tsx

/// <reference types="cypress" />

import type {} from "../../support/cypress";

describe('Главная страница, ингредиенты, конструктор', () => {
//   грузим каждый раз, чтобы тесты были независимыми
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Проверка модального окна ингредиента', function () {
    beforeEach(() => {
        cy.getBySelId('all_ingredients_div', 'li:first').as('firstIngredient');
    })

    it('Открытие модалки и проверка содержимого', function () {
        cy.get('@firstIngredient').click();
        cy.getBySelId('modal_div').should(
        'have.text',
        'Детали ингредиентаКраторная булка N-200iКалории, ккал420Белки, г80Жиры, г24Углеводы, г53'
        );
    });

    it('Закрытие крестиком', function () {
        cy.get('@firstIngredient').click();
        cy.getBySelId('modal_close_btn').click();
        cy.getBySelId('modal_div').should('not.exist');
    });

    it('Закрытие кликом на overlay', function () {
        cy.get('@firstIngredient').click();
        // force чтобы нично не могло перекрыть 
        cy.getBySelId('modal_overlay').click('topLeft', { force: true });
        cy.getBySelId('modal_div').should('not.exist');
    });
  });

  describe('order', function () {
    beforeEach((
    ) => {
        cy.getBySelId('all_ingredients_div', 'ul').as('ingredientsList');        
        // булки
        cy.get('@ingredientsList').eq(0).as('bun')
        cy.get('@bun').find('li').eq(1).as('second_bun')

        // начинки
        cy.get('@ingredientsList').eq(1).as('fillings')
        cy.get('@fillings').find('li').eq(1).as('filing');

        // соусы
        cy.get('@ingredientsList').eq(2).as('sauces')
        cy.get('@sauces').find('li').eq(1).as('sauce');
    });

    it('булка отобразилась в конструкторе', function () {
        cy.get('@second_bun').find('button').click();
        cy.get('@second_bun').find('[data-testid=ingredient_name]').invoke('text')
        .then((bunName) => {
            cy.getBySelId('top_bun_in_constructor').should('contain.text', bunName.trim());
        });
    });

    it('начинка отобразилась в конструкторе', function () {
        cy.get('@filing').find('button').click();
        cy.get('@filing').find('[data-testid=ingredient_name]').invoke('text')
        .then((fillingName) => {
            cy.getBySelId('constructor_ingredients_list').should('contain.text', fillingName.trim());
        });
    });

    it('соус отобразился в конструкторе', function () {
        cy.get('@sauce').find('button').click();
        cy.get('@sauce').find('[data-testid=ingredient_name]').invoke('text')
        .then((sauceName) => {
            cy.getBySelId('constructor_ingredients_list').should('contain.text', sauceName.trim());
        });
    });


    it('Собираем бургер и заказываем его (пока не сделано)', function () {

        // в результате, мы становимся авторизованными с пользователем
        // из cypress/fixtures/user.json
        cy.mockLogin();

        // супербургер. в ордер.json такой же, хотя это не проверяется
        cy.get('@second_bun').find('button').click();

        cy.get('@sauces').find('li').eq(0).find('button').click();
        cy.get('@fillings').find('li').eq(1).find('button').click();
        cy.get('@sauces').find('li').eq(1).find('button').click();
        cy.get('@fillings').find('li').eq(2).find('button').click();
        cy.get('@sauces').find('li').eq(1).find('button').click();
        cy.get('@fillings').find('li').eq(1).find('button').click();
        cy.get('@sauces').find('li').eq(2).find('button').click();


        cy.getBySelId('make_order').click();
        cy.getBySelId('modal_div').should('exist');

        // номер заказа берется отсюда cypress\fixtures\order.json
        cy.getBySelId('modal_div').should(
        'have.text',
        '777777идентификатор заказаВаш заказ начали готовитьДождитесь готовности на орбитальной станции'
        );

        cy.getBySelId('modal_close_btn').click();
        // модалка заккрылась
        cy.getBySelId('modal_div').should('not.exist');
        // нет верхней булки
        cy.getBySelId('top_bun_in_constructor').should('not.exist');
        // нет начинки
        cy.contains('Выберите начинку').should('be.visible');

        cy.clearMemory();
    });
  });
});
