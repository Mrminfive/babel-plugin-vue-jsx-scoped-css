import './index.scoped.scss'
import Vue from 'vue'

export default Vue.extend({
    name: 'test-comp',

    functional: true,

    props: {
        list: {
            type: Array,
            default: () => []
        }
    },

    render(h, { props }) {
        return (
            <nav class='test-comp'>
                <h3 class='test-comp__title'>JSX Scoped Css</h3>
                <ul class='test-comp__links'>
                    {props.list.map((item) => (
                        <li class='test-comp__link'>
                            <a href={item.link}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
})
