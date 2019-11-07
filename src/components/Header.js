import React from 'react';
import { Link } from  'react-router-dom'
import logo from '../assets/images/logos/logo-papyrus.png'
import menuIcon from '../assets/images/icons/icon-menu.svg'
import menuOpenIcon from '../assets/images/icons/icon-close.svg'
import infoIcon from '../assets/images/icons/icon-info.svg'
import { Wallet } from './Wallet'
import { DailyQuotaModal } from './DailyQuotaModal'
import { inject, observer } from 'mobx-react/index'
import yn from './utils/yn'
import { setItem, getItem } from './utils/localstorage';

const getMobileMenuLinks = (onMenuToggle, withoutEvents) =>
  (<div className="links_container_mobile">
    {withoutEvents ? null :
      <Link to='/events' className="link" onClick={onMenuToggle}>
        <i className="icon_events" /><span className='link_text'>Events</span>
      </Link>
    }
    <Link to='/status' className="link" onClick={onMenuToggle}>
      <i className="icon_status" /><span className='link_text'>Status</span>
    </Link>
    {withoutEvents ? null :
      <Link to='/statistics' className="link" onClick={onMenuToggle}>
        <i className="icon_statistics" /><span className='link_text'>Statistics</span>
      </Link>
    }
  </div>)

const SHOW_INFO_KEY = 'showNetworksInfo';

@inject("RootStore")
@observer
export class Header extends React.Component {
  state = {
    showInfo: true
  };
  
  componentDidMount() {
    const showInfo = getItem(SHOW_INFO_KEY);
    if (showInfo) {
      this.setState({ showInfo: JSON.parse(showInfo) })
    }
  }
  
  toggleShowInfo = (event) => {
    event.preventDefault();
    const nextShowInfo = !this.state.showInfo;
    this.setState({ showInfo: nextShowInfo });
    setItem(SHOW_INFO_KEY, nextShowInfo);
  };
  
  render () {
    const { showInfo } = this.state
    const { showMobileMenu, onMenuToggle, RootStore: { alertStore, web3Store } } = this.props
    const { REACT_APP_HOME_WITHOUT_EVENTS: HOME, REACT_APP_FOREIGN_WITHOUT_EVENTS: FOREIGN } = process.env
    const withoutEvents = web3Store.metamaskNet.id === web3Store.homeNet.id.toString() ? yn(HOME) : yn(FOREIGN)
    return (
      <React.Fragment>
        <header className="header">
          {showMobileMenu && (<div className="header-mobile-menu-container">{getMobileMenuLinks(onMenuToggle, withoutEvents)}</div>)}
          <div className="container">
            <Link to="/" onClick={showMobileMenu ? onMenuToggle : null}>
              <img className="header-logo" src={logo} alt=""/>
            </Link>
            <div className="links_container">
              {withoutEvents ? null :
                <Link to='/events' className="link">
                  <i className="icon_events"/><span className='link_text'>Events</span>
                </Link>
              }
              <Link to='/status' className="link">
                <i className="icon_status"/><span className='link_text'>Status</span>
              </Link>
              {withoutEvents ? null :
                <Link to='/statistics' className="link">
                  <i className="icon_statistics"/><span className='link_text'>Statistics</span>
                </Link>
              }
              <Wallet/>
            </div>
            <div style={{flexShrink: 1, cursor: 'pointer'}} onClick={this.toggleShowInfo}>
              <img src={infoIcon} />
            </div>
            <div className="mobile-menu">
              <img onClick={onMenuToggle} className={showMobileMenu ? 'mobile-menu-open-icon' : 'mobile-menu-icon'}
                   src={showMobileMenu ? menuOpenIcon : menuIcon} alt=""/>
            </div>
          </div>
          {alertStore && alertStore.showDailyQuotaInfo && <DailyQuotaModal/>}
        </header>
        { showInfo && (
          <div className="network-info">
            <div className="container">
              <h4>Papyrus bridge works with two networks - Ethereum and Papyrus Network.</h4>
              <p>To transfer tonkens from Ethereum - go to the settings of your metamask and switch the current network to Ethereum. After that - you can send tokens from Ethereum.</p>
              <p>To transfer tokens from Papyrus Network - you need to do the reverse operation and switch the metamask to Papyrus Network <span>https://gateway.papyrus.network</span></p>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
