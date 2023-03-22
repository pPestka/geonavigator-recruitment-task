import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import Form from "./components/Form";
import * as Calculation from "./functions/Calculation";
import Result from "./components/Result";
import Attention from "./components/Attention";
import * as Validation from "./functions/Validation";
import * as Formatting from "./functions/Formatting.js";
import { AddLocation } from "./components/AddLocation";
import { Locations } from "./components/Locations";
import Recalculation from "./components/Recalculation";

import "./styles/App.css";

class App extends React.Component {
  state = {
    isAttentionVisible: false,
    attentionIndex: -1,
    recalculateOrReset: true,
    geodesicY: "",
    geodesicX: "",
    latitudeBDecimal: "",
    longitudeLDecimal: "",
    latitudeBDegreeMinutesSeconds: "",
    longitudeLDegreeMinutesSeconds: "",
    linkToGoogleMaps: "",
  };

  setZeroState() {
    this.setState({
      geodesicY: "",
      geodesicX: "",
      latitudeBDecimal: "",
      longitudeLDecimal: "",
      latitudeBDegreeMinutesSeconds: "",
      longitudeLDegreeMinutesSeconds: "",
      linkToGoogleMaps: "",
    });
  }

  setEditingMode() {
    this.setState({
      isAttentionVisible: false,
      attentionIndex: -1,
      isRecalculateAvailable: true,
    });
  }

  showResult() {
    this.setState({
      recalculateOrReset: false,
    });
  }

  showAttention(attentionIndex) {
    this.setState({
      isAttentionVisible: true,
      attentionIndex: attentionIndex,
    });
  }

  handleInput = (e) => {
    this.setEditingMode();
    var value = Formatting.formatValue(e.target.value);
    console.log(value);
    if (!isNaN(value)) {
      var id = e.target.id;
      console.log(id);
      switch (id) {
        case "geodesicY":
          this.setState({
            geodesicY: value,
          });
          break;
        case "geodesicX":
          this.setState({
            geodesicX: value,
          });
      }
    } else {
      this.showAttention(1);
    }
  };

  handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        this.handleClick();
        break;
      case "Escape":
        this.setEditingMode();
        var id = e.target.id;
        switch (id) {
          case "geodesicY":
            this.setState({
              geodesicY: "",
            });
            break;
          case "geodesicX":
            this.setState({
              geodesicX: "",
            });
            break;
        }
    }
  };

  handleClick = (event) => {
    if (!this.state.recalculateOrReset) {
      this.setEditingMode();
      this.setZeroState();
    } else if (this.state.geodesicY === "" || this.state.geodesicX === "") {
      this.showAttention(0);
    } else if (
      !Validation.areValueInRange(this.state.geodesicY, 7000000, 8000000) ||
      !Validation.areValueInRange(this.state.geodesicX, 5000000, 6500000)
    ) {
      this.showAttention(2);
    } else {
      var arrayBL = Calculation.polandCs2000Zone7ToGeografic(
        this.state.geodesicY,
        this.state.geodesicX
      );
      console.log(arrayBL[0]);
      console.log(arrayBL[1]);
      var latitudeBDecimal = arrayBL[0];
      var longitudeLDecimal = arrayBL[1];
      var latitudeBDegreeMinutesSeconds =
        Calculation.decimalToDegreesMinutesAndSeconds(arrayBL[0]) + "N";
      var longitudeLDegreeMinutesSeconds =
        Calculation.decimalToDegreesMinutesAndSeconds(arrayBL[1]) + "E";
      var linkToGoogleMaps = Calculation.linkGenerate(
        latitudeBDegreeMinutesSeconds,
        longitudeLDegreeMinutesSeconds
      );

      this.setState({
        latitudeBDecimal: latitudeBDecimal,
        longitudeLDecimal: longitudeLDecimal,
        latitudeBDegreeMinutesSeconds: latitudeBDegreeMinutesSeconds,
        longitudeLDegreeMinutesSeconds: longitudeLDegreeMinutesSeconds,
        linkToGoogleMaps: linkToGoogleMaps,
      });

      this.showResult();
      this.areDataInRecommendedRange();
      event.preventDefault();
      console.log(this.state.linkToGoogleMaps);
    }
  };

  areDataInRecommendedRange = () => {
    var isRecommendedY = Validation.isRecommendedValue(
      this.state.geodesicY,
      5440700,
      8510300
    );
    var isRecommendedX = Validation.isRecommendedValue(
      this.state.geodesicX,
      5430000,
      6078700
    );
    if (!isRecommendedY || !isRecommendedX) {
      this.showAttention(3);
    }
  };

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <div>
            <Form
              geodesicY={this.state.geodesicY}
              geodesicX={this.state.geodesicX}
              onChange={this.handleInput}
              onKeyDown={this.handleKeyDown}
            />
            <Recalculation
              onClick={this.handleClick}
              recalculateOrReset={this.state.recalculateOrReset}
              isRecalculateVisible={true}
            />
            <AddLocation
              geodesicY={this.state.geodesicY}
              geodesicX={this.state.geodesicX}
              latitudeBDecimal={this.state.latitudeBDecimal}
              longitudeLDecimal={this.state.longitudeLDecimal}
              latitudeBDegreeMinutesSeconds={
                this.state.latitudeBDegreeMinutesSeconds
              }
              longitudeLDegreeMinutesSeconds={
                this.state.longitudeLDegreeMinutesSeconds
              }
              linkToGoogleMaps={this.state.linkToGoogleMaps}
            />
            <Result
              isResultVisible={!this.state.recalculateOrReset}
              longitudeLDecimal={this.state.longitudeLDecimal}
              latitudeBDecimal={this.state.latitudeBDecimal}
              latitudeBDegreeMinutesSeconds={
                this.state.latitudeBDegreeMinutesSeconds
              }
              longitudeLDegreeMinutesSeconds={
                this.state.longitudeLDegreeMinutesSeconds
              }
              link={this.state.linkToGoogleMaps}
            />

            <Attention
              isAttentionVisible={this.state.isAttentionVisible}
              attentionIndex={this.state.attentionIndex}
            />

            <Locations
              onChange={this.handleInput}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
