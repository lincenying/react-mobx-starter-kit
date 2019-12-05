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
        return !this.props.article.isLoad ? (
            <div>Loading...</div>
        ) : (
            <div>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: data.content }} />
                <div className="reply">
                    {data.replies &&
                        data.replies.map(sub_item => {
                            return (
                                <div key={sub_item.id} className="reply-item">
                                    <h5>
                                        {sub_item.author.loginname}: <span>[{data.create_at}]</span>
                                    </h5>
                                    <div
                                        className="reply-item-content"
                                        dangerouslySetInnerHTML={{
                                            __html: sub_item.content
                                        }}
                                    />
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}
export default Article
