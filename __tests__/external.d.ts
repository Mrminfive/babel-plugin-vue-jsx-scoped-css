// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { VNode } from 'vue'

declare global {
    namespace JSX {
        interface Element extends VNode {}
        interface ElementAttributesProperty {
            $props: any // specify the property name to use
        }

        interface IntrinsicAttributes {
            [attr: string]: any
        }

        interface IntrinsicElements {
            [elem: string]: any
        }
    }
}
