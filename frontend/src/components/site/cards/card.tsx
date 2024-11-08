'use client'

import { bookType } from '@/types/book'
import { useToast } from '@/components/use-toast'
import style from './style.module.css'
import { updateBook } from '@/actions/book'
import { ResponseErrorType } from '@/services/api'
import { filterFormData } from '@/services/filter-form-data'
import { useState } from 'react'

interface bookProp {
  book: bookType
}
export default function Card({ book }: bookProp) {
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await updateBook(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível comprar o livro!',
      })
      return false
    } else {
      toast({
        title: 'Livro comprado com sucesso!',
      })
      return true
    }
  }

  const updateQuantity = async (id: string, quantity: string) => {
    const form = new FormData()
    form.append('id', id) // append adiciona uma variavel e um valor no FormData
    form.append('quantity', quantity)
    await submit(form) // Chama o submit com o FormData atualizado
  }

  const handleClick = () => {
    if (book.quantity > 0) {
      updateQuantity(book.id, (book.quantity - 1).toString())
    } else {
      toast({
        title: 'Esgotado!',
      })
    }
  }
  return (
    <div className={style.card}>
      <img className={style.card_img} alt="capa do livro" src={book.image} />
      <div className={style.card_body}>
        <div className={style.info}>
          <h2 className={style.card_name}>{book.name}</h2>
          <p className={style.card_content}>de {book.author}</p>
          <p className={style.card_content}>{book.category.name}</p>
          <p className={style.card_content}>{book.description}</p>
          <p className={style.card_content}>{book.release_date}</p>
        </div>
        <div className={style.buy}>
          <button
            onClick={handleClick}
            className={`${style.button} ${book.quantity <= 0 ? style.esgotado : ''}`}
          >
            Comprar
          </button>
          <p className={style.amount}>{book.quantity}</p>
        </div>
      </div>
    </div>
  )
}
