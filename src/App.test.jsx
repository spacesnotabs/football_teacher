import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Football Fundamentals Lab', () => {
  it('renders the main hero and lesson tabs', () => {
    render(<App />)
    expect(screen.getByText(/Football Fundamentals Lab/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Basics of the Game/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Schemes & Coverages/i })).toBeInTheDocument()
  })

  it('changes depth level content', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Intermediate' }))
    expect(screen.getByText(/Field Position & Clock/i)).toBeInTheDocument()
  })

  it('shows play selector', () => {
    render(<App />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
