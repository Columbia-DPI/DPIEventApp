import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Event from '../containers/event.jsx';
import '../style.css'

class HomePage extends Component {

  state = {
    currentIndex: 0,
    itemsInSlide: 1,
    responsive: { 0: { items: 3 } },
    galleryItems: this.galleryItems(),
  }

  galleryItems() {
    return Array(6)
      .fill()
      .map((item, i) => <Event info = {{title:"Event name",type:"Academic",img:"img_"+(i+1)}}/>)
  }

  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide
    this.setState({ currentIndex })
  }

  slideNextPage = () => {
    const {
      itemsInSlide,
      galleryItems: { length },
    } = this.state
    let currentIndex = this.state.currentIndex + itemsInSlide
    if (currentIndex > length) currentIndex = length

    this.setState({ currentIndex })
  }

  handleOnSlideChange = (event) => {
    const { itemsInSlide, item } = event
    this.setState({ itemsInSlide, currentIndex: item })
  }

  render() {
    // javascript code here
    const { currentIndex, galleryItems, responsive } = this.state

    return (
      <div class="Row">
        <div class="Column_side">
          <button class="button" onClick={this.slidePrevPage}><i class="i arrow left"></i></button>
          </div>
        <div class="Column_center">
          <AliceCarousel
            items={galleryItems}
            slideToIndex={currentIndex}
            responsive={responsive}
            buttonsDisabled={false}
            onInitialized={this.handleOnSlideChange}
            onSlideChanged={this.handleOnSlideChange}
            onResized={this.handleOnSlideChange}
          />
        </div>
        <div class="Column_side">
          <button class="button" onClick={this.slideNextPage}><i class="i arrow right"></i></button>
        </div>
      </div>
    )
  }
}

export default HomePage;
