import Link from 'next/link'
import css from './SidebarNotes.module.css'

export default function SidebarNotes() {

    const tags = ['all', 'Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo',]

    return (
        <aside >
            <ul className={css.menuList}
            >

                {tags.map(tag => (
                    <li key={tag} className={css.menuItem}
                    >
                        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                            {tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}