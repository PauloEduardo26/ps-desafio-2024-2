import style from './style.module.css'

export default function Header() {
  return (
    <header className={style.header}>
      <h1>Nome da livraria</h1>
      <input type="text" className={style.header_input} />

      <button>entre no admin</button>
    </header>
  )
}
