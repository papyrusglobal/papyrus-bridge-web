import React from 'react';
import { inject, observer } from "mobx-react";
import loadingLogo from '../assets/images/logos/logo-loader.svg'
import { ProgressRing } from './ProgressRing'
import { PreventExit } from './PreventExit'

@inject("RootStore")
@observer
export class Loading extends React.Component {
  render() {
    const { alertStore, web3Store } = this.props.RootStore
    const { loadingStepIndex, loadingSteps, blockConfirmations } = alertStore
    const requiredConfirmations = web3Store.metamaskNet.id === web3Store.homeNet.id.toString()
      ? parseInt(process.env.REACT_APP_HOME_REQUIRED_BLOCK_CONFIRMATIONS)
      : parseInt(process.env.REACT_APP_FOREIGN_REQUIRED_BLOCK_CONFIRMATIONS)
    const style = alertStore.showLoading ? {display: 'flex'} : {display: 'none'}
    let progress = 100
    if (loadingStepIndex !== 3) {
      progress = loadingStepIndex === 2 ? 90 : blockConfirmations / requiredConfirmations * 90
    }
    return (
      <div className={`loading-container ${loadingStepIndex > 0 ? 'mobile-container' : ''}`} style={style}>
        {loadingStepIndex > 0 && <ProgressRing
          radius={ 40 }
          stroke={ 4 }
          progress={progress}
          confirmationNumber={blockConfirmations}
          hideConfirmationNumber={loadingStepIndex > 2}
          requiredConfirmations={requiredConfirmations}
        />}
        {loadingStepIndex === 0 && (<img className="loading" src={loadingLogo} alt="loading"/>)}
        {loadingStepIndex === 0 && <div className="loading-i" />}
        {loadingStepIndex > 0 && (<div className="loading-text">{loadingSteps[loadingStepIndex]}</div>)}
        {alertStore.showLoading && <PreventExit />}
      </div>
    )
  }
}
