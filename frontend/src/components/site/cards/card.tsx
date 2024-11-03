'use client'

import { bookType } from '@/types/book'
import style from './style.module.css'

interface bookProp {
  book: bookType
}
export default function Card({ book }: bookProp) {
  return (
    <div className={style.card}>
      <img className={style.card_img} alt="" src={book.image} />
      <div className={style.card_body}>
        <h2 className={style.card_name}>{book.name}</h2>
        <p className={style.card_content}>{book.author}</p>
        <p className={style.card_content}>{book.release_date}</p>
        <p className={style.card_content}>{book.quantity}</p>
        <p className={style.card_content}>{book.category.name}</p>
        <p className={style.card_content}>{book.description}</p>
      </div>
    </div>
  )
}
