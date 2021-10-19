import React, { useContext } from 'react';
import { Link } from 'gatsby';
import {
  Header as ShellHeader,
  HeaderMenuButton,
  SkipToContent,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react';
import { Switcher20, Close20 } from '@carbon/icons-react';
import cx from 'classnames';

import HeaderNav from 'gatsby-theme-carbon/src/components/HeaderNav/HeaderNav';
import GlobalSearch from 'gatsby-theme-carbon/src/components/GlobalSearch';
import NavContext from 'gatsby-theme-carbon/src/util/context/NavContext';
import useMetadata from 'gatsby-theme-carbon/src/util/hooks/useMetadata';

import * as styles from 'gatsby-theme-carbon/src/components/Header/Header.module.scss';

require('../languages/prism-powershell')

const Header = ({ children }) => {
  const {
    leftNavIsOpen,
    toggleNavState,
    switcherIsOpen,
    searchIsOpen,
  } = useContext(NavContext);
  const { isSearchEnabled, navigationStyle } = useMetadata();

  return (
    <ShellHeader
      aria-label="Header"
      className={cx(styles.header, {
        [styles.headerWithHeaderNav]: navigationStyle,
      })}>
      <SkipToContent href="#main-content" className={styles.skipToContent} />
      <HeaderMenuButton
        className={cx('bx--header__action--menu', styles.headerButton)}
        aria-label="Open menu"
        onClick={() => {
          toggleNavState('leftNavIsOpen');
          toggleNavState('switcherIsOpen', 'close');
        }}
        isActive={leftNavIsOpen}
      />
      <Link
        className={cx(styles.headerName, {
          [styles.searchIsOpenOnLink]: searchIsOpen,
          [styles.headerNameWithHeaderNav]: navigationStyle,
        })}
        to="/">
        {children}
      </Link>
      {navigationStyle && <HeaderNav />}
      <HeaderGlobalBar
        className={cx({ [styles.searchIsOpenOnBar]: searchIsOpen })}>
        {isSearchEnabled && <GlobalSearch />}
        <HeaderGlobalAction
          className={cx(styles.headerButton, styles.switcherButton, {
            [styles.switcherButtonOpen]: switcherIsOpen,
          })}
          aria-label="App switcher"
          tooltipAlignment="end"
          onClick={() => {
            toggleNavState('switcherIsOpen');
            toggleNavState('searchIsOpen', 'close');
            toggleNavState('leftNavIsOpen', 'close');
          }}>
          {switcherIsOpen ? <Close20 /> : <Switcher20 />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </ShellHeader>
  );
};

const DefaultHeaderText = () => (
  <>
    IBM Cúram&nbsp;<span>SPM on Kubernetes</span>
  </>
);

Header.defaultProps = {
  children: <DefaultHeaderText />,
};

export default Header;
