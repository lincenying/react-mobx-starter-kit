/* eslint-disable no-inline-comments */
import { Avatar, Button, List } from 'antd'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { Link, Prompt } from 'react-router-dom'
import ls from 'store2'
import { propTypes } from '~/decorators'

@inject('globals', 'topics')
@immutableRenderDecorator
@propTypes({
    topics: PropTypes.object
})
@observer
class Main extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            loading: false
        }
        this.handleLoadMore = this.handleLoadMore.bind(this)

        console.log('topic: constructor')
        const { pathname } = props.topics
        if (pathname !== props.location.pathname) this.handlefetchPosts()
    }
    componentDidMount() {
        console.log('topic: componentDidMount')
        const path = this.props.location.pathname
        const scrollTop = ls.get(path) || 0
        ls.remove(path)
        if (scrollTop) window.scrollTo(0, scrollTop)
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) {
            console.log('topic: componentDidUpdate', pathname, prevPathname)
            this.handlefetchPosts()
        }
    }
    componentWillUnmount() {
        console.log('topic: componentWillUnmount')
    }
    async handlefetchPosts(page = 1) {
        const {
            location: { pathname }
        } = this.props
        await this.props.topics.getTopics({ page, pathname })
    }
    async handleLoadMore() {
        const { page } = this.props.topics
        this.setState({ loading: true })
        await this.handlefetchPosts(page + 1)
        this.setState({ loading: false })
    }
    render() {
        const { data } = this.props.topics
        return (
            <div>
                {/* <Prompt when message={() => '确定要离开页面吗？'} /> */}
                <Prompt
                    when
                    message={() => {
                        const path = this.props.location.pathname
                        const scrollTop = Math.max(
                            window.pageYOffset,
                            document.documentElement.scrollTop,
                            document.body.scrollTop
                        )
                        ls.set(path, scrollTop)
                        return true
                    }}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.author.avatar_url} />}
                                title={
                                    <Link to={`/article/${item.id}`} className="li-name">
                                        {item.title}
                                    </Link>
                                }
                            />
                        </List.Item>
                    )}
                />
                <ul>
                    <li className="page">
                        <Button type="primary" loading={this.state.loading} onClick={this.handleLoadMore}>
                            加载下一页
                        </Button>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Main
