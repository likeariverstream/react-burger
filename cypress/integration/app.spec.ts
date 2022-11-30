export {}

describe('service is available', () => {
  beforeEach(() => {
    cy.viewport(1920, 1024)
  });
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });
  it('should open constructor page by default', () => {
    cy.contains('Соберите бургер');

  });

  it('should open ingredient details', () => {
    cy.get('img').first().click()
    cy.contains('Детали ингредиента')
  });

  it('should close ingredient details by button', () => {
    cy.get('[class^=modal_icon]').click();
    cy.visit('http://localhost:3000');
  });

  it('should scroll', () => {
    cy.get('[class^=burger-ingredients_scroll').scrollTo(0, 500);
    cy.get('[class^=tab]').last().click();
  });

  it('should dragndrop bun', () => {
    cy.get('[class^=ingredient_image]').first().drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=ingredient_image]').first().drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=ingredient_ingredient]').eq(1).drag('[class^=burger-constructor_scroll]');
  })

  it('should dragndrop ingredient', () => {
    cy.get('[class^=ingredient_ingredient]').eq(2)
      .drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=ingredient_ingredient]').eq(4)
      .drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=ingredient_ingredient]').eq(3)
      .drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=ingredient_ingredient]').eq(5)
      .drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=ingredient_ingredient]').eq(3)
      .drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=constructor-element]').eq(3)
      .and('be.visible');
  })

  it('should delete constructor-element', () => {
    cy.get('[class^=constructor-element__action]').eq(2).click()
    cy.get('[class^=burger-element_box]').eq(4).and('not.exist');

  })

  it('should dragndrop constructor-element', () => {
    cy.get('[class^=constructor-element]').eq(3)
      .drag('[class^=constructor-element]')
    cy.get('[class^=constructor-element]').eq(4)
      .drag('[class^=constructor-element]')
  })
  it('should open ingredients detail', () => {
    cy.get('button').contains('Оформить заказ').click()
    cy.visit('http://localhost:3000/login')
  });
  it('should type email and password', () => {
    const email = '123123@123.ru';
    const password = '123123';
    cy.get('input').first().type(email)
    cy.get('input').last().type(password)

  })

  it('should autorization', () => {
    const email = '123123@123.ru';
    const password = '123123';
    const url = `https://norma.nomoreparties.space/api/auth/login`

    cy.get('button').contains('Войти').click();
    // cy.intercept('POST', url).as('login');
    // cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.request({
      url: url,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      }),
    }).then((response) => {
      expect(response.status).to.equal(200)
      // expect(response.body).to.deep.equal({
      // })
    })

  })

  it('should open order details', () => {
    cy.get('[class^=ingredient_ingredient]').eq(2)
      .drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=ingredient_ingredient]').eq(4)
      .drag('[class^=burger-constructor_scroll]');
    cy.get('[class^=ingredient_ingredient]').eq(4)
      .and('be.visible');
    cy.get('button').first().click();
    cy.contains('Оформить заказ');
    const url = `https://norma.nomoreparties.space/api/orders`
    cy.intercept('POST', url).as('order');
    cy.wait('@order').its('response.statusCode').should('eq', 200)
  });

  it('should id be visible', () => {
    cy.get('[class^=order-details_subtitle]').and('be.visible');
  })

  it('should close order details by button', () => {
    cy.get('[class^=modal_icon]').click();
    cy.visit('http://localhost:3000');
    cy.get('[class^=constructor-element]').and('not.exist');
  });
})

