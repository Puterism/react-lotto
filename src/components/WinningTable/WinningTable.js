import React, { Component } from 'react';
import { WINNING_TABLE } from '../../constants';
import { currencyFormat } from '../../utils';
import Styled from './WinningTable.style';

class WinningTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { winningResult } = this.props;

    return (
      <Styled.Table>
        <thead>
          <Styled.TableRow>
            <Styled.TableHeader>등수</Styled.TableHeader>
            <Styled.TableHeader>일치 갯수</Styled.TableHeader>
            <Styled.TableHeader>당첨금</Styled.TableHeader>
            <Styled.TableHeader>당첨 갯수</Styled.TableHeader>
          </Styled.TableRow>
        </thead>
        <tbody>
          {Object.entries(winningResult).map(([ranking, winningCount]) => (
            <Styled.TableRow key={ranking}>
              <Styled.TableItem>{WINNING_TABLE[ranking].TITLE}</Styled.TableItem>
              <Styled.TableItem>{WINNING_TABLE[ranking].MATCH_CONDITION}</Styled.TableItem>
              <Styled.TableItem>{currencyFormat(WINNING_TABLE[ranking].PRIZE)}</Styled.TableItem>
              <Styled.TableItem>
                <span>{winningCount}</span>개
              </Styled.TableItem>
            </Styled.TableRow>
          ))}
        </tbody>
      </Styled.Table>
    );
  }
}

export default WinningTable;