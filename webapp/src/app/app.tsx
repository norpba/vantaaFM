import { Component, h } from 'preact'
import Header from '../components/header'
import Hero from '../components/hero'

export class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Hero />
				<p> terf</p>
			</div>
		)
	}
}
