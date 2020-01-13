import { Provider } from 'mobx-react'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './pages/app'
import stores from './store'

window._____APP_STATE_____ = stores

render(
    <AppContainer>
        <Provider {...stores}>
            <Router>
                <Root />
            </Router>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./pages/app', () => {
        const RootContainer = require('./pages/app').default
        render(
            <AppContainer>
                <Provider {...stores}>
                    <Router>
                        <RootContainer />
                    </Router>
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
