import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider} from '@material-ui/styles'
import {hot} from 'react-hot-loader'
import theme from './theme'

React.useEffect(() => {
  const jssStyles = document.getElementById('jss-server-side')
  if (jssStyles) {
    document.body.removeChild(jssStyles)
  }
})

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter/>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default hot(module) (App)
