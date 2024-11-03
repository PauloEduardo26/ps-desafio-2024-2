'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { bookType } from '@/types/book'
import { categoryType } from '@/types/category'
import { Select } from '@radix-ui/react-select'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsBookProps {
  book?: bookType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
  categories?: categoryType[]
}

export default function FormFieldsBook({
  book,
  readOnly,
  error,
  categories,
}: FormFieldsBookProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>(
    book?.image,
  )

  const [selectCategory, setSelectCategory] = useState<string | undefined>(
    book?.category_id,
  )
  return (
    <>
      <FormFieldsGroup>
        {book && <Input defaultValue={book.id} type="text" name="id" hidden />}

        <FormField>
          <Label htmlFor="name" required={!book}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do livro"
            defaultValue={book?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>

        <FormField>
          <Label htmlFor="author" required={!book}>
            Autor
          </Label>
          <Input
            name="author"
            id="author"
            placeholder="Insira o autor do livro"
            defaultValue={book?.author}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.author}
          />
        </FormField>

        <FormField>
          <Label>Categoria</Label>
          <Select
            disabled={pending || readOnly}
            onValueChange={setSelectCategory}
            value={selectCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria do livro"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem value={category.id} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            name="category_id"
            readOnly
            type="hidden"
            value={selectCategory}
          />
        </FormField>

        <FormField>
          <Label htmlFor="description" required={!book}>
            Descrição
          </Label>
          <Input
            name="description"
            id="description"
            placeholder="Insira a descrição do livro"
            defaultValue={book?.description}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.description}
          />
        </FormField>

        <FormField>
          <Label htmlFor="release_date" required={!book}>
            Data de lançamento
          </Label>
          <Input
            name="release_date"
            id="release_date"
            placeholder="Insira a data de lançamento do livro"
            defaultValue={book?.release_date}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.release_date}
          />
        </FormField>

        <FormField>
          <Label htmlFor="quantity" required={!book}>
            Quantidade
          </Label>
          <Input
            name="quantity"
            id="quantity"
            type="number"
            placeholder="Insira a quantidade de livros disponíveis"
            defaultValue={book?.quantity}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.quantity}
          />
        </FormField>

        <FormField>
          <Label hidden={readOnly && !book?.image} required={!book}>
            Imagem
          </Label>
          {!readOnly && (
            <Input
              name="image"
              id="image"
              type="file"
              accept="image/*"
              disabled={pending}
              readOnly={readOnly}
              onChange={(e) => handleImageChange(e, setUpdateImage)}
              error={error?.errors?.image}
            />
          )}
          <ImageForm src={updateImage} className="aspect-square size-40" />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
