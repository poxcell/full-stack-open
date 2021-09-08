describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name:'manuel',
      username:'dill-dough',
      password:'12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.contains('log in to application')
  })

  describe('Login',function(){
    it('succeds with correct credentials',function(){
      cy.get('#username-input').type('dill-dough')
      cy.get('#password-input').type('12345')
      cy.get('#login-button').click()
      cy.get('.popUp').contains('logged in as dill-dough')
    })
    it('fails with wrong credentials',function(){
      cy.get('#username-input').type('asdf')
      cy.get('#password-input').type('asdf')
      cy.get('#login-button').click()
      cy.get('.popUp').contains('wrong username or password')
        .and('have.css','color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username-input').type('dill-dough')
      cy.get('#password-input').type('12345')
      cy.get('#login-button').click()
    })
    it('A blog can be created', function () {
      cy.get('#create-blog-create-button').click()
      cy.contains('title:')
      cy.get('#title').type('lorem ipsum dolore')
      cy.get('#author').type('lorem guy')
      cy.get('#url').type('www.lorempoems.com')
      cy.get('#submit-button').click()
      cy.get('#blog-list').contains('lorem ipsum dolore lorem guy')
    })
    it('posts can be liked',function() {
      cy.get('#create-blog-create-button').click()
      cy.contains('title:')
      cy.get('#title').type('lorem ipsum dolore')
      cy.get('#author').type('lorem guy')
      cy.get('#url').type('www.lorempoems.com')
      cy.get('#submit-button').click()
      cy.get('#blog-list')
        .contains('lorem ipsum dolore lorem guy')
        .get('.view-button')
        .click()
        .get('.like-button')
        .click()
      cy.get('#blog-list')
        .contains('lorem ipsum dolore')
        .get('.blog').contains('1')

      cy.get('#blog-list')
        .contains('lorem ipsum dolore')
        .get('.like-button')
        .click()

      cy.get('#blog-list')
        .contains('lorem ipsum dolore')
        .get('.blog').contains('2')

    })
    it.only('posts are ordered by likes', function(){
      cy.get('#create-blog-create-button').click()

      cy.get('#title').type('lorem ipsum dolore')
      cy.get('#author').type('lorem guy')
      cy.get('#url').type('www.lorempoems.com')
      cy.get('#submit-button').click()

      cy.get('#title').type('quack quack quack')
      cy.get('#author').type('a duck')
      cy.get('#url').type('www.quiacking.com')
      cy.get('#submit-button').click()

      cy.get('#blog-list')
        .contains('lorem ipsum dolore lorem guy')
        .get('.view-button')
        .click()
        .get('.like-button')
        .click()

      cy.get('#blog-list')
        .contains('quack quack quack')
        .get('.view-button')
        .click()
      cy.contains('quack quack quack').parent()
        .find('.like-button')
        .click()

      cy.contains('quack quack quack')
        .parent()
        .find('.like-count')
        .contains(1)

      cy.contains('quack quack quack')
        .parent()
        .find('.like-button')
        .click()

      cy.get('#blog-list')
        .closest('div')
        .contains('quack quack quack')
    })
  })
})