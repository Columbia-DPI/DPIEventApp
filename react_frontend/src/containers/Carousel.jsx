import React from 'react';

class Gallery extends React.Component {
    constructor() {
      super();
      this.state = {
        currentIndex: 0,
        itemsInSlide: 3,
        responsive: {0: { items: 3 }},
        events = []
      };
    }

    componentDidMount(){
        this.setState({
            events: this.props.events
        })
    }

    slideTo = (i) => this.setState({ currentIndex: i });

    onSlideChanged = (e) => this.setState({ currentIndex: e.item });

    slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 });

    slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 });

    renderThumbs = () =>
      <ul>{this.state.items.map((item, i) =>
        <li key={i} onClick={() => this.slideTo(i)}>Thumb {item}</li>)}
      </ul>;

    renderGallery() {
      const { currentIndex, events } = this.state;

      return (<AliceCarousel
        dotsDisabled={true}
        buttonsDisabled={true}
        slideToIndex={currentIndex}
        onSlideChanged={this.onSlideChanged}
      >
        { events.map((item, i) => <div key={i} className="yours-custom-class"><h2>{ item }</h2></div>) }
      </AliceCarousel>);
    }

    render() {
      return (
        <div>
          <h3>Navigation</h3>
          { this.renderThumbs() }
          <button onClick={() => this.slidePrev()}>Prev button</button>
          <button onClick={() => this.slideNext()}>Next button</button>
          <h3>React Alice Carousel</h3>
          { this.renderGallery() }
        </div>
      );
    }
}