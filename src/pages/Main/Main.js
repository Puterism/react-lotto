import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LottoNumberList from '../../components/LottoNumberList/LottoNumberList';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { LOTTO } from '../../constants';
import { getRandomId, shuffle } from '../../utils';
import { Styled } from './Main.style';
class Main extends Component {
  constructor() {
    super();

    this.state = {
      moneyInput: '',
      lottoList: {},
      lottoCount: 0,
      isNumberShowing: false,
    };

    this.handleSubmitMoneyInput = this.handleSubmitMoneyInput.bind(this);
    this.handleChangeMoneyInput = this.handleChangeMoneyInput.bind(this);
    this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
  }

  generateLotto(baseNumberList) {
    const lottoId = getRandomId();
    const lottoNumberList = shuffle(baseNumberList)
      .slice(0, LOTTO.COUNT)
      .sort((a, b) => a - b);

    return { [lottoId]: lottoNumberList };
  }

  purchaseLottoList() {
    const count = Math.floor(this.state.moneyInput / LOTTO.PRICE);
    const baseNumberList = Array.from({ length: LOTTO.MAX_NUMBER }, (_, index) => index + 1);
    let newLottoList = {};

    Array.from({ length: count }, () => {
      const lotto = this.generateLotto(baseNumberList);
      newLottoList = { ...newLottoList, ...lotto };
    });

    this.setState({ lottoList: newLottoList, lottoCount: count });
  }

  handleSubmitMoneyInput(event) {
    event.preventDefault();

    this.purchaseLottoList();
  }

  handleChangeMoneyInput(event) {
    this.setState({ moneyInput: Number(event.target.value) });
  }

  handleToggleSwitch(event) {
    this.setState({ isNumberShowing: event.target.checked });
  }

  render() {
    const { lottoList, moneyInput } = this.state;

    return (
      <Styled.Container>
        <form onSubmit={this.handleSubmitMoneyInput}>
          <input
            type="number"
            value={this.state.moneyInput}
            min={LOTTO.PRICE}
            onChange={this.handleChangeMoneyInput}
            disabled={this.state.lottoCount > 0 ? 'disabled' : ''}
            required
          />
          <button type="submit" disabled={this.state.lottoCount > 0 ? 'disabled' : ''}>
            구입
          </button>
        </form>
        <div>
          <p>
            현재 구입한 로또 <span>{this.state.lottoCount}</span>개
          </p>
          <ToggleSwitch
            title="번호 보기"
            isChecked={this.state.isNumberShowing}
            onChange={this.handleToggleSwitch}
          />
          {this.state.isNumberShowing && <LottoNumberList lottoList={this.state.lottoList} />}
        </div>
        <Link
          to={{
            pathname: '/enter-winning',
            state: { lottoList, moneyInput },
          }}
        >
          <button>🤩 당첨 번호 입력</button>
        </Link>
      </Styled.Container>
    );
  }
}

export default Main;