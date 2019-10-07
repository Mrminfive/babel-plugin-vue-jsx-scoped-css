import * as babel from '@babel/core'
import * as path from 'path'
import * as fs from 'fs'
import * as ts from 'typescript'
import * as tsconfig from 'tsconfig'
import plugin from '../dist/index'

const readFixtures = () => {
    const dir = path.resolve(__dirname, './fixtures')
    const files = fs.readdirSync(dir)

    return files.map((f) => {
        return {
            filename: f,
            path: path.resolve(dir, f)
        }
    })
}

describe('babel-plugin-vue-jsx-scoped-css', () => {
    readFixtures().forEach((fixture) => {
        it(fixture.filename, () => {
            const codeContent = fs.readFileSync(fixture.path, {
                encoding: 'utf8'
            })

            const { outputText } = ts.transpileModule(
                codeContent,
                tsconfig.loadSync(__dirname, 'tsconfig.json').config
            )

            const result = babel.transform(outputText, {
                presets: ['@vue/babel-preset-jsx'],
                plugins: [plugin],
                filename: fixture.filename
            })
            const code = result ? result.code : ''
            expect(code).toMatchSnapshot()
        })
    })
})
