import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client';
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentuser }) => {
    console.log('currentUser', currentuser);

    return (
        <div>
            <Header currentUser={currentuser} />
            <Component {...pageProps} />
        </div>)
}

AppComponent.getInitialProps = async (appContext) => {
    // console.log(Object.keys(appContext));
    const { data } = await buildClient(appContext.ctx).get('/api/users/currentuser')

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    console.log(pageProps);

    return {
        pageProps,
        ...data
    }
}

export default AppComponent;