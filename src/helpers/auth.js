import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

const locationHelper = locationHelperBuilder({})


export const userIsAuthenticated = connectedRouterRedirect({
   redirectPath: '/login',
   authenticatedSelector: state => state.login.user.username !== undefined,
   wrapperDisplayName: 'UserIsAuthenticated'
  // TODO:// Render this component when the authenticatingSelector returns true
//   AuthenticatingComponent: LoadingSpinner
 })

 export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.login.user.username === undefined,
    wrapperDisplayName: 'UserIsNotAuthenticated'
  })