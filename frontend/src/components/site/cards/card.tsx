'use client'

import { bookType } from '@/types/book'
import style from './style.module.css'
import Buy from '../Buy/buy'

interface bookProp {
  book: bookType
}
export default function Card({ book }: bookProp) {
  return (
    <div className={style.card}>
      <img className={style.card_img} alt="capa do livro" src={book.image} />
      <div className={style.card_body}>
        <h2 className={style.card_name}>{book.name}</h2>
        <p className={style.card_content}>de {book.author}</p>
        <p className={style.card_content}>{book.category.name}</p>
        <p className={style.card_content}>{book.description}</p>
        <p className={style.card_content}>{book.release_date}</p>
        <Buy quantity={book.quantity} id={book.id}></Buy>
      </div>
    </div>
  )
}
