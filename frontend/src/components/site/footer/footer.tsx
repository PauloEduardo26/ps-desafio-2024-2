'use client'

import style from './style.module.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className={style.social}>
      <a
        href="https://github.com/PauloEduardo26"
        target="_blank"
        className={style.icons}
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        href="https://www.linkedin.com/in/paulo-eduardo-web/"
        target="_blank"
        className={style.icons}
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a
        href="https://www.instagram.com/paulo_edu_26/"
        target="_blank"
        className={style.icons}
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </footer>
  )
}
