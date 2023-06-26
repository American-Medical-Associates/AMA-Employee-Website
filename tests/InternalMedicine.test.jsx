import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
import InternalMedicine from '../pages/MIS/InternalMedicine'

describe('InternalMedicine', () => {
  it('renders without crashing', () => {
    render(<InternalMedicine />)

    // Check if the page title is in the document
    const title = screen.getByText(/Internal Medicine MIS/i)
    expect(title).toBeInTheDocument()

    // Add more assertions as needed to ensure your component is working as expected
  })

  // Here you can add more tests to check specific functionalities
  // For instance, you can test if the state updates correctly when the form is submitted,
  // or if the elements are correctly added to the list when the button is clicked
})
