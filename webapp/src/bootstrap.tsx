import { h, render } from 'preact'
import { App } from './app/app'

const rootElement = document.getElementById('app')
if (rootElement === null) throw 'did not find app'
render(<App/>, rootElement)
