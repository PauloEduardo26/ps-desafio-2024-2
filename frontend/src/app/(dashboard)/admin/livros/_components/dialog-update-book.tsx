'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsBook from './form-fields-book'
import { updateBook } from '@/actions/book'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { bookType } from '@/types/book'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateBookProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateBook({ id, children }: DialogUpdateBookProps) {
  const [book, setBook] = useState<bookType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<bookType>('GET', `/books/${id}`)

      if (response) {
        setBook(response)
      } else {
        setBook(null)
        toast({
          title: 'Livro  não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setBook(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = null // requisicao para api

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o livro!',
      })
    } else {
      toast({
        title: 'Livro editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar livro</DialogTitle>
          <DialogDescription>
            Atualize as informações do livro abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsBook error={error} book={book} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
