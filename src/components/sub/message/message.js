
import { createVNode, render } from "vue";

import YkMessage from "./YkMessage.vue";

const divVNode = createVNode('div', { class: 'xtx-message-container' })
render(divVNode, document.body)

const div = divVNode.el

const YKMessage = ({ message, type }) => {
    const comVNode = createVNode(YkMessage, { message, type })
    render(comVNode, div)
    setTimeout(() => {
        render(null, div)
    }, 6000)
}
export default YKMessage