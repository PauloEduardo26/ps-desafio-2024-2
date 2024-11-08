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
  const [isDark, setIsDark] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  // Adicionei um estado mounted para verificar se o componente foi carregado no lado do cliente

  useEffect(() => {
    setMounted(true) // Usei um useEffect para definir mounted como true após o componente ser montado no cliente
    const savedTheme = localStorage.getItem('isDark')
    setIsDark(savedTheme === 'true')
    // Essas duas linhas de código são responsáveis por ler o tema salvo no localStorage e atualizar o
    // estado do tema (isDark) na aplicação.
  }, [])

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

  const handleThemeToggle = () => {
    const newTheme = !isDark // Inverte o estado atual (isDark) para alternar o tema.
    setIsDark(newTheme) // Atualiza o estado interno da aplicação para aplicar o novo tema.
    localStorage.setItem('isDark', newTheme.toString())
    // Salva a preferência do usuário no localStorage para persistência entre sessões.
  }

  if (!mounted) return null // Antes de o componente estar montado, ele retorna null, evitando erros

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event: É o evento disparado pelo input quando o usuário digita algo.
    // React.ChangeEvent<HTMLInputElement>: É o tipo do evento, que indica
    // ser uma mudança de valor em um elemento <input> HTML.
    setQuery(event.target.value)
    // Atualizar o estado query com o valor digitado pelo usuário no campo de input
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
          <div className={style.btn_section}>
            <Toggle
              isChecked={isDark}
              handleChange={handleThemeToggle}
              theme={isDark ? 'light' : 'dark'}
            />
            <button className={style.header_admin_btn}>
              <Link href="/admin" target="_blank">
                Admin
              </Link>
            </button>
          </div>
        </header>
        <div className={style.cards}>
          {books
            ?.filter((book) =>
              book.name.toLowerCase().includes(query.toLowerCase()),
            )
            .map((book, index) => <Card key={index} book={book} />)}
          {/* 
          O operador (?.) verifica se books não é undefined ou null antes de tentar acessar o método filter. 
          O método filter cria uma nova lista de livros que tenham no seu nome o que foi escrito no campo do input 
          representado pela query.
          O método map percorre a lista filtrada de livros e retorna um componente <Card /> para cada livro.
          */}
        </div>
        <Footer />
      </div>
    </>
  )
}
