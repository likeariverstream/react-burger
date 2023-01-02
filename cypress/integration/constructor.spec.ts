export { }
import { baseUrl } from "../../src/utils/constants";

import {
  testIdList,
  ingredientSelector,
  constructorSelector,
  constructorElement,
  orderButtonSelector,
  ingredientImageSelector,
  closeButtonSelector,
  email,
  password
} from '../../src/utils/test-constants'

describe('service is available', () => {
  beforeEach(() => {
    cy.viewport(1920, 1024)
  });
  it('should be available on localhost:3000', () => {
    cy.visit('/');
  });
  it('should open constructor page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should open ingredient details', () => {
    cy.visit('/');
    cy.get(ingredientImageSelector).first().click()
    cy.contains('Детали ингредиента')
  });

  it('should close ingredient details by button', () => {
    cy.get(closeButtonSelector).click();
    cy.visit('/');
  });

  it('should scroll', () => {
    cy.get('[class^=burger-ingredients_scroll]').scrollTo(0, 500);
    cy.get('[class^=tab]').last().click();
  });

  it('should dragndrop bun', () => {
    cy.get(ingredientImageSelector).first().drag(constructorSelector);
    cy.get(ingredientImageSelector).first().drag(constructorSelector);
    cy.get(ingredientSelector).eq(1).drag(constructorSelector);
  })

  it('should dragndrop ingredient', () => {
    cy.get(ingredientSelector).eq(2)
      .drag(constructorSelector);
    cy.get(ingredientSelector).eq(4)
      .drag(constructorSelector);
    cy.get(ingredientSelector).eq(3)
      .drag(constructorSelector);
    cy.get(ingredientSelector).eq(5)
      .drag(constructorSelector);
    cy.get(ingredientSelector).eq(3)
      .drag(constructorSelector);
    cy.get(constructorElement).eq(3)
      .and('be.visible');
  })

  it('should delete constructor-element', () => {
    cy.get('[class^=constructor-element__action]').eq(2).click()
    cy.get('[class^=burger-element_box]').eq(4).and('not.exist');

  })

  it('should dragndrop constructor-element', () => {
    cy.get(constructorElement).eq(3)
      .drag(constructorElement)
    cy.get(constructorElement).eq(4)
      .drag(constructorElement)
  })
  it('should open order details', () => {
    cy.get('button').contains(orderButtonSelector).click()
  });

  it('should type email and password', () => {
    ;
    cy.get('input').first().type(email)
    cy.get('input').last().type(password)
  })

  it('should autorization', () => {

    cy.get('button').contains('Войти').click();
    cy.getCookies().should('be.empty')

    cy.intercept('POST', `${baseUrl}/auth/login`).as('order')
      .wait('@order').its('response.statusCode').should('eq', 200);
    cy.url().should('not.contain', '/login')
    cy.getCookie('access').should("not.be.empty");

  })

  it('should open order details and response', () => {

    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        email,
        password,
      }
    })
      .as('loginResponse')
      .then((response) => {
        Cypress.env('token', response.body.accessToken);
        return response;
      })
      .its('status')
      .should('eq', 200);
    const token = Cypress.env('token');
    const authorization = `${token}`;

    cy.get(ingredientSelector).eq(2)
      .drag(constructorSelector);
    cy.get(ingredientSelector).eq(4)
      .drag(constructorSelector);
    cy.get(ingredientSelector).eq(4)
      .and('be.visible');
    cy.contains(orderButtonSelector);
    cy.get('button').click();

    cy.request({
      method: 'POST',
      url: `${baseUrl}/orders`,
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
      body: JSON.stringify({
        ingredients: testIdList,
      })
    })
      .then((response) => {
        return response;
      })
      .its('status')
      .should('eq', 200);

  })

  it('should id be visible and close order details', () => {
    cy.get('[class^=order-details_subtitle]').and('exist');
    cy.get(closeButtonSelector).click();
  })

})
