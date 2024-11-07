'use client'

import '@/app/(site)/themes.css'
import Card from '@/components/site/cards/card'
import { useToast } from '@/components/use-toast'
import { api } from '@/services/api'
import { bookType } from '@/types/book'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import Toggle from '@/components/site/toggle-theme/toggle-theme'
import logo from '../../assets/img/logo_livraria.png'
import Footer from '@/components/site/footer/footer'
import Link from 'next/link'

export default function Home() {
  const [books, setBooks] = useState<bookType[] | undefined>()
  const { toast } = useToast()
  const [isDark, setIsDark] = useState(true)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<bookType[]>('GET', '/books')

      if (response) {
        setBooks(response)
      } else {
        toast({ title: 'Livros não encontrados!' })
      }
    }
    requestData()
  }, [toast])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <>
      <div className={style.main} data-theme={isDark ? 'dark' : 'light'}>
        <header className={style.header}>
          <div className={style.header_logo}>
            <img
              src={logo.src}
              alt="logo da livraria"
              className={style.header_img}
            />
            <h1>Livraria dos Sonhos</h1>
          </div>
          <input
            type="text"
            className={style.header_input}
            value={query}
            onChange={handleInputChange}
            placeholder="Buscar por título"
          />
          <Toggle
            isChecked={isDark}
            handleChange={() => setIsDark(!isDark)}
            theme={isDark ? 'light' : 'dark'}
          ></Toggle>
          <button className={style.header_admin_btn}>
            <Link href="/admin" target="_blank">
              Admin
            </Link>
          </button>
        </header>
        <div className={style.cards}>
          {books
            ?.filter((book) =>
              book.name.toLowerCase().includes(query.toLowerCase()),
            )
            .map((book, index) => <Card key={index} book={book} />)}
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
