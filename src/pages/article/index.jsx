import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { propTypes } from '@/decorators'

@inject('globals', 'article')
@immutableRenderDecorator
@propTypes({
    article: PropTypes.object
})
@observer
class Article extends Component {
    constructor(props) {
        super(props)
        console.log('article: componentWillMount')
        const { pathname } = props.article
        if (pathname !== props.location.pathname) this.handleGetArticle()
    }
    componentDidMount() {
        console.log('article: componentDidMount')
        window.scrollTo(0, 0)
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) {
            console.log('article: componentDidUpdate', pathname, prevPathname)
            this.handleGetArticle()
        }
    }
    componentWillUnmount() {
        console.log('article: componentWillUnmount')
    }
    handleGetArticle() {
        const {
            match: {
                params: { id }
            },
            location: { pathname }
        } = this.props
        this.props.article.getArticle({ id, pathname })
    }
    render() {
        const { data } = this.props.article
        const rep_lists =
            data.replies &&
            data.replies.map(list => {
                return (
                    <li key={list.id}>
                        <span>{list.author.loginname}:</span>
                        <div dangerouslySetInnerHTML={{ __html: list.content }} />
                    </li>
                )
            })
        return !this.props.article.isLoad ? (
            <div>Loading...</div>
        ) : (
            <div>
                <h3>{data.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
                <h3>回帖: </h3>
                <ul>{rep_lists}</ul>
            </div>
        )
    }
}
export default Article
