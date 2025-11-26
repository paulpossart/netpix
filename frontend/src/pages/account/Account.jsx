import { NavLink, Outlet } from 'react-router-dom';
import { HomeIcon, SecurityIcon, MemberIcon } from '../../components/svgs/accountSvgs';
import styles from './Account.module.scss';
import backIcon from '../../assets/back-arrow.svg';

function Account() {
  return (
    <main className={styles.Account}>
      <h1 className={styles.srOnly}>
        Netpix Account Page
      </h1>

      <nav
        aria-label="Account navigation"
        className={styles.accNav}>
        <ul>
          <li className={styles.toHome}>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink}
            >
              <img src={backIcon} alt='' />
              Back to Netpix
            </NavLink>
          </li>
          <li>
            <NavLink
              to='.'
              end
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink}
            >
              {
                ({ isActive }) => (
                  <>
                    <HomeIcon isActive={isActive} />
                    Overview
                  </>
                )
              }
            </NavLink>
          </li>
          <li>
            <NavLink
              to='security'
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink}
            >
              {
                ({ isActive }) => (
                  <>
                    <SecurityIcon isActive={isActive} />
                    Security
                  </>
                )
              }
            </NavLink>
          </li>
          <li>
            <NavLink
              to='membership'
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.inactiveLink}
            >
              {
                ({ isActive }) => (
                  <>
                    <MemberIcon isActive={isActive} />
                    Membership
                  </>
                )
              }
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />

    </main>
  )
}

export default Account;
