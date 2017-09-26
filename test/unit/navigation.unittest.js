// Try to set a different value (not booleans) for the pagination prop

// check that navigation buttons are vertically aligned and at the sides?

// clicking a pagination indicator selectes that view (is it e2e?)

(() => {
  const expect = chai.expect;

  describe('x-slider — navigation buttons', () => {
    before(wcutils.before());
    after(wcutils.after());
    beforeEach(async () => {
      this.container.innerHTML = `
      <x-slider selected="2">
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
      </x-slider>`;
      return wcutils.waitForElement('x-slider')
        .then(() => {
          this.slider = this.container.querySelector('x-slider');
          this.navigationWrapper = this.slider.shadowRoot.querySelector('#navigation');
        });
    });

    describe('navigation disabled', () => {
      it('navigation is false', () => {
        expect(this.slider.navigation).to.be.false;
        expect(this.slider.getAttribute('navigation')).to.be.null;
      });

      it('should not add navigation buttons', () => {
        expect(this.slider.navigationWrapper.childElementCount).to.be.equal(0);
      });
    });

    describe('navigation enabled', () => {
      beforeEach(() => {
        this.slider.navigation = true;

        this.prevButton = this.slider.navigationWrapper.querySelector('#previous');
        this.nextButton = this.slider.navigationWrapper.querySelector('#next');
      });

      it('navigation is true', () => {
        expect(this.slider.navigation).to.be.true;
        expect(this.slider.getAttribute('navigation')).to.not.be.null;
      });

      it('should have 2 navigation buttons', () => {
        expect(this.slider.navigationWrapper.childElementCount).to.be.equal(2);
        expect(this.prevButton).to.exist;
        expect(this.nextButton).to.exist;
      });

      it('should enable prev and next if the selected slide is neither the first nor the last', () => {
        expect(this.prevButton.disabled).to.be.false;
        expect(this.nextButton.disabled).to.be.false;
      });

      it('should disable prev if the first slide is selected', () => {
        this.slider.selected = 0;

        expect(this.prevButton.disabled).to.be.true;
        expect(this.nextButton.disabled).to.be.false;
      });

      it('should disable next if the last slide is selected', () => {
        this.slider.selected = 4;

        expect(this.prevButton.disabled).to.be.false;
        expect(this.nextButton.disabled).to.be.true;
      });

      it('should enable/disable the navigation buttons if the light DOM changes', done => {
        this.slider.selected = 4;

        const lastSlide = document.createElement('div');
        this.slider.appendChild(lastSlide);

        expect(this.prevButton.disabled).to.be.false;
        expect(this.nextButton.disabled).to.be.false;

        setTimeout(() => {
          lastSlide.parentElement.removeChild(lastSlide);

          expect(this.prevButton.disabled).to.be.false;
          expect(this.nextButton.disabled).to.be.true;
        }, 1000);

      });

      it('should remove the navigation buttons if navigation is disabled', () => {
        this.slider.navigation = false;

        expect(this.slider.navigationWrapper.childElementCount).to.be.equal(0);
      });
    });
  });
})();
