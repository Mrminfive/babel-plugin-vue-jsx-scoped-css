import { PluginObj, NodePath } from '@babel/core'
import * as t from '@babel/types'
import babelPluginJsxSyntax from '@babel/plugin-syntax-jsx'
import * as md5 from 'md5'

interface PluginInstanceType {
    hasScopedCss: boolean
}

interface VisitorState {
    // Options inherited from Babel.
    file: any // eslint-disable-line @typescript-eslint/no-explicit-any
    opts: {
        include: string | RegExp
    }
}

const getFilenameFromPath = (filePath: string) => {
    const parts = filePath.split('/')
    return parts[parts.length - 1].split('?')[0]
}

const forPlugin = (
    path: NodePath<t.ImportDeclaration>,
    stats: VisitorState
) => {
    let { include: includeRegExp } = stats.opts
    if (!includeRegExp) {
        includeRegExp = /\.scoped\.(sa|sc|c)ss$/
    }
    const filename = getFilenameFromPath(path.node.source.value)
    return filename.match(new RegExp(includeRegExp))
}

const hasHashKey = (node: t.JSXOpeningElement, key: string) => {
    return ~node.attributes.findIndex(
        (item) =>
            t.isJSXAttribute(item) &&
            t.isJSXIdentifier(item.name) &&
            item.name.name === key
    )
}

export default function() {
    const computedHash: Record<string, string> = {}
    let lastHash = ''

    const computeHash = (filePath: string) => {
        if (computedHash[filePath]) {
            return computedHash[filePath]
        }

        const filename = getFilenameFromPath(filePath)
        const hash = md5(filename + lastHash).substr(0, 8)
        computedHash[filePath] = hash
        lastHash = hash
        return hash
    }

    return {
        name: 'babel-plugin-vue-jsx-scoped-css',
        inherits: babelPluginJsxSyntax,
        pre() {
            this.hasScopedCss = false
        },
        visitor: {
            ImportDeclaration(path, stats: VisitorState) {
                if (!forPlugin(path, stats)) {
                    return
                }
                this.hasScopedCss = true
                const hash = computeHash(stats.file.opts.filename)
                path.node.source.value = `${path.node.source.value}?scopeId=${hash}`
            },

            JSXElement(this: PluginInstanceType, path, stats: VisitorState) {
                const self = this

                path.parentPath.traverse({
                    JSXOpeningElement(p) {
                        if (
                            !self.hasScopedCss ||
                            p.node.name.type === 'JSXMemberExpression'
                        ) {
                            return
                        }

                        const hash = computeHash(stats.file.opts.filename)
                        const hashAttr = `data-v-${hash}`

                        !hasHashKey(p.node, hashAttr) &&
                            p.node.attributes.push(
                                t.jsxAttribute(
                                    t.jsxIdentifier(hashAttr),
                                    t.jsxExpressionContainer(
                                        t.stringLiteral('')
                                    )
                                )
                            )
                    }
                })
            }
        }
    } as PluginObj<PluginInstanceType>
}
