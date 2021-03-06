import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

let Loader = require('react-loader');

import * as notificationActions from '../actions/notificationActions';
import * as betActions from '../actions/betActions';


class BetMaker extends Component {

  componentDidMount() {

  }

  updateInputValue(e, field) {
    let newBet = Object.assign({}, this.props.betStore.get("newBet"));
    newBet[field] = e.target.value;
    this.props.betActions.setNewBet({newBet});
  }

  isValidNewBet() {
    let newBetAmount = parseFloat(this.props.betStore.get("newBet").amount);
    let newBetEdge = parseFloat(this.props.betStore.get("newBet").edge);
    return newBetAmount > 0 &&
      newBetEdge >= -100 && newBetEdge <= 100;
  }

  saveNewBet() {
    this.props.betActions.saveNewBet();
  }

  render() {
    let {betStore} = this.props;

    return (
      <div className="col-lg-6">
        <div className="well">
          <form className="form-horizontal">
            <legend>Offer Bet</legend>
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 bet-row input-group">
                <input name="amount" type="text" className="form-control"
                       value={betStore.get("newBet").amount}
                       onChange={(e) => this.updateInputValue(e, 'amount')}
                       placeholder="Number of tokens"/>
                <div className="input-group-addon">EBET</div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 bet-row input-group">
                <input name="edge" type="text" className="form-control"
                       value={betStore.get("newBet").edge}
                       onChange={(e) => this.updateInputValue(e, 'edge')}
                       placeholder="Edge"/>
                <div className="input-group-addon">&nbsp;&nbsp;%&nbsp;&nbsp;</div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-lg-offset-4">
                <button type="button" className="btn btn-info"
                        onClick={this.saveNewBet.bind(this)}
                        disabled={!this.isValidNewBet() || betStore.get("savingNewBet")}>
                  Offer Bet
                </button>
              </div>
            </div>
            <Loader color="white" loaded={!betStore.get("savingNewBet")}/>

          </form>
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    betStore: state.betStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notificationActions: bindActionCreators(notificationActions, dispatch),
    betActions: bindActionCreators(betActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BetMaker);
