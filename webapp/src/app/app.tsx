import { Component, h } from 'preact'
import Header from '../components/header'
import Hero from '../components/hero'
import ProfileInfo from '../components/profile_info'

export class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Hero />
				<p> terf</p>
				<ProfileInfo />
			</div>
		)
	}
}
