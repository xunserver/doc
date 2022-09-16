import { h } from 'vue'

const renderSvg = ({ node }: any) => {
  return h(node.tag, node.attrs, (node.children || []).map(renderSvg))
}
renderSvg.props = ['node']
export default renderSvg
