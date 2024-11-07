'use client'

import style from './toggle.module.css'

interface ToggleProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isChecked: boolean
  theme: string
}

export default function Toggle({
  handleChange,
  isChecked,
  theme,
}: ToggleProps) {
  return (
    <div className={style.toggle_container}>
      <input
        id="check"
        type="checkbox"
        onChange={handleChange}
        checked={isChecked}
        className={style.toggle_input}
      />
      <label htmlFor="check" className={style.toggle_label}>
        {theme.toUpperCase()}
      </label>
    </div>
  )
}
