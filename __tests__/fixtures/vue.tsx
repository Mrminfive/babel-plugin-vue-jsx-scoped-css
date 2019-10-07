import './index.scoped.css'
import Vue from 'vue'
// @ts-ignore
import Link from './Link.vue'

interface VueCompType {
    list: {
        link: string
        label: string
    }[]
}

export default Vue.extend({
    name: 'test-vue2',

    render(this: VueCompType) {
        return (
            <nav class='pr-header-menu'>
                <ul class='menu__wrap'>
                    {this.list.map((item) => (
                        <li class='menu__item'>
                            <Link href={item.link}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
})
