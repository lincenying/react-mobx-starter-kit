import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'

@immutableRenderDecorator
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        console.log('ScrollToTop: componentDidUpdate')
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }
    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)
