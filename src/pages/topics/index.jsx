import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ls from 'store2'
import { propTypes } from '~decorators'
import MainItem from './item.jsx'

@inject('topics')
@propTypes({
    topics: PropTypes.object
})
@observer
export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollTop: 0
        }
        this.handleLoadMore = this.handleLoadMore.bind(this)
        this.onScroll = this.onScroll.bind(this)
    }
    componentWillMount() {
        console.log('topic: componentWillMount')
        const { pathname } = this.props.topics
        if (pathname !== this.props.location.pathname) this.handlefetchPosts()
    }
    componentDidMount() {
        console.log('topic: componentDidMount')
        const path = this.props.location.pathname
        const scrollTop = ls.get(path) || 0
        ls.remove(path)
        if (scrollTop) window.scrollTo(0, scrollTop)
        window.addEventListener('scroll', this.onScroll)
    }
    componentDidUpdate(prevProps) {
        console.log('topic: componentDidUpdate')
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlefetchPosts()
    }
    componentWillUnmount() {
        console.log('topic: componentWillUnmount')
        window.removeEventListener('scroll', this.onScroll)
    }
    handlefetchPosts(page = 1) {
        const {
            location: { pathname }
        } = this.props
        this.props.topics.getTopics({ page, pathname })
    }
    handleLoadMore() {
        const { page } = this.props.topics
        this.handlefetchPosts(page + 1)
    }
    onScroll() {
        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        const path = this.props.location.pathname
        if (path && scrollTop) ls.set(path, scrollTop)
    }
    render() {
        const { data } = this.props.topics
        const lists = data.map(list => {
            return <MainItem key={list.id} list={list} />
        })
        return (
            <div>
                <div>{this.state.msg}</div>
                <ul>{lists}</ul>
                <div className="page">
                    <a onClick={this.handleLoadMore} href="javascript:;">
                        加载更多
                    </a>
                </div>
            </div>
        )
    }
}
