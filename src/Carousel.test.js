import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it('renders carousel component successfully', () => {
  render(<Carousel />);
});

it('matches snapshot', () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click the left error", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow); // go right one slide before starting test

  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
});

it('should not display left arrow when on the starting slide but should display on slide 2', () => {
  const { queryByTestId } = render(<Carousel />);

  let leftArrow = queryByTestId('left-arrow');
  expect(leftArrow).not.toBeInTheDocument();

  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow); // go right one slide to make sure the arrow is accessible now

  leftArrow = queryByTestId('left-arrow');
  expect(leftArrow).toBeInTheDocument();
});

it('should not display right arrow when on the last slide but should display other slides', () => {
  const { queryByTestId } = render(<Carousel />);

  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow); // go right 1 slide. Right arrow should still be present

  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow); // go right to the last slide. Right arrow should be n/a

  expect(rightArrow).not.toBeInTheDocument();

})
