"use client"


import { useState } from 'react'
import css from './TagsMenu.module.css'

const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const openTegs = () => {
        setIsOpen(!isOpen)
    }
    const tags = ['all', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo']

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={openTegs}>
                Notes ▾
            </button>
            {isOpen && (<ul className={css.menuList}>

                {tags.map(tag => (
                    <li className={css.menuItem} key={tag}>
                        <a href={`/notes/filter/${tag}`} className={css.menuLink}>
                            {tag}
                        </a>
                    </li>
                ))}

            </ul>)
            }
        </div>

    )
}
export default TagsMenu