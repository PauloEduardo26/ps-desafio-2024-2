'use client'

import Card from '@/components/site/cards/card'
import { useToast } from '@/components/use-toast'
import { api } from '@/services/api'
import { bookType } from '@/types/book'
import { useEffect, useState } from 'react'
import style from './style.module.css'
import Header from '@/components/site/header/header'

export default function Home() {
  const [books, setBooks] = useState<bookType[] | undefined>()
  const { toast } = useToast()

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
  return (
    <>
      <Header></Header>
      <div className={style.cards}>
        {books?.map((book: bookType, index: number) => (
          <Card key={index} book={book}></Card>
        ))}
      </div>
    </>
  )
}
