'use client'

import { useToast } from '@/components/use-toast'
import style from './style.module.css'
import { updateBook } from '@/actions/book'
import { ResponseErrorType } from '@/services/api'
import { filterFormData } from '@/services/filter-form-data'
import { useState } from 'react'

interface bookProp {
  quantity: number
  id: string
}
export default function Buy({ quantity: initialQuantity, id }: bookProp) {
  // 'quantity: initialQuantity' renomeia 'quantity' para 'initialQuantity' dentro do componente.
  // Isso é útil para diferenciar entre a prop original e a variável de estado local 
  // definida mais tarde no componente com 'useState'.
  const [quantity, setQuantity] = useState(initialQuantity)
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
    const response = await submit(form) // Chama o submit com o FormData atualizado

    if (response) {
      setQuantity(parseInt(quantity)) // Altera a quantidade na página sem necessitar de a atualizar
    }
  }

  const handleClick = () => {
    if (quantity > 0) {
      updateQuantity(id, (quantity - 1).toString())
    } else {
      toast({
        title: 'Esgotado!',
      })
    }
  }

  return (
    <div className={style.buy}>
      <button
        onClick={handleClick}
        className={`${style.button} ${quantity <= 0 ? style.esgotado : ''}`}
      >
        Comprar
      </button>
      <p className={style.amount}>{quantity}</p>
    </div>
  )
}
