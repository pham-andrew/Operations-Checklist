import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import CreateChecklist from './Components/CreateChecklist'
import CreateUser from './Components/CreateUser'
import userEvent from '@testing-library/user-event'


// Wrapper for render
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

describe('App component',()=>{
  it('Renders home link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  })
  
  it('Renders login link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
  })
  
  it('Allows user to type into login boxes', ()=>{
    // Signing in
    renderWithRouter(<App />)
    const usernameInput = document.getElementById('username')
    const passwordInput = document.getElementById('password')
    const signInButton = document.getElementById('sign-in')
    userEvent.type(usernameInput, 'testuser')
    userEvent.type(passwordInput, 'password')
    expect(usernameInput).toHaveValue('testuser')
    expect(passwordInput).toHaveValue('password')
  })
})

describe('Create a checklist component', ()=>{
  it('Shows create a checklist', ()=>{
    renderWithRouter(<CreateChecklist />)
    const header = screen.getByText(/Create Checklist/)
    expect(header).toBeInTheDocument()
  })
  
  it('Allows users to type into the title and step fields', ()=>{
    renderWithRouter(<CreateChecklist />)
    const title = document.getElementById('title')
    const step = document.getElementById('item')
    userEvent.type(title, 'a sample title')
    userEvent.type(step, 'a sample step')
    expect(title).toHaveValue('a sample title')
    expect(step).toHaveValue('a sample step')
  })
})

describe('CreateUser Component', ()=>{
  it('Should allow users to enter a name and password',()=>{
    renderWithRouter(<CreateUser />)
    const usernameField = document.getElementById('username')
    const passwordField = document.getElementById('password')
    userEvent.type(usernameField, 'jimBob')
    userEvent.type(passwordField, 'superSecRet')
    expect(usernameField).toHaveValue('jimBob')
    expect(passwordField).toHaveValue('superSecRet')
  })
})