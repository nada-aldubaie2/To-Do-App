import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import '../theme.css'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useTranslation } from 'react-i18next'
import logo from './logo.png';
export default function Header() {
  const [user] = useAuthState(auth)

  const { theme, toggleTheme } = useContext(ThemeContext)

  const { t, i18n } = useTranslation();

  return (
    <div className="myheader">
      <header className="hide-when-mobile nada ">
  <div className='logo-theme'>
            <Link to="/" style={{padding: "20px"}}> <img src={logo} alt="Tasky logo" className='main-logo'/> </Link>
          {/* <button
            onClick={() => {
              toggleTheme(theme === "Light" ? "Dark" : "Light");
            }}
            className="theme-btn"
          >
            {theme}
          </button> */}
    
      
            <i
              onClick={() => {
                toggleTheme(theme === 'Light' ? 'Dark' : 'Light')
              }}
              className="fa-solid fa-moon"
            ></i>
            <i
              onClick={() => {
                toggleTheme(theme === 'Light' ? 'Dark' : 'Light')
              }}
              className="fa-solid fa-sun"
            ></i>
        
  </div>

        <ul className="flex">
          <li className="main-list lang">
          {t('lang')}
            <ul className="lang-box">
              <li onClick={() => {
                i18n.changeLanguage("ar")
              }} dir="rtl">
                <p>العربية</p>
                {i18n.language ==="ar" && <i className="fa-solid fa-check"></i>}
              </li>
              <li onClick={() => {
                i18n.changeLanguage("en")
              }} >
                <p>English</p> {i18n.language ==="en" && <i className="fa-solid fa-check"></i>}
              </li>
            </ul>
          </li>
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
              {i18n.language === 'en' && 'Sign in '}
            {i18n.language === 'ar' && 'تسجيل الدخول'}  
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
              {i18n.language === 'en' && 'Sign-up '}
            {i18n.language === 'ar' && ' إنشاء حساب'}  
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log('Sign-out successful.')
                  })
                  .catch((error) => {
                    // An error happened.
                  })
              }}
              className="main-list"
            >
              <button className="main-link signout">{t('signout')}</button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
              {t('support')}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
              {t('account')}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  )
}
