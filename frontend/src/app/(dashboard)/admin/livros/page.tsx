import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { LuBookOpen } from 'react-icons/lu'
import ListBooks from './_components/list-books'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <LuBookOpen />
          Livros
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua livros.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense>
          <ListBooks />
        </Suspense>
      </DashboardMain>
    </>
  )
}
