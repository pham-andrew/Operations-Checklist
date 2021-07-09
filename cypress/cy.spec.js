/// <reference types="cypress" />

context('Actions', () => {
    // beforeEach(() => {
      // cy.visit('http://localhost:3000')
    // })
    it('Loads site', ()=>{
      cy.visit('http://localhost:3000')
    })
  
    // it('Registry', () => {
    //   cy.get('#login').click()
    //   cy.url().should('eq', 'http://localhost:3000/login')
    //   cy.get('#sign-up').click()
    //   cy.url().should('eq', 'http://localhost:3000/signup')
  
    //   cy.get("#username").type("testuser")
    //   cy.get("#password").type("password")
    //   cy.get('#sign-in').click()
    // })
  
    it('Sign in', () =>{
      cy.get('#login').click()
      cy.url().should('eq', 'http://localhost:3000/login')
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#sign-in').click()
      cy.url().should('eq', 'http://localhost:3000/')
    })
  
    it('Should go to a list', ()=>{
      cy.get('#1').click()
      cy.url().should('eq', 'http://localhost:3000/checklist/1')
    })
  
  
    
    it('Creates a checklist', () => {
        cy.get('#create').click()
        cy.url().should('eq', 'http://localhost:3000/create')
        cy.get("#title").type("Cool title")
        cy.get('.setTitle').click()
        cy.get('.title').contains('Cool title')
      
        cy.get('#item').type("Step 1")
        cy.get('.addStep').click()
      
        cy.get('#item').type("Step 2")
        cy.get('.addStep').click()
        cy.get('#item').type("Step 3")
        cy.get('.addStep').click()
      
        cy.get('#1 .del').click()
      })  
      
      // it('Clicking home should take us home', () => {
        //   cy.get('#home').click()
        //   cy.url().should('eq', 'http://localhost:3000/')
        // })
  
        it('Sign out', ()=>{
          cy.get('#logout').click()
          cy.url().should('eq', 'http://localhost:3000/logout')
          cy.get('#home').click()
          cy.url().should('eq', 'http://localhost:3000/login')
        })

      })  